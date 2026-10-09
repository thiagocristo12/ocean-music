import { describe, it, expect } from 'vitest';
import { recommendTracks } from './recommend.js';

// Conjunto de trilhas de teste, independente dos dados reais do banco —
// assim, o teste não quebra se o conteúdo do seed mudar no futuro.
// Espelha o formato devolvido por trackService.listTracks() (Etapa 13.5).
const testTracks = [
  { slug: 'violao-primeiros-passos', title: 'Violão: Primeiros Passos', areaSlug: 'violao', level: 'beginner', goalSlugs: ['aprender-acordes', 'tocar-primeiras-musicas'], styleSlugs: ['rock', 'pop', 'sertanejo'], totalLessons: 6, position: 1 },
  { slug: 'violao-evoluindo', title: 'Violão: Evoluindo', areaSlug: 'violao', level: 'intermediate', goalSlugs: ['aprender-acordes'], styleSlugs: ['rock', 'pop'], totalLessons: 5, position: 2 },
  { slug: 'piano-primeiros-passos', title: 'Piano: Primeiros Passos', areaSlug: 'piano', level: 'beginner', goalSlugs: ['ler-partitura'], styleSlugs: ['classico', 'pop'], totalLessons: 6, position: 3 },
  { slug: 'piano-evoluindo', title: 'Piano: Evoluindo', areaSlug: 'piano', level: 'intermediate', goalSlugs: ['ler-partitura', 'aperfeicoar-teoria'], styleSlugs: ['classico'], totalLessons: 6, position: 4 },
  { slug: 'teoria-fundamentos', title: 'Teoria Musical: Fundamentos', areaSlug: 'teoria', level: 'beginner', goalSlugs: ['entender-teoria'], styleSlugs: [], totalLessons: 6, position: 5 },
  { slug: 'teoria-harmonia-escalas', title: 'Teoria Musical: Harmonia e Escalas', areaSlug: 'teoria', level: 'intermediate', goalSlugs: ['aperfeicoar-teoria', 'entender-teoria'], styleSlugs: ['classico'], totalLessons: 5, position: 6 },
  { slug: 'canto-primeiros-passos', title: 'Canto: Primeiros Passos', areaSlug: 'canto', level: 'beginner', goalSlugs: ['cantar-afinado'], styleSlugs: ['pop'], totalLessons: 5, position: 7 },
  { slug: 'ritmo-rock-sertanejo', title: 'Ritmo: Levadas de Rock e Sertanejo', areaSlug: 'ritmo', level: 'beginner', goalSlugs: ['melhorar-ritmo'], styleSlugs: ['rock', 'sertanejo'], totalLessons: 4, position: 8 },
  { slug: 'performance-primeiros-passos', title: 'Performance: Primeiros Passos no Palco', areaSlug: 'performance', level: 'beginner', goalSlugs: ['perder-medo-de-se-apresentar'], styleSlugs: [], totalLessons: 4, position: 9 },
];

const anaProfile = {
  level: 'beginner',
  priorExperience: 'none',
  areaSlugs: ['violao'],
  goalSlugs: ['aprender-acordes'],
  styleSlugs: ['rock'],
};

const brunoProfile = {
  level: 'intermediate',
  priorExperience: 'regular',
  areaSlugs: ['piano', 'teoria'],
  goalSlugs: ['aperfeicoar-teoria'],
  styleSlugs: ['classico'],
};

describe('recommendTracks', () => {
  it('recomenda a trilha de violão em primeiro para o perfil da Ana', () => {
    const result = recommendTracks(anaProfile, testTracks, { limit: 3 });
    expect(result[0].track.slug).toBe('violao-primeiros-passos');
  });

  it('recomenda uma trilha de piano/teoria em primeiro para o perfil do Bruno', () => {
    const result = recommendTracks(brunoProfile, testTracks, { limit: 3 });
    expect(['piano-evoluindo', 'teoria-harmonia-escalas']).toContain(result[0].track.slug);
  });

  it('perfis diferentes geram o topo da lista diferente', () => {
    const anaTop = recommendTracks(anaProfile, testTracks, { limit: 1 })[0].track.slug;
    const brunoTop = recommendTracks(brunoProfile, testTracks, { limit: 1 })[0].track.slug;
    expect(anaTop).not.toBe(brunoTop);
  });

  it('nunca recomenda uma trilha já concluída', () => {
    const trackProgress = { 'violao-primeiros-passos': { completedLessons: 6 } };
    const result = recommendTracks(anaProfile, testTracks, { limit: 3, trackProgress });
    const slugs = result.map((entry) => entry.track.slug);
    expect(slugs).not.toContain('violao-primeiros-passos');
  });

  it('sempre devolve o número de trilhas pedido, mesmo com poucas compatibilidades', () => {
    const sparseProfile = { level: 'beginner', priorExperience: 'none', areaSlugs: [], goalSlugs: [], styleSlugs: [] };
    const result = recommendTracks(sparseProfile, testTracks, { limit: 3 });
    expect(result.length).toBe(3);
  });

  it('o desempate é sempre igual (mesma entrada, mesma saída)', () => {
    const sparseProfile = { level: 'beginner', priorExperience: 'none', areaSlugs: [], goalSlugs: [], styleSlugs: [] };
    const first = recommendTracks(sparseProfile, testTracks, { limit: 3 }).map((e) => e.track.slug);
    const second = recommendTracks(sparseProfile, testTracks, { limit: 3 }).map((e) => e.track.slug);
    expect(first).toEqual(second);
  });
});