import { describe, it, expect } from 'vitest';
import { computeStreak } from './streak.js';

function daysAgoString(referenceDate, daysAgo) {
  const date = new Date(referenceDate);
  date.setDate(date.getDate() - daysAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

describe('computeStreak', () => {
  const today = new Date('2026-09-30T12:00:00');

  it('sem nenhuma atividade, a sequência é zero', () => {
    const result = computeStreak([], today);
    expect(result).toEqual({ current: 0, longest: 0, status: 'none', studiedToday: false });
  });

  it('atividade só hoje conta como sequência de 1 dia, ativa', () => {
    const result = computeStreak([daysAgoString(today, 0)], today);
    expect(result.current).toBe(1);
    expect(result.status).toBe('active');
    expect(result.studiedToday).toBe(true);
  });

  it('3 dias seguidos terminando hoje resultam em sequência de 3', () => {
    const dates = [daysAgoString(today, 0), daysAgoString(today, 1), daysAgoString(today, 2)];
    const result = computeStreak(dates, today);
    expect(result.current).toBe(3);
    expect(result.status).toBe('active');
  });

  it('quem estudou ontem mas não hoje está "em risco"', () => {
    const dates = [daysAgoString(today, 1), daysAgoString(today, 2)];
    const result = computeStreak(dates, today);
    expect(result.current).toBe(2);
    expect(result.status).toBe('at_risk');
    expect(result.studiedToday).toBe(false);
  });

  it('um intervalo sem atividade quebra a sequência atual, mas não apaga o recorde', () => {
    const dates = [daysAgoString(today, 5), daysAgoString(today, 4), daysAgoString(today, 3)];
    const result = computeStreak(dates, today);
    expect(result.current).toBe(0);
    expect(result.status).toBe('none');
    expect(result.longest).toBe(3);
  });
});