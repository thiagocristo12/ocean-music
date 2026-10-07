import { AppError } from '../../core/errors.js';
import * as profileRepository from './profileRepository.js';

const VALID_LEVELS = ['beginner', 'intermediate'];
const VALID_EXPERIENCES = ['none', 'some', 'regular'];

function validateProfileInput(input) {
  if (!VALID_LEVELS.includes(input.level)) {
    throw new AppError('VALIDATION_ERROR', 422, 'Nível inválido.');
  }
  if (!VALID_EXPERIENCES.includes(input.priorExperience)) {
    throw new AppError('VALIDATION_ERROR', 422, 'Experiência anterior inválida.');
  }
  if (!Array.isArray(input.areaSlugs) || input.areaSlugs.length === 0 || input.areaSlugs.length > 3) {
    throw new AppError('VALIDATION_ERROR', 422, 'Escolha de 1 a 3 áreas.');
  }
  if (!Array.isArray(input.goalSlugs) || input.goalSlugs.length > 3) {
    throw new AppError('VALIDATION_ERROR', 422, 'Escolha no máximo 3 objetivos.');
  }
  if (!Array.isArray(input.styleSlugs) || input.styleSlugs.length > 3) {
    throw new AppError('VALIDATION_ERROR', 422, 'Escolha no máximo 3 estilos.');
  }
}

export async function getProfile(userId) {
  return profileRepository.findProfileByUserId(userId);
}

export async function saveProfile(userId, input) {
  validateProfileInput(input);
  await profileRepository.saveProfile(userId, input);
  return profileRepository.findProfileByUserId(userId);
}