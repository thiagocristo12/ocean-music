import { AppError } from '../../core/errors.js';
import * as lessonRepository from './lessonRepository.js';

export async function getLessonContent({ params }) {
  const parsed = lessonRepository.parseLessonId(params.id);
  if (!parsed) {
    throw new AppError('LESSON_NOT_FOUND', 404, 'Lição não encontrada.');
  }

  const lessonContent = await lessonRepository.findLessonContent(parsed.trackSlug, parsed.lessonSlug);
  if (!lessonContent) {
    throw new AppError('LESSON_NOT_FOUND', 404, 'Lição não encontrada.');
  }

  return lessonContent;
}