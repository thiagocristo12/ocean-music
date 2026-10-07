const SESSION_COOKIE_NAME = 'ocean_session';
const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;

export function readSessionIdFromCookies(req) {
  const header = req.headers.cookie;
  if (!header) return null;

  const match = header.split(';').find((part) => part.trim().startsWith(`${SESSION_COOKIE_NAME}=`));
  if (!match) return null;

  return decodeURIComponent(match.split('=')[1]);
}

export function writeSessionCookie(res, sessionId) {
  // HttpOnly: o cookie não pode ser lido por JavaScript no navegador
  // (proteção contra roubo de sessão via XSS).
  // SameSite=Lax: bloqueia o cookie em a maioria das requisições vindas
  // de outros sites (proteção contra CSRF), mas permite navegação normal.
  const cookie = [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(sessionId)}`,
    'HttpOnly',
    'Path=/',
    'SameSite=Lax',
    `Max-Age=${SEVEN_DAYS_IN_SECONDS}`,
  ].join('; ');

  res.setHeader('Set-Cookie', cookie);
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`);
}