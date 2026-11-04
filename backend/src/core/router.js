import { sendJson } from './http.js';
import { AppError } from './errors.js';

function compilePath(path) {
  const paramNames = [];
  const pattern = path
    .split('/')
    .map((segment) => {
      if (segment.startsWith(':')) {
        paramNames.push(segment.slice(1));
        return '([^/]+)';
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');

  return { regex: new RegExp(`^${pattern}$`), paramNames };
}

function parseUrl(req) {
  try {
    return new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);
  } catch {
    throw new AppError('INVALID_PATH', 400, 'Endereço inválido.');
  }
}

export function createRouter() {
  const routes = []; // { method, regex, paramNames, middlewares, handler }

  // Aceita register(method, path, handler) e register(method, path, [middlewares], handler).
  function register(method, path, middlewaresOrHandler, maybeHandler) {
    const hasMiddlewares = Array.isArray(middlewaresOrHandler);
    const middlewares = hasMiddlewares ? middlewaresOrHandler : [];
    const handler = hasMiddlewares ? maybeHandler : middlewaresOrHandler;

    const { regex, paramNames } = compilePath(path);
    routes.push({ method, regex, paramNames, middlewares, handler });
  }

  function extractParams(route, pathname) {
    const match = route.regex.exec(pathname);
    const params = {};
    route.paramNames.forEach((name, index) => {
      try {
        params[name] = decodeURIComponent(match[index + 1]);
      } catch {
        // Ex.: "%E0%A4%A" (codificação incompleta na URL)
        throw new AppError('INVALID_PATH', 400, 'Endereço inválido.');
      }
    });
    return params;
  }

  async function handle(req, res) {
    // TUDO acontece dentro do try (decisão D-95). O servidor chama handle()
    // sem ninguém aguardar a Promise: um erro fora do try viraria uma
    // "unhandled rejection" e derrubaria o processo inteiro do Node.
    try {
      const url = parseUrl(req);
      const pathname = url.pathname;

      const matchingRoute = routes.find(
        (route) => route.method === req.method && route.regex.test(pathname)
      );

      if (!matchingRoute) {
        const pathExists = routes.some((route) => route.regex.test(pathname));
        if (pathExists) throw new AppError('METHOD_NOT_ALLOWED', 405, 'Método não permitido.');
        throw new AppError('NOT_FOUND', 404, 'Rota não encontrada.');
      }

      const params = extractParams(matchingRoute, pathname);
      const query = Object.fromEntries(url.searchParams);
      const ctx = { req, res, params, query };

      for (const middleware of matchingRoute.middlewares) {
        await middleware(ctx);
      }
      const data = await matchingRoute.handler(ctx);
      sendJson(res, 200, { data });
    } catch (error) {
      if (error instanceof AppError) {
        sendJson(res, error.statusCode, { error: { code: error.code, message: error.message } });
      } else {
        console.error('Erro interno:', error);
        sendJson(res, 500, { error: { code: 'INTERNAL_ERROR', message: 'Erro interno do servidor.' } });
      }
    }
  }

  return {
    get: (path, ...args) => register('GET', path, ...args),
    post: (path, ...args) => register('POST', path, ...args),
    put: (path, ...args) => register('PUT', path, ...args),
    patch: (path, ...args) => register('PATCH', path, ...args),
    delete: (path, ...args) => register('DELETE', path, ...args),
    handle,
  };
}