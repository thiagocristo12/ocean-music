export class ApiError extends Error {
  constructor(code, message, status) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

// Avisa a interface (ConnectionBanner) que a comunicação com o servidor
// falhou. kind: 'connection' (sem resposta) ou 'server' (erro interno nosso).
function notifyConnectionProblem(kind) {
  window.dispatchEvent(new CustomEvent('ocean:connection-problem', { detail: { kind } }));
}

async function request(path, { method = 'GET', body } = {}) {
  let response;
  try {
    response = await fetch(`/api${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'same-origin',
    });
  } catch {
    // Falha de rede: o servidor nem chegou a responder.
    notifyConnectionProblem('connection');
    throw new ApiError('NETWORK_ERROR', 'Não foi possível conectar ao servidor.', 0);
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const code = payload?.error?.code ?? 'UNKNOWN_ERROR';
    const message = payload?.error?.message ?? 'Algo deu errado. Tente novamente.';

    // 5xx com o envelope do nosso roteador = bug do servidor.
    // 5xx SEM envelope = não foi o nosso servidor que respondeu (ex.: o proxy
    // do Vite devolve 500 vazio quando o backend está desligado) (D-103).
    if (response.status >= 500) {
      notifyConnectionProblem(payload?.error?.code ? 'server' : 'connection');
    }

    // Sessão expirada ou apagada no meio do uso: volta para o login (D-100).
    // /auth/me é exceção: "não logado" ali é normal.
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