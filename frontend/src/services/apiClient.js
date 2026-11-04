export class ApiError extends Error {
  constructor(code, message, status) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

async function request(path, { method = 'GET', body } = {}) {
  const response = await fetch(`/api${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const code = payload?.error?.code ?? 'UNKNOWN_ERROR';
    const message = payload?.error?.message ?? 'Algo deu errado. Tente novamente.';

    // Sessão expirada ou apagada no meio do uso: volta para o login em vez de
    // deixar a tela presa em "Carregando..." (decisão D-100). A rota /auth/me
    // é exceção: é a verificação inicial, e "não logado" ali é normal.
    if (response.status === 401 && code === 'NOT_AUTHENTICATED' && path !== '/auth/me') {
      window.location.assign('/login');
    }

    throw new ApiError(code, message, response.status);
  }

  return payload.data;
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
};