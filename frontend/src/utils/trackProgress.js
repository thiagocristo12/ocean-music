// trackProgress: o mesmo formato que já vem de progressService.getDashboardInputs()
// desde a Etapa 7 — um mapa { [trackSlug]: { completedLessons } }.

export function getCompletedLessons(trackProgress, trackSlug) {
  return trackProgress[trackSlug]?.completedLessons ?? 0;
}

export function getProgressPercent(track, trackProgress) {
  const completed = getCompletedLessons(trackProgress, track.slug);
  return Math.round((completed / track.totalLessons) * 100);
}