import { describe, it, expect } from 'vitest';
import { recommendTracks } from './recommend.js';
import { tracks } from '../data/tracks.js';

// As mesmas duas personas usadas manualmente desde a Etapa 7.
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
    const result = recommendTracks(anaProfile, tracks, { limit: 3 });
    expect(result[0].track.slug).toBe('violao-primeiros-passos');
  });

  it('recomenda uma trilha de piano/teoria em primeiro para o perfil do Bruno', () => {
    const result = recommendTracks(brunoProfile, tracks, { limit: 3 });
    expect(['piano-evoluindo', 'teoria-harmonia-escalas']).toContain(result[0].track.slug);
  });

  it('perfis diferentes geram o topo da lista diferente', () => {
    const anaTop = recommendTracks(anaProfile, tracks, { limit: 1 })[0].track.slug;
    const brunoTop = recommendTracks(brunoProfile, tracks, { limit: 1 })[0].track.slug;
    expect(anaTop).not.toBe(brunoTop);
  });

  it('nunca recomenda uma trilha já concluída', () => {
    const trackProgress = { 'violao-primeiros-passos': { completedLessons: 6 } };
    const result = recommendTracks(anaProfile, tracks, { limit: 3, trackProgress });
    const slugs = result.map((entry) => entry.track.slug);
    expect(slugs).not.toContain('violao-primeiros-passos');
  });

  it('sempre devolve o número de trilhas pedido, mesmo com poucas compatibilidades', () => {
    const sparseProfile = {
      level: 'beginner',
      priorExperience: 'none',
      areaSlugs: [],
      goalSlugs: [],
      styleSlugs: [],
    };
    const result = recommendTracks(sparseProfile, tracks, { limit: 3 });
    expect(result.length).toBe(3);
  });

  it('o desempate é sempre igual (mesma entrada, mesma saída)', () => {
    const sparseProfile = {
      level: 'beginner',
      priorExperience: 'none',
      areaSlugs: [],
      goalSlugs: [],
      styleSlugs: [],
    };
    const first = recommendTracks(sparseProfile, tracks, { limit: 3 }).map((e) => e.track.slug);
    const second = recommendTracks(sparseProfile, tracks, { limit: 3 }).map((e) => e.track.slug);
    expect(first).toEqual(second);
  });
});