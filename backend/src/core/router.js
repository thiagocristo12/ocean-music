import { sendJson } from './http.js';
import { AppError } from './errors.js';

// Transforma um caminho como '/api/tracks/:slug' em um RegExp que
// reconhece '/api/tracks/violao-primeiros-passos' e extrai { slug: '...' }.
function compilePath(path) {
  const paramNames = [];
  const pattern = path
    .split('/')
    .map((segment) => {
      if (segment.startsWith(':')) {
        paramNames.push(segment.slice(1));
        return '([^/]+)';
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escapa caracteres especiais de regex
    })
    .join('/');

  return { regex: new RegExp(`^${pattern}$`), paramNames };
}

export function createRouter() {
  const routes = []; // { method, regex, paramNames, handler }

  function register(method, path, handler) {
    const { regex, paramNames } = compilePath(path);
    routes.push({ method, regex, paramNames, handler });
  }

  function extractParams(route, pathname) {
    const match = route.regex.exec(pathname);
    const params = {};
    route.paramNames.forEach((name, index) => {
      params[name] = decodeURIComponent(match[index + 1]);
    });
    return params;
  }

  // handler(ctx) deve devolver os dados a serem enviados como resposta
  // (o router embrulha em { data: ... } e cuida do status 200).
  // Para erros esperados, o handler lança um AppError.
  async function handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    const matchingRoute = routes.find(
      (route) => route.method === req.method && route.regex.test(pathname)
    );

    if (!matchingRoute) {
      // Existe alguma rota com esse caminho, mas método diferente?
      const pathExists = routes.some((route) => route.regex.test(pathname));
      if (pathExists) {
        sendJson(res, 405, { error: { code: 'METHOD_NOT_ALLOWED', message: 'Método não permitido.' } });
      } else {
        sendJson(res, 404, { error: { code: 'NOT_FOUND', message: 'Rota não encontrada.' } });
      }
      return;
    }

    const params = extractParams(matchingRoute, pathname);
    const query = Object.fromEntries(url.searchParams);

    try {
      const data = await matchingRoute.handler({ req, res, params, query });
      sendJson(res, 200, { data });
    } catch (error) {
      if (error instanceof AppError) {
        sendJson(res, error.statusCode, { error: { code: error.code, message: error.message } });
      } else {
        // Erro inesperado (bug): não vaza detalhes internos para o cliente,
        // mas registra no terminal do servidor para você conseguir depurar.
        console.error('Erro interno:', error);
        sendJson(res, 500, { error: { code: 'INTERNAL_ERROR', message: 'Erro interno do servidor.' } });
      }
    }
  }

  return {
    get: (path, handler) => register('GET', path, handler),
    post: (path, handler) => register('POST', path, handler),
    put: (path, handler) => register('PUT', path, handler),
    patch: (path, handler) => register('PATCH', path, handler),
    delete: (path, handler) => register('DELETE', path, handler),
    handle,
  };
}