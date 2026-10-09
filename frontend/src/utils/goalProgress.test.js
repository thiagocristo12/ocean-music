import { describe, it, expect } from 'vitest';
import { getGoalProgressPercent } from './goalProgress.js';

// Conjunto de trilhas de teste, independente dos dados reais do banco —
// mesmo princípio aplicado em recommend.test.js (decisão D-80).
const testTracks = [
  { slug: 'violao-primeiros-passos', goalSlugs: ['aprender-acordes', 'tocar-primeiras-musicas'], totalLessons: 6 },
  { slug: 'violao-evoluindo', goalSlugs: ['aprender-acordes'], totalLessons: 5 },
  { slug: 'teoria-fundamentos', goalSlugs: ['entender-teoria'], totalLessons: 6 },
];

describe('getGoalProgressPercent', () => {
  it('usa o maior progresso entre as trilhas ligadas ao objetivo', () => {
    const trackProgress = {
      'violao-primeiros-passos': { completedLessons: 3 }, // 6 lições → 50%
      'violao-evoluindo': { completedLessons: 1 }, // 5 lições → 20%
    };
    const percent = getGoalProgressPercent('aprender-acordes', testTracks, trackProgress);
    expect(percent).toBe(50);
  });

  it('objetivo sem nenhuma trilha ligada devolve 0', () => {
    const percent = getGoalProgressPercent('objetivo-inexistente', testTracks, {});
    expect(percent).toBe(0);
  });

  it('objetivo sem nenhum progresso registrado devolve 0', () => {
    const percent = getGoalProgressPercent('entender-teoria', testTracks, {});
    expect(percent).toBe(0);
  });
});