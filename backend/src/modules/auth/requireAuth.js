import { AppError } from '../../core/errors.js';
import { readSessionIdFromCookies } from '../../core/cookies.js';
import * as authService from './authService.js';

// Middleware: verifica a sessão e anexa o usuário ao `ctx`, para os
// próximos endpoints protegidos (perfil, trilhas, progresso...) usarem
// sem repetir essa lógica. Lança 401 se não houver sessão válida.
export async function requireAuth(ctx) {
  const sessionId = readSessionIdFromCookies(ctx.req);
  const user = await authService.getCurrentUser(sessionId);

  if (!user) {
    throw new AppError('NOT_AUTHENTICATED', 401, 'Não autenticado.');
  }

  ctx.user = user;
}