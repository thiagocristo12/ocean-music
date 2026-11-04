import { AppError } from './errors.js';

const MAX_BODY_BYTES = 100 * 1024; // 100 KB (decisão D-96)

// Lê o corpo de uma requisição (POST/PUT/PATCH) e devolve como texto.
// node:http entrega o corpo em pedaços (chunks); aqui juntamos tudo,
// recusando corpos grandes demais.
export function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalBytes = 0;
    let isTooLarge = false;

    req.on('data', (chunk) => {
      if (isTooLarge) return; // descarta o resto sem guardar em memória
      totalBytes += chunk.length;
      if (totalBytes > MAX_BODY_BYTES) {
        isTooLarge = true;
        chunks.length = 0;
        reject(new AppError('PAYLOAD_TOO_LARGE', 413, 'Corpo da requisição grande demais.'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (!isTooLarge) resolve(Buffer.concat(chunks).toString('utf-8'));
    });
    req.on('error', reject);
  });
}

// Lê e decodifica um corpo JSON. Corpo vazio vira {}.
// O corpo precisa ser um OBJETO (não 5, null, "texto" nem lista), porque
// os controllers leem campos como body.email.
export async function readJsonBody(req) {
  const raw = await readRequestBody(req);
  if (!raw) return {};

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new AppError('INVALID_JSON', 400, 'Corpo da requisição não é um JSON válido.');
  }

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new AppError('INVALID_JSON', 400, 'O corpo da requisição deve ser um objeto JSON.');
  }
  return parsed;
}

// Envia uma resposta JSON, sempre no mesmo envelope { data: ... }.
export function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}