import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { tracks } from '../data/tracks.js';
import { trackContent } from '../data/trackContent.js';
import { findLessonInTrack, getNextLesson } from '../utils/trackProgress.js';
import { getLessonContent } from '../utils/lessonContent.js';
import * as progressService from '../services/progressService.js';
import AppHeader from '../layouts/AppHeader.jsx';
import { Card, Button, buttonBaseClasses, buttonVariants } from '../components/ui';
import ContentBlock from '../components/exercises/ContentBlock.jsx';
import ExerciseShell from '../components/exercises/ExerciseShell.jsx';
import ResultSummary from '../components/exercises/ResultSummary.jsx';

// O id da lição, em toda a plataforma, tem o formato "<trilha>--<licao>"
// (definido na Etapa 8, em TrackDetail.jsx). Aqui é onde ele é decomposto.
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
  const track = tracks.find((item) => item.slug === trackSlug);
  const content = trackContent[trackSlug];
  const lessonInfo = content ? findLessonInTrack(content, lessonSlug) : null;

  // Fases da MESMA rota, sem navegar para outro lugar (decisão D-06):
  // 'intro' (conteúdo da lição) → 'exercise' (perguntas) → 'result'.
  const [phase, setPhase] = useState('intro');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  if (!track || !content || !lessonInfo) {
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

  const { lesson, index: lessonIndex } = lessonInfo;
  const lessonContent = getLessonContent(id, lesson, track);
  const totalExercises = lessonContent.exercises.length;
  const nextLesson = getNextLesson(content, lessonIndex);
  const nextLessonId = nextLesson ? `${trackSlug}--${nextLesson.lesson.slug}` : null;

  function handleAnswered(result) {
    const nextCorrectCount = correctCount + (result.correct ? 1 : 0);
    setCorrectCount(nextCorrectCount);

    const isLastExercise = currentExerciseIndex === totalExercises - 1;
    if (!isLastExercise) {
      setCurrentExerciseIndex((current) => current + 1);
      return;
    }

    // Última pergunta: grava o progresso (Etapa 9) e só então mostra o resultado.
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