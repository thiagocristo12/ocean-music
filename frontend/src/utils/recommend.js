import { areas, styles, goals } from '../data/catalog.js';

// Pontuação (decisão registrada em docs/decisoes.md):
// área compatível +3 · objetivo compatível +3 · estilo compatível +2
// nível compatível +2 · trilha de nível acima do usuário -3
const SCORE_AREA = 3;
const SCORE_GOAL = 3;
const SCORE_STYLE = 2;
const SCORE_LEVEL_MATCH = 2;
const SCORE_LEVEL_ABOVE = -3;

function nameOf(list, slug) {
  return list.find((item) => item.slug === slug)?.name ?? slug;
}

function scoreTrack(track, profile) {
  let score = 0;
  const reasons = [];

  if (profile.areaSlugs.includes(track.areaSlug)) {
    score += SCORE_AREA;
    reasons.push({
      code: 'AREA',
      text: `Você escolheu ${nameOf(areas, track.areaSlug)} como uma das suas áreas`,
    });
  }

  const matchedGoalSlug = track.goalSlugs.find((slug) => profile.goalSlugs.includes(slug));
  if (matchedGoalSlug) {
    score += SCORE_GOAL;
    reasons.push({ code: 'GOAL', text: `Ajuda a ${nameOf(goals, matchedGoalSlug).toLowerCase()}` });
  }

  const matchedStyleSlug = track.styleSlugs.find((slug) => profile.styleSlugs.includes(slug));
  if (matchedStyleSlug) {
    score += SCORE_STYLE;
    reasons.push({ code: 'STYLE', text: `Usa exemplos de ${nameOf(styles, matchedStyleSlug)}` });
  }

  if (track.level === profile.level) {
    score += SCORE_LEVEL_MATCH;
    reasons.push({ code: 'LEVEL', text: 'Ideal para o seu nível' });
  } else if (track.level === 'intermediate' && profile.level === 'beginner') {
    score += SCORE_LEVEL_ABOVE;
  }

  return { score, reasons };
}

// trackProgress: mapa { [slug]: { completedLessons } } — usado para não
// recomendar trilhas já concluídas. Hoje sempre chega vazio (Etapa 9 preenche).
export function recommendTracks(profile, allTracks, { limit = 4, trackProgress = {} } = {}) {
  const notCompleted = allTracks.filter((track) => {
    const progress = trackProgress[track.slug];
    return !progress || progress.completedLessons < track.totalLessons;
  });

  const scored = notCompleted
    .map((track) => ({ track, ...scoreTrack(track, profile) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.track.position - b.track.position);

  const result = scored.slice(0, limit);

  // Sem trilhas suficientes com pontuação > 0: completa com trilhas do
  // mesmo nível do usuário, para o Dashboard nunca ficar vazio.
  if (result.length < limit) {
    const alreadyIncluded = new Set(result.map((entry) => entry.track.slug));
    const fallback = notCompleted
      .filter((track) => track.level === profile.level && !alreadyIncluded.has(track.slug))
      .sort((a, b) => a.position - b.position)
      .slice(0, limit - result.length)
      .map((track) => ({
        track,
        score: 0,
        reasons: [{ code: 'LEVEL_FALLBACK', text: 'Boa opção para o seu nível' }],
      }));
    result.push(...fallback);
  }

  return result;
}