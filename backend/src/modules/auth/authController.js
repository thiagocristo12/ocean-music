import { readJsonBody } from '../../core/http.js';
import { AppError } from '../../core/errors.js';
import { readSessionIdFromCookies, writeSessionCookie, clearSessionCookie } from '../../core/cookies.js';
import * as authService from './authService.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegisterInput({ name, email, password }) {
  const fields = {};
  if (!name || !name.trim()) fields.name = 'Informe seu nome.';
  if (!email || !EMAIL_REGEX.test(email.trim())) fields.email = 'Informe um e-mail válido.';
  if (!password || password.length < 8) fields.password = 'Use pelo menos 8 caracteres.';

  if (Object.keys(fields).length > 0) {
    throw new AppError('VALIDATION_ERROR', 422, 'Dados inválidos.');
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
  if (!body.email || !body.password) {
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