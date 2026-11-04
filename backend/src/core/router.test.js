import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createRouter } from './router.js';
import { AppError } from './errors.js';
import { readJsonBody } from './http.js';

// Sobe o roteador num servidor temporário (porta 0 = o sistema escolhe uma livre),
// executa o teste e sempre fecha o servidor no final.
async function withServer(router, run) {
  const server = http.createServer((req, res) => router.handle(req, res));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  try {
    await run(baseUrl);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
}

function postJson(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
}

test('responde 200 com o dado dentro de { data }', async () => {
  const router = createRouter();
  router.get('/ping', () => ({ ok: true }));

  await withServer(router, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/ping`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { data: { ok: true } });
  });
});

test('extrai parâmetros de rota', async () => {
  const router = createRouter();
  router.get('/items/:id', ({ params }) => ({ id: params.id }));

  await withServer(router, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/items/violao-primeiros-passos`);
    assert.deepEqual((await response.json()).data, { id: 'violao-primeiros-passos' });
  });
});

test('rota inexistente devolve 404', async () => {
  const router = createRouter();
  await withServer(router, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/nao-existe`);
    assert.equal(response.status, 404);
    assert.equal((await response.json()).error.code, 'NOT_FOUND');
  });
});

test('método errado numa rota que existe devolve 405', async () => {
  const router = createRouter();
  router.get('/ping', () => ({ ok: true }));

  await withServer(router, async (baseUrl) => {
    const response = await postJson(`${baseUrl}/ping`, '{}');
    assert.equal(response.status, 405);
    assert.equal((await response.json()).error.code, 'METHOD_NOT_ALLOWED');
  });
});

test('AppError vira a resposta com o status e o código próprios', async () => {
  const router = createRouter();
  router.get('/conflito', () => {
    throw new AppError('EMAIL_TAKEN', 409, 'Esse e-mail já está cadastrado.');
  });

  await withServer(router, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/conflito`);
    assert.equal(response.status, 409);
    const body = await response.json();
    assert.equal(body.error.code, 'EMAIL_TAKEN');
    assert.equal(body.error.message, 'Esse e-mail já está cadastrado.');
  });
});

test('erro inesperado vira 500 genérico, sem vazar detalhes', async () => {
  const router = createRouter();
  router.get('/bug', () => {
    throw new Error('segredo interno: tabela users');
  });

  const originalConsoleError = console.error;
  console.error = () => {}; // o roteador registra o erro no terminal; aqui silenciamos
  try {
    await withServer(router, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/bug`);
      assert.equal(response.status, 500);
      const text = await response.text();
      assert.ok(text.includes('INTERNAL_ERROR'));
      assert.ok(!text.includes('segredo interno'));
    });
  } finally {
    console.error = originalConsoleError;
  }
});

test('middleware roda antes do handler e pode bloqueá-lo', async () => {
  const router = createRouter();
  const calls = [];

  router.get('/aberta', [async () => { calls.push('middleware'); }], () => {
    calls.push('handler');
    return { ok: true };
  });
  router.get(
    '/fechada',
    [async () => { throw new AppError('NOT_AUTHENTICATED', 401, 'Não autenticado.'); }],
    () => {
      calls.push('handler-fechada');
      return {};
    }
  );

  await withServer(router, async (baseUrl) => {
    await fetch(`${baseUrl}/aberta`);
    assert.deepEqual(calls, ['middleware', 'handler']);

    const blocked = await fetch(`${baseUrl}/fechada`);
    assert.equal(blocked.status, 401);
    assert.deepEqual(calls, ['middleware', 'handler']); // handler-fechada nunca rodou
  });
});

test('endereço com codificação inválida devolve 400 (e não derruba o servidor)', async () => {
  const router = createRouter();
  router.get('/items/:id', ({ params }) => ({ id: params.id }));

  await withServer(router, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/items/%E0%A4%A`);
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error.code, 'INVALID_PATH');

    // O servidor continua de pé: uma requisição normal depois ainda funciona.
    const next = await fetch(`${baseUrl}/items/ok`);
    assert.equal(next.status, 200);
  });
});

test('JSON inválido devolve 400, não 500', async () => {
  const router = createRouter();
  router.post('/echo', ({ req }) => readJsonBody(req));

  await withServer(router, async (baseUrl) => {
    const response = await postJson(`${baseUrl}/echo`, '{invalido');
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error.code, 'INVALID_JSON');
  });
});

test('corpo JSON que não é um objeto devolve 400', async () => {
  const router = createRouter();
  router.post('/echo', ({ req }) => readJsonBody(req));

  await withServer(router, async (baseUrl) => {
    for (const body of ['5', 'null', '[]', '"texto"']) {
      const response = await postJson(`${baseUrl}/echo`, body);
      assert.equal(response.status, 400, `corpo ${body} deveria ser recusado`);
    }
  });
});

test('corpo acima de 100 KB devolve 413', async () => {
  const router = createRouter();
  router.post('/echo', ({ req }) => readJsonBody(req));

  await withServer(router, async (baseUrl) => {
    const body = JSON.stringify({ texto: 'x'.repeat(300 * 1024) });
    const response = await postJson(`${baseUrl}/echo`, body);
    assert.equal(response.status, 413);
    assert.equal((await response.json()).error.code, 'PAYLOAD_TOO_LARGE');
  });
});

test('corpo JSON válido (objeto) é lido normalmente', async () => {
  const router = createRouter();
  router.post('/echo', ({ req }) => readJsonBody(req));

  await withServer(router, async (baseUrl) => {
    const response = await postJson(`${baseUrl}/echo`, '{"nome":"Ana"}');
    assert.equal(response.status, 200);
    assert.deepEqual((await response.json()).data, { nome: 'Ana' });
  });
});