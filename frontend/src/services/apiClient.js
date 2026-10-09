// Erro padronizado para qualquer chamada à API — o "equivalente real" do
// AuthError que o mock lançava (Etapa 5), mas genérico para qualquer
// endpoint, não só autenticação.
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
    // Garante que o cookie de sessão (HttpOnly) seja enviado e recebido —
    // sem isso, cada requisição pareceria vir de um visitante anônimo novo.
    credentials: 'same-origin',
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const code = payload?.error?.code ?? 'UNKNOWN_ERROR';
    const message = payload?.error?.message ?? 'Algo deu errado. Tente novamente.';
    throw new ApiError(code, message, response.status);
  }

  return payload.data;
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
};