import { readJsonBody } from '../../core/http.js';
import { AppError } from '../../core/errors.js';
import { readSessionIdFromCookies, writeSessionCookie, clearSessionCookie } from '../../core/cookies.js';
import * as authService from './authService.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Limites alinhados ao schema (users.name é varchar(120), users.email é varchar(255)).
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 255;
const MAX_PASSWORD_LENGTH = 128;

function validateRegisterInput({ name, email, password }) {
  if (typeof name !== 'string' || !name.trim() || name.trim().length > MAX_NAME_LENGTH) {
    throw new AppError('VALIDATION_ERROR', 422, 'Informe seu nome (até 120 caracteres).');
  }
  if (
    typeof email !== 'string' ||
    !EMAIL_REGEX.test(email.trim()) ||
    email.trim().length > MAX_EMAIL_LENGTH
  ) {
    throw new AppError('VALIDATION_ERROR', 422, 'Informe um e-mail válido.');
  }
  if (typeof password !== 'string' || password.length < 8 || password.length > MAX_PASSWORD_LENGTH) {
    throw new AppError('VALIDATION_ERROR', 422, 'A senha deve ter de 8 a 128 caracteres.');
  }
}

export async function postRegister({ req, res }) {
  const body = await readJsonBody(req);
  validateRegisterInput(body);

  const { user, sessionId } = await authService.register(body);
  writeSessionCookie(res, sessionId);
  return { user };
}

export async function postLogin({ req, res }) {
  const body = await readJsonBody(req);
  if (typeof body.email !== 'string' || typeof body.password !== 'string' || !body.email || !body.password) {
    throw new AppError('VALIDATION_ERROR', 422, 'Informe e-mail e senha.');
  }

  const { user, sessionId } = await authService.login(body);
  writeSessionCookie(res, sessionId);
  return { user };
}

export async function postLogout({ req, res }) {
  const sessionId = readSessionIdFromCookies(req);
  await authService.logout(sessionId);
  clearSessionCookie(res);
  return { success: true };
}

export async function getMe({ req }) {
  const sessionId = readSessionIdFromCookies(req);
  const user = await authService.getCurrentUser(sessionId);

  if (!user) {
    throw new AppError('NOT_AUTHENTICATED', 401, 'Não autenticado.');
  }

  return { user };
}