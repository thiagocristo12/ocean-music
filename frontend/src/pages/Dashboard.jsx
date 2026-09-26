import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import useProfile from '../hooks/useProfile.js';
import { tracks } from '../data/tracks.js';
import { goals as goalCatalog } from '../data/catalog.js';
import { recommendTracks } from '../utils/recommend.js';
import { computeStreak } from '../utils/streak.js';
import * as progressService from '../services/progressService.js';
import AppHeader from '../layouts/AppHeader.jsx';
import GreetingHeader from '../components/dashboard/GreetingHeader.jsx';
import NextActionCard from '../components/dashboard/NextActionCard.jsx';
import StreakCard from '../components/dashboard/StreakCard.jsx';
import CurrentGoalCard from '../components/dashboard/CurrentGoalCard.jsx';
import RecommendationCard from '../components/dashboard/RecommendationCard.jsx';

function Dashboard() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [dashboardInputs, setDashboardInputs] = useState(null);

  // Mesmo padrão do ProfileProvider: nenhum setState direto no corpo do
  // efeito, tudo dentro do .then().
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

  if (!profile || !dashboardInputs) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ocean-50">
        <p className="text-ink-500">Carregando seu painel...</p>
      </div>
    );
  }

  const recommendations = recommendTracks(profile, tracks, {
    limit: 4,
    trackProgress: dashboardInputs.trackProgress,
  });

  const [heroEntry, ...otherEntries] =
    recommendations.length > 0 ? recommendations : [{ track: tracks[0], reasons: [] }];

  const streak = computeStreak(dashboardInputs.dailyActivity);
  const mainGoal = goalCatalog.find((goal) => goal.slug === profile.goalSlugs[0]);

  return (
    <div className="min-h-screen bg-ocean-50">
      <AppHeader />

      <main className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
        <GreetingHeader name={user.name} />

        <NextActionCard track={heroEntry.track} />

        <div className="grid gap-4 sm:grid-cols-2">
          <StreakCard streak={streak} />
          {mainGoal && <CurrentGoalCard goal={mainGoal} />}
        </div>

        {otherEntries.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-ink-900">Recomendado para você</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              {otherEntries.map((entry) => (
                <RecommendationCard key={entry.track.slug} track={entry.track} reasons={entry.reasons} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;