import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiClient } from './apiClient.js';

// Simula uma resposta do fetch. body === undefined = resposta sem corpo
// (como a que o proxy do Vite devolve com o backend desligado).
function mockFetch({ ok, status, body }) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => (body === undefined ? Promise.reject(new Error('sem corpo')) : Promise.resolve(body)),
  });
}

let fakeWindow;

beforeEach(() => {
  fakeWindow = { dispatchEvent: vi.fn(), location: { assign: vi.fn() } };
  vi.stubGlobal('window', fakeWindow);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function lastEventKind() {
  return fakeWindow.dispatchEvent.mock.calls.at(-1)?.[0].detail.kind;
}

describe('apiClient', () => {
  it('devolve o conteúdo de { data } quando tudo dá certo', async () => {
    vi.stubGlobal('fetch', mockFetch({ ok: true, status: 200, body: { data: { x: 1 } } }));
    expect(await apiClient.get('/qualquer')).toEqual({ x: 1 });
    expect(fakeWindow.dispatchEvent).not.toHaveBeenCalled();
  });

  it('falha de rede vira NETWORK_ERROR e avisa a interface (connection)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(apiClient.get('/x')).rejects.toMatchObject({ code: 'NETWORK_ERROR' });
    expect(lastEventKind()).toBe('connection');
  });

  it('500 com o envelope do nosso servidor avisa "server"', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({ ok: false, status: 500, body: { error: { code: 'INTERNAL_ERROR', message: 'Erro interno do servidor.' } } })
    );
    await expect(apiClient.get('/x')).rejects.toMatchObject({ code: 'INTERNAL_ERROR', status: 500 });
    expect(lastEventKind()).toBe('server');
  });

  it('500 sem corpo (proxy com o backend desligado) avisa "connection"', async () => {
    vi.stubGlobal('fetch', mockFetch({ ok: false, status: 500, body: undefined }));
    await expect(apiClient.get('/x')).rejects.toMatchObject({ code: 'UNKNOWN_ERROR', status: 500 });
    expect(lastEventKind()).toBe('connection');
  });

  it('401 NOT_AUTHENTICATED numa rota protegida leva ao login', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({ ok: false, status: 401, body: { error: { code: 'NOT_AUTHENTICATED', message: 'Não autenticado.' } } })
    );
    await expect(apiClient.get('/me/progress')).rejects.toMatchObject({ code: 'NOT_AUTHENTICATED' });
    expect(fakeWindow.location.assign).toHaveBeenCalledWith('/login');
  });

  it('401 em /auth/me NÃO redireciona (não estar logado é normal ali)', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({ ok: false, status: 401, body: { error: { code: 'NOT_AUTHENTICATED', message: 'Não autenticado.' } } })
    );
    await expect(apiClient.get('/auth/me')).rejects.toMatchObject({ code: 'NOT_AUTHENTICATED' });
    expect(fakeWindow.location.assign).not.toHaveBeenCalled();
  });

  it('erro de validação (422) vira ApiError com o código, sem avisar a interface', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({ ok: false, status: 422, body: { error: { code: 'VALIDATION_ERROR', message: 'Dados inválidos.' } } })
    );
    await expect(apiClient.post('/x', {})).rejects.toMatchObject({ code: 'VALIDATION_ERROR', status: 422 });
    expect(fakeWindow.dispatchEvent).not.toHaveBeenCalled();
  });
});