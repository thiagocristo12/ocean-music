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

export function createRouter() {
  const routes = []; // { method, regex, paramNames, middlewares, handler }

  // Aceita tanto register(method, path, handler)
  // quanto register(method, path, [middlewares], handler).
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
      params[name] = decodeURIComponent(match[index + 1]);
    });
    return params;
  }

  async function handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    const matchingRoute = routes.find(
      (route) => route.method === req.method && route.regex.test(pathname)
    );

    if (!matchingRoute) {
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
    const ctx = { req, res, params, query };

    try {
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