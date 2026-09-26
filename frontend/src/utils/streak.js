function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

// activityDates: lista de strings 'AAAA-MM-DD', um item por dia em que o
// usuário concluiu pelo menos um exercício (a Etapa 9 vai gerar essa lista).
export function computeStreak(activityDates, referenceDate = new Date()) {
  const activitySet = new Set(activityDates);

  function countConsecutiveBackwardsFrom(startDate) {
    let count = 0;
    let cursor = startDate;
    while (activitySet.has(formatDate(cursor))) {
      count += 1;
      cursor = addDays(cursor, -1);
    }
    return count;
  }

  const studiedToday = activitySet.has(formatDate(referenceDate));
  let current;
  let status;

  if (studiedToday) {
    current = countConsecutiveBackwardsFrom(referenceDate);
    status = 'active';
  } else {
    current = countConsecutiveBackwardsFrom(addDays(referenceDate, -1));
    status = current > 0 ? 'at_risk' : 'none';
  }

  // Maior sequência já alcançada, olhando todo o histórico
  const sortedDates = [...activitySet].sort();
  let longest = 0;
  let runStart = null;
  let previous = null;

  for (const dateStr of sortedDates) {
    const date = new Date(`${dateStr}T00:00:00`);
    if (!previous || formatDate(addDays(previous, 1)) !== dateStr) {
      runStart = date;
    }
    const runLength = Math.round((date - runStart) / 86400000) + 1;
    longest = Math.max(longest, runLength);
    previous = date;
  }

  return { current, longest: Math.max(longest, current), status, studiedToday };
}