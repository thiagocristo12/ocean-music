import { apiClient } from './apiClient.js';

// Mantemos o parâmetro `userId` na assinatura por compatibilidade com as
// páginas que já chamam esta função (Dashboard, Tracks, TrackDetail,
// Progress, Exercise) — mas ele não é mais usado: o backend identifica o
// usuário pelo cookie de sessão, igual ao profileService (decisão D-75).
export async function getDashboardInputs(_userId) {
  return apiClient.get('/me/progress');
}

export async function completeLesson(_userId, { lessonId, scorePercent }) {
  await apiClient.post('/me/progress/complete-lesson', { lessonId, scorePercent });
}