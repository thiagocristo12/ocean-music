import { AppError } from '../../core/errors.js';
import * as profileRepository from './profileRepository.js';

const VALID_LEVELS = ['beginner', 'intermediate'];
const VALID_EXPERIENCES = ['none', 'some', 'regular'];

// Lista de slugs: precisa ser array de textos não vazios, sem repetição,
// dentro dos limites (decisão D-98).
function validateSlugList(value, { min, max, message }) {
  const isValid =
    Array.isArray(value) &&
    value.length >= min &&
    value.length <= max &&
    value.every((item) => typeof item === 'string' && item.length > 0) &&
    new Set(value).size === value.length;

  if (!isValid) {
    throw new AppError('VALIDATION_ERROR', 422, message);
  }
}

function validateProfileInput(input) {
  if (!VALID_LEVELS.includes(input.level)) {
    throw new AppError('VALIDATION_ERROR', 422, 'Nível inválido.');
  }
  if (!VALID_EXPERIENCES.includes(input.priorExperience)) {
    throw new AppError('VALIDATION_ERROR', 422, 'Experiência anterior inválida.');
  }
  validateSlugList(input.areaSlugs, { min: 1, max: 3, message: 'Escolha de 1 a 3 áreas, sem repetir.' });
  validateSlugList(input.goalSlugs, { min: 0, max: 3, message: 'Escolha no máximo 3 objetivos, sem repetir.' });
  validateSlugList(input.styleSlugs, { min: 0, max: 3, message: 'Escolha no máximo 3 estilos, sem repetir.' });
}

export async function getProfile(userId) {
  return profileRepository.findProfileByUserId(userId);
}

export async function saveProfile(userId, input) {
  validateProfileInput(input);
  await profileRepository.saveProfile(userId, input);
  return profileRepository.findProfileByUserId(userId);
}