import { getProgressPercent } from './trackProgress.js';

// Um objetivo pode estar ligado a mais de uma trilha (ex.: "aprender
// acordes" aparece tanto em "Violão: Primeiros Passos" quanto em "Violão:
// Evoluindo"). O progresso do objetivo é o MAIOR progresso entre elas —
// a pessoa não precisa terminar as duas para sentir que está avançando.
export function getGoalProgressPercent(goalSlug, allTracks, trackProgress) {
  const relatedTracks = allTracks.filter((track) => track.goalSlugs.includes(goalSlug));
  if (relatedTracks.length === 0) return 0;

  const percents = relatedTracks.map((track) => getProgressPercent(track, trackProgress));
  return Math.max(...percents);
}