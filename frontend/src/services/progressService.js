import { formatDate } from '../utils/date.js';

const TRACK_PROGRESS_KEY = 'ocean:v1:trackProgress';
const DAILY_ACTIVITY_KEY = 'ocean:v1:dailyActivity';
const LESSON_SCORES_KEY = 'ocean:v1:lessonScores';

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readByUser(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeByUser(key, allData) {
  localStorage.setItem(key, JSON.stringify(allData));
}

export async function getDashboardInputs(userId) {
  await delay();
  const allTrackProgress = readByUser(TRACK_PROGRESS_KEY);
  const allDailyActivity = readByUser(DAILY_ACTIVITY_KEY);

  return {
    trackProgress: allTrackProgress[userId] || {},
    dailyActivity: allDailyActivity[userId] || [],
  };
}

// Usado futuramente pela página de Progresso (Etapa 11), para mostrar a
// melhor pontuação já obtida em uma lição específica.
export async function getLessonScore(userId, lessonId) {
  await delay(100);
  const allScores = readByUser(LESSON_SCORES_KEY);
  return allScores[userId]?.[lessonId] ?? null;
}

// Grava a conclusão de uma lição: avança o progresso da trilha (nunca
// recua, mesmo que a lição já tivesse sido concluída antes), registra a
// atividade de hoje (usada pela sequência de estudos) e guarda a melhor
// pontuação já obtida nessa lição.
export async function completeLesson(userId, { trackSlug, lessonIndex, lessonId, scorePercent }) {
  await delay(300);

  const allTrackProgress = readByUser(TRACK_PROGRESS_KEY);
  const userTrackProgress = allTrackProgress[userId] || {};
  const currentCompleted = userTrackProgress[trackSlug]?.completedLessons ?? 0;
  userTrackProgress[trackSlug] = { completedLessons: Math.max(currentCompleted, lessonIndex + 1) };
  allTrackProgress[userId] = userTrackProgress;
  writeByUser(TRACK_PROGRESS_KEY, allTrackProgress);

  const allDailyActivity = readByUser(DAILY_ACTIVITY_KEY);
  const userDailyActivity = allDailyActivity[userId] || [];
  const today = formatDate(new Date());
  if (!userDailyActivity.includes(today)) {
    userDailyActivity.push(today);
  }
  allDailyActivity[userId] = userDailyActivity;
  writeByUser(DAILY_ACTIVITY_KEY, allDailyActivity);

  const allScores = readByUser(LESSON_SCORES_KEY);
  const userScores = allScores[userId] || {};
  userScores[lessonId] = Math.max(userScores[lessonId] ?? 0, scorePercent);
  allScores[userId] = userScores;
  writeByUser(LESSON_SCORES_KEY, allScores);
}