import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import useProfile from '../hooks/useProfile.js';
import { tracks } from '../data/tracks.js';
import { recommendTracks } from '../utils/recommend.js';
import { getProgressPercent } from '../utils/trackProgress.js';
import * as progressService from '../services/progressService.js';
import AppHeader from '../layouts/AppHeader.jsx';
import AreaFilter from '../components/tracks/AreaFilter.jsx';
import TrackCard from '../components/tracks/TrackCard.jsx';
import RecommendationCard from '../components/tracks/RecommendationCard.jsx';

function Tracks() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [dashboardInputs, setDashboardInputs] = useState(null);
  const [selectedAreaSlug, setSelectedAreaSlug] = useState(null);

  // Mesmo padrão seguro já usado em ProfileProvider e Dashboard:
  // nenhum setState direto no corpo do efeito.
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
        <p className="text-ink-500">Carregando trilhas...</p>
      </div>
    );
  }

  const { trackProgress } = dashboardInputs;
  const recommendations = recommendTracks(profile, tracks, { limit: 3, trackProgress });

  const visibleTracks = tracks
    .filter((track) => !selectedAreaSlug || track.areaSlug === selectedAreaSlug)
    .sort((a, b) => a.position - b.position);

  return (
    <div className="min-h-screen bg-ocean-50">
      <AppHeader />

      <main className="mx-auto max-w-4xl space-y-8 p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-ink-900">Trilhas</h1>

        {recommendations.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-ink-900">Para você</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              {recommendations.map((entry) => (
                <RecommendationCard key={entry.track.slug} track={entry.track} reasons={entry.reasons} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold text-ink-900">Todas as trilhas</h2>
          <div className="mt-3">
            <AreaFilter selectedAreaSlug={selectedAreaSlug} onSelect={setSelectedAreaSlug} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTracks.map((track) => (
              <TrackCard
                key={track.slug}
                track={track}
                progressPercent={getProgressPercent(track, trackProgress)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Tracks;