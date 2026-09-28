import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { tracks } from '../data/tracks.js';
import { trackContent } from '../data/trackContent.js';
import { getCompletedLessons, getProgressPercent } from '../utils/trackProgress.js';
import * as progressService from '../services/progressService.js';
import AppHeader from '../layouts/AppHeader.jsx';
import { Card, ProgressBar, buttonBaseClasses, buttonVariants } from '../components/ui';
import StageAccordion from '../components/tracks/StageAccordion.jsx';

const levelLabels = { beginner: 'Iniciante', intermediate: 'Intermediário' };

// Monta a lista de lições em ordem, cada uma com um id único (trilha + lição)
// e o status calculado a partir de quantas já foram concluídas.
function buildLessonsByStage(content, trackSlug, completedLessons) {
  let index = 0;
  return content.stages.map((stage) => ({
    stage,
    lessons: stage.lessons.map((lesson) => {
      const status =
        index < completedLessons ? 'completed' : index === completedLessons ? 'suggested' : 'not_started';
      index += 1;
      return { ...lesson, id: `${trackSlug}--${lesson.slug}`, status };
    }),
  }));
}

function TrackDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [dashboardInputs, setDashboardInputs] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    Promise.resolve()
      .then(() => progressService.getDashboardInputs(user.id))
      .then((inputs) => {
        if (isCancelled) return;
        setDashboardInputs(inputs);
      });

    return () => {
      isCancelled = true;
    };
  }, [user.id]);

  const track = tracks.find((item) => item.slug === slug);
  const content = trackContent[slug];

  if (!track || !content) {
    return (
      <div className="min-h-screen bg-ocean-50">
        <AppHeader />
        <main className="mx-auto max-w-2xl p-4 text-center sm:p-6">
          <Card>
            <h1 className="text-xl font-bold text-ink-900">Trilha não encontrada</h1>
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

  if (!dashboardInputs) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ocean-50">
        <p className="text-ink-500">Carregando trilha...</p>
      </div>
    );
  }

  const completedLessons = getCompletedLessons(dashboardInputs.trackProgress, track.slug);
  const progressPercent = getProgressPercent(track, dashboardInputs.trackProgress);
  const stagesWithLessons = buildLessonsByStage(content, track.slug, completedLessons);

  const allLessons = stagesWithLessons.flatMap((entry) => entry.lessons);
  const suggestedLesson = allLessons.find((lesson) => lesson.status === 'suggested');
  const ctaLesson = suggestedLesson || allLessons[allLessons.length - 1];
  const ctaLabel = completedLessons === 0 ? 'Começar' : suggestedLesson ? 'Continuar' : 'Revisar';

  // A etapa que contém a lição sugerida (ou a última, se tudo já foi concluído)
  // começa aberta; as demais começam fechadas.
  const defaultOpenStageSlug =
    stagesWithLessons.find((entry) => entry.lessons.some((lesson) => lesson.id === ctaLesson.id))?.stage
      .slug ?? stagesWithLessons[0].stage.slug;

  return (
    <div className="min-h-screen bg-ocean-50">
      <AppHeader />

      <main className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ocean-600">
              {levelLabels[track.level]}
            </p>
            <h1 className="text-2xl font-bold text-ink-900">{track.title}</h1>
            <p className="mt-1 text-ink-500">{content.description}</p>
          </div>
          <ProgressBar value={progressPercent} label={`${track.totalLessons} lições`} />
          <Link
            to={`/exercicio/${ctaLesson.id}`}
            className={`${buttonBaseClasses} ${buttonVariants.primary} w-full`}
          >
            {ctaLabel}
          </Link>
        </Card>

        <div className="space-y-3">
          {stagesWithLessons.map(({ stage, lessons }) => (
            <StageAccordion
              key={stage.slug}
              stage={stage}
              lessons={lessons}
              defaultOpen={stage.slug === defaultOpenStageSlug}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default TrackDetail;