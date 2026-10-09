import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import useProfile from '../hooks/useProfile.js';
import * as trackService from '../services/trackService.js';
import { goals as goalCatalog } from '../data/catalog.js';
import { computeStreak } from '../utils/streak.js';
import { buildActivityDays } from '../utils/activity.js';
import { getProgressPercent, getCompletedLessons } from '../utils/trackProgress.js';
import { getGoalProgressPercent } from '../utils/goalProgress.js';
import * as progressService from '../services/progressService.js';
import AppHeader from '../layouts/AppHeader.jsx';
import { Card } from '../components/ui';
import StreakSummaryCard from '../components/progress/StreakSummaryCard.jsx';
import ActivityChart from '../components/progress/ActivityChart.jsx';
import GoalProgressRow from '../components/progress/GoalProgressRow.jsx';
import TrackProgressRow from '../components/progress/TrackProgressRow.jsx';

function Progress() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [tracks, setTracks] = useState(null);
  const [dashboardInputs, setDashboardInputs] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    Promise.resolve()
      .then(() =>
        Promise.all([trackService.listTracks(), progressService.getDashboardInputs(user.id)])
      )
      .then(([tracksResult, inputsResult]) => {
        if (isCancelled) return;
        setTracks(tracksResult);
        setDashboardInputs(inputsResult);
      });

    return () => {
      isCancelled = true;
    };
  }, [user.id]);

  if (!profile || !tracks || !dashboardInputs) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ocean-50">
        <p className="text-ink-500">Carregando seu progresso...</p>
      </div>
    );
  }

  const { trackProgress, dailyActivity } = dashboardInputs;
  const streak = computeStreak(dailyActivity);
  const activityDays = buildActivityDays(dailyActivity);

  const startedTracks = tracks.filter((track) => getCompletedLessons(trackProgress, track.slug) > 0);
  const userGoals = goalCatalog.filter((goal) => profile.goalSlugs.includes(goal.slug));

  return (
    <div className="min-h-screen bg-ocean-50">
      <AppHeader />

      <main className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-ink-900">Seu progresso</h1>

        <StreakSummaryCard streak={streak} />
        <ActivityChart days={activityDays} />

        <Card>
          <h2 className="text-lg font-semibold text-ink-900">Seus objetivos</h2>
          {userGoals.length > 0 ? (
            <div className="mt-2 divide-y divide-ink-100">
              {userGoals.map((goal) => (
                <GoalProgressRow
                  key={goal.slug}
                  goal={goal}
                  progressPercent={getGoalProgressPercent(goal.slug, tracks, trackProgress)}
                />
              ))}
            </div>
          ) : (
            <p className="mt-2 text-ink-500">
              Você ainda não escolheu nenhum objetivo. Você pode adicionar um pelo seu perfil.
            </p>
          )}
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-ink-900">Trilhas em andamento</h2>
          {startedTracks.length > 0 ? (
            <div className="mt-2 divide-y divide-ink-100">
              {startedTracks.map((track) => (
                <TrackProgressRow
                  key={track.slug}
                  track={track}
                  progressPercent={getProgressPercent(track, trackProgress)}
                />
              ))}
            </div>
          ) : (
            <p className="mt-2 text-ink-500">
              Você ainda não começou nenhuma trilha. Dê uma olhada nas recomendadas para você.
            </p>
          )}
        </Card>
      </main>
    </div>
  );
}

export default Progress;