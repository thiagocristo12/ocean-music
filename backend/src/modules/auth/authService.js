import { hashPassword, verifyPassword } from '../../core/password.js';
import { AppError } from '../../core/errors.js';
import * as authRepository from './authRepository.js';

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

export async function register({ name, email, password }) {
  const existing = await authRepository.findUserByEmail(email);
  if (existing) {
    throw new AppError('EMAIL_TAKEN', 409, 'Esse e-mail já está cadastrado.');
  }

  const passwordHash = await hashPassword(password);
  const user = await authRepository.insertUser({ name: name.trim(), email: email.trim(), passwordHash });

  const sessionId = await createSession(user.id);
  return { user, sessionId };
}

export async function login({ email, password }) {
  const user = await authRepository.findUserByEmail(email);

  // Mesma mensagem genérica usada no mock (decisão da Etapa 5): não revela
  // se o e-mail existe ou não, para não facilitar descobrir contas.
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    throw new AppError('INVALID_CREDENTIALS', 401, 'E-mail ou senha incorretos.');
  }

  const sessionId = await createSession(user.id);
  return { user: { id: user.id, name: user.name, email: user.email }, sessionId };
}

export async function logout(sessionId) {
  if (sessionId) {
    await authRepository.deleteSession(sessionId);
  }
}

export async function getCurrentUser(sessionId) {
  if (!sessionId) return null;
  return authRepository.findUserBySessionId(sessionId);
}

async function createSession(userId) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  return authRepository.insertSession({ userId, expiresAt });
}