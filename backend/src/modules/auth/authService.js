import { hashPassword, verifyPassword } from '../../core/password.js';
import { AppError } from '../../core/errors.js';
import * as authRepository from './authRepository.js';

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias
const UNIQUE_VIOLATION = '23505'; // código do PostgreSQL para "valor duplicado"

function emailTakenError() {
  return new AppError('EMAIL_TAKEN', 409, 'Esse e-mail já está cadastrado.');
}

export async function register({ name, email, password }) {
  const cleanEmail = email.trim();

  const existing = await authRepository.findUserByEmail(cleanEmail);
  if (existing) throw emailTakenError();

  const passwordHash = await hashPassword(password);

  let user;
  try {
    user = await authRepository.insertUser({ name: name.trim(), email: cleanEmail, passwordHash });
  } catch (error) {
    // Dois cadastros simultâneos com o mesmo e-mail: o índice único do banco
    // barra o segundo, e aqui traduzimos para a mesma resposta amigável.
    if (error.code === UNIQUE_VIOLATION) throw emailTakenError();
    throw error;
  }

  const sessionId = await createSession(user.id);
  return { user, sessionId };
}

export async function login({ email, password }) {
  const user = await authRepository.findUserByEmail(email.trim());

  // Mensagem genérica de propósito: não revela se o e-mail existe.
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