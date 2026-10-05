import { formatDate, addDays } from './date.js';

// A partir da lista de datas com atividade (o mesmo formato já gravado por
// progressService.completeLesson desde a Etapa 9), monta um array com os
// últimos N dias em ordem cronológica, cada um marcado como estudado ou não.
export function buildActivityDays(dailyActivity, referenceDate = new Date(), days = 14) {
  const activitySet = new Set(dailyActivity);
  const result = [];

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = addDays(referenceDate, -offset);
    const dateString = formatDate(date);
    result.push({ date: dateString, studied: activitySet.has(dateString) });
  }

  return result;
}