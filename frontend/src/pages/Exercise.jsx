import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import * as trackService from '../services/trackService.js';
import * as lessonService from '../services/lessonService.js';
import { findLessonInTrack, getNextLesson } from '../utils/trackProgress.js';
import * as progressService from '../services/progressService.js';
import AppHeader from '../layouts/AppHeader.jsx';
import { Card, Button, buttonBaseClasses, buttonVariants } from '../components/ui';
import ContentBlock from '../components/exercises/ContentBlock.jsx';
import ExerciseShell from '../components/exercises/ExerciseShell.jsx';
import ResultSummary from '../components/exercises/ResultSummary.jsx';

function parseLessonId(id) {
  const separatorIndex = id.indexOf('--');
  return {
    trackSlug: id.slice(0, separatorIndex),
    lessonSlug: id.slice(separatorIndex + 2),
  };
}

function Exercise() {
  const { id } = useParams();
  const { user } = useAuth();

  const { trackSlug, lessonSlug } = parseLessonId(id);

  const [track, setTrack] = useState(null);
  const [lessonContent, setLessonContent] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [phase, setPhase] = useState('intro');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    Promise.resolve()
      .then(() => Promise.all([trackService.getTrack(trackSlug), lessonService.getLessonContent(id)]))
      .then(([trackResult, lessonContentResult]) => {
        if (isCancelled) return;
        setTrack(trackResult);
        setLessonContent(lessonContentResult);
      })
      .catch((error) => {
        if (isCancelled) return;
        if (error.code === 'TRACK_NOT_FOUND' || error.code === 'LESSON_NOT_FOUND') {
          setNotFound(true);
        } else {
          throw error;
        }
      });

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-ocean-50">
        <AppHeader />
        <main className="mx-auto max-w-lg p-4 text-center sm:p-6">
          <Card>
            <h1 className="text-xl font-bold text-ink-900">Lição não encontrada</h1>
            <p className="mt-2 text-ink-500">Talvez o endereço esteja incorreto.</p>
            <Link
              to="/trilhas"
              className={`${buttonBaseClasses} ${buttonVariants.primary} mt-4 inline-flex`}
            >
              Ver todas as trilhas
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  if (!track || !lessonContent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ocean-50">
        <p className="text-ink-500">Carregando lição...</p>
      </div>
    );
  }

  const lessonInfo = findLessonInTrack(track, lessonSlug);
  if (!lessonInfo) {
    return (
      <div className="min-h-screen bg-ocean-50">
        <AppHeader />
        <main className="mx-auto max-w-lg p-4 text-center sm:p-6">
          <Card>
            <h1 className="text-xl font-bold text-ink-900">Lição não encontrada</h1>
          </Card>
        </main>
      </div>
    );
  }

  const { lesson, index: lessonIndex } = lessonInfo;
  const totalExercises = lessonContent.exercises.length;
  const nextLesson = getNextLesson(track, lessonIndex);
  const nextLessonId = nextLesson ? `${trackSlug}--${nextLesson.lesson.slug}` : null;

  // Lições sem exercícios cadastrados ainda (trilhas além de "Violão:
  // Primeiros Passos" — ver decisão D-50): mostra um aviso em vez de travar.
  if (totalExercises === 0) {
    return (
      <div className="min-h-screen bg-ocean-50">
        <AppHeader />
        <main className="mx-auto max-w-lg space-y-4 p-4 sm:p-6">
          <div>
            <p className="text-sm font-medium text-ocean-600">{track.title}</p>
            <h1 className="text-xl font-bold text-ink-900">{lesson.title}</h1>
          </div>
          <Card className="space-y-4">
            <p className="text-ink-500">
              O conteúdo completo desta lição ainda está sendo preparado. Volte em breve!
            </p>
            <Link
              to={`/trilhas/${trackSlug}`}
              className={`${buttonBaseClasses} ${buttonVariants.secondary} w-full`}
            >
              Voltar à trilha
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  function handleAnswered(result) {
    const nextCorrectCount = correctCount + (result.correct ? 1 : 0);
    setCorrectCount(nextCorrectCount);

    const isLastExercise = currentExerciseIndex === totalExercises - 1;
    if (!isLastExercise) {
      setCurrentExerciseIndex((current) => current + 1);
      return;
    }

    const scorePercent = Math.round((nextCorrectCount / totalExercises) * 100);
    progressService
      .completeLesson(user.id, { trackSlug, lessonIndex, lessonId: id, scorePercent })
      .then(() => setPhase('result'));
  }

  return (
    <div className="min-h-screen bg-ocean-50">
      <AppHeader />

      <main className="mx-auto max-w-lg space-y-4 p-4 sm:p-6">
        <div>
          <p className="text-sm font-medium text-ocean-600">{track.title}</p>
          <h1 className="text-xl font-bold text-ink-900">{lesson.title}</h1>
        </div>

        {phase === 'intro' && (
          <Card className="space-y-4">
            {lessonContent.content.map((block, blockIndex) => (
              <ContentBlock key={blockIndex} block={block} />
            ))}
            <Button fullWidth onClick={() => setPhase('exercise')}>
              Começar exercícios
            </Button>
          </Card>
        )}

        {phase === 'exercise' && (
          <ExerciseShell
            key={lessonContent.exercises[currentExerciseIndex].key}
            exercise={lessonContent.exercises[currentExerciseIndex]}
            index={currentExerciseIndex}
            total={totalExercises}
            onAnswered={handleAnswered}
          />
        )}

        {phase === 'result' && (
          <ResultSummary
            correctCount={correctCount}
            totalCount={totalExercises}
            trackSlug={trackSlug}
            nextLessonId={nextLessonId}
          />
        )}
      </main>
    </div>
  );
}

export default Exercise;