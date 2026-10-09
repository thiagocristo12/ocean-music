import { apiClient } from './apiClient.js';

// Devolve { content, exercises } — mesmo formato que utils/lessonContent.js
// (mock) sempre devolveu, incluindo a `solution` de cada exercício
// (decisão D-65, replicada do backend).
export async function getLessonContent(lessonId) {
  return apiClient.get(`/lessons/${lessonId}`);
}