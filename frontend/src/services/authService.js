import { apiClient, ApiError } from './apiClient.js';

// Mantemos o nome AuthError por compatibilidade: AuthProvider.jsx verifica
// `error.code` (não o nome da classe), então isso funciona sem alterações
// lá. ApiError já expõe .code do mesmo jeito que o antigo AuthError mock.
export { ApiError as AuthError };

export async function register({ name, email, password }) {
  const { user } = await apiClient.post('/auth/register', { name, email, password });
  return user;
}

export async function login({ email, password }) {
  const { user } = await apiClient.post('/auth/login', { email, password });
  return user;
}

export async function logout() {
  await apiClient.post('/auth/logout');
}

export async function getCurrentUser() {
  try {
    const { user } = await apiClient.get('/auth/me');
    return user;
  } catch (error) {
    // Não logado é uma situação normal (ex.: primeira visita), não um
    // erro a ser propagado — mesma semântica que o mock sempre teve
    // (devolvia `null` em vez de lançar).
    if (error instanceof ApiError && error.code === 'NOT_AUTHENTICATED') {
      return null;
    }
    throw error;
  }
}