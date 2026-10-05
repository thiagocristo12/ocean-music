import { describe, it, expect } from 'vitest';
import { getGoalProgressPercent } from './goalProgress.js';
import { tracks } from '../data/tracks.js';

describe('getGoalProgressPercent', () => {
  it('usa o maior progresso entre as trilhas ligadas ao objetivo', () => {
    const trackProgress = {
      'violao-primeiros-passos': { completedLessons: 3 }, // 6 lições → 50%
      'violao-evoluindo': { completedLessons: 1 }, // 5 lições → 20%
    };
    const percent = getGoalProgressPercent('aprender-acordes', tracks, trackProgress);
    expect(percent).toBe(50);
  });

  it('objetivo sem nenhuma trilha ligada devolve 0', () => {
    const percent = getGoalProgressPercent('objetivo-inexistente', tracks, {});
    expect(percent).toBe(0);
  });

  it('objetivo sem nenhum progresso registrado devolve 0', () => {
    const percent = getGoalProgressPercent('entender-teoria', tracks, {});
    expect(percent).toBe(0);
  });
});