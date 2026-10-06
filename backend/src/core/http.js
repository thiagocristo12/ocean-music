// Lê o corpo de uma requisição (POST/PUT/PATCH) e devolve como texto.
// node:http entrega o corpo em pedaços (chunks); aqui juntamos tudo.
export function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', reject);
  });
}

// Lê e decodifica um corpo JSON. Corpo vazio vira {} (ex.: POST sem dados).
export async function readJsonBody(req) {
  const raw = await readRequestBody(req);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error('Corpo da requisição não é um JSON válido.');
    error.statusCode = 400;
    error.code = 'INVALID_JSON';
    throw error;
  }
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