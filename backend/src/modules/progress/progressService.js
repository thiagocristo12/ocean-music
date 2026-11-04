import { AppError } from '../../core/errors.js';
import * as progressRepository from './progressRepository.js';
import { parseLessonId } from '../lessons/lessonRepository.js';

export async function getDashboardInputs(userId) {
  const [trackProgress, dailyActivity] = await Promise.all([
    progressRepository.getTrackProgress(userId),
    progressRepository.getDailyActivity(userId),
  ]);
  return { trackProgress, dailyActivity };
}

export async function completeLesson(userId, { lessonId, scorePercent }) {
  // A coluna é smallint: só números inteiros de 0 a 100 (decisão D-99).
  if (!Number.isInteger(scorePercent) || scorePercent < 0 || scorePercent > 100) {
    throw new AppError('VALIDATION_ERROR', 422, 'scorePercent deve ser um número inteiro entre 0 e 100.');
  }
  if (typeof lessonId !== 'string') {
    throw new AppError('VALIDATION_ERROR', 422, 'lessonId deve ser um texto.');
  }

  const parsed = parseLessonId(lessonId);
  if (!parsed) {
    throw new AppError('LESSON_NOT_FOUND', 404, 'Lição não encontrada.');
  }

  const track = await progressRepository.findTrackBySlug(parsed.trackSlug);
  if (!track) {
    throw new AppError('LESSON_NOT_FOUND', 404, 'Lição não encontrada.');
  }

  const lessonDbId = await progressRepository.findLessonId(parsed.trackSlug, parsed.lessonSlug);
  if (!lessonDbId) {
    throw new AppError('LESSON_NOT_FOUND', 404, 'Lição não encontrada.');
  }

  // O índice é recalculado AQUI, nunca recebido do cliente (decisão D-69).
  const lessonIndex = await progressRepository.findLessonIndexInTrack(track.id, parsed.lessonSlug);

  await progressRepository.completeLesson({
    userId,
    trackDbId: track.id,
    lessonDbId,
    lessonIndex,
    scorePercent,
  });
}