import { describe, it, expect } from 'vitest';
import { buildActivityDays } from './activity.js';

describe('buildActivityDays', () => {
  const today = new Date('2026-09-30T12:00:00');

  it('devolve 14 dias, terminando na data de referência', () => {
    const days = buildActivityDays([], today, 14);
    expect(days.length).toBe(14);
    expect(days[days.length - 1].date).toBe('2026-09-30');
    expect(days[0].date).toBe('2026-09-17');
  });

  it('marca como estudado apenas os dias presentes na lista de atividade', () => {
    const days = buildActivityDays(['2026-09-29', '2026-09-30'], today, 14);
    const studiedDates = days.filter((day) => day.studied).map((day) => day.date);
    expect(studiedDates).toEqual(['2026-09-29', '2026-09-30']);
  });

  it('datas fora da janela de 14 dias são ignoradas', () => {
    const days = buildActivityDays(['2026-01-01'], today, 14);
    expect(days.some((day) => day.studied)).toBe(false);
  });
});