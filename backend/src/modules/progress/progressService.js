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
  if (typeof scorePercent !== 'number' || scorePercent < 0 || scorePercent > 100) {
    throw new AppError('VALIDATION_ERROR', 422, 'scorePercent deve ser um número entre 0 e 100.');
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

  // Precisamos saber a posição (0-based) da lição dentro da trilha inteira,
  // igual ao índice calculado por utils/trackProgress.js (findLessonInTrack)
  // no front-end — é esse índice que determina até onde o progresso avança.
  const lessonIndex = await findLessonIndexInTrack(track.id, parsed.lessonSlug);

  await progressRepository.completeLesson({
    userId,
    trackDbId: track.id,
    lessonDbId,
    lessonIndex,
    scorePercent,
  });
}

async function findLessonIndexInTrack(trackDbId, targetLessonSlug) {
  const { pool } = await import('../../database/pool.js');
  const result = await pool.query(
    `SELECT l.slug
     FROM lessons l
     JOIN stages s ON s.id = l.stage_id
     WHERE s.track_id = $1
     ORDER BY s.position, l.position`,
    [trackDbId]
  );
  return result.rows.findIndex((row) => row.slug === targetLessonSlug);
}