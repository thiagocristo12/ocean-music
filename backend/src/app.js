import { createRouter } from './core/router.js';
import { getHealth } from './modules/health/healthController.js';
import { postRegister, postLogin, postLogout, getMe } from './modules/auth/authController.js';
import { requireAuth } from './modules/auth/requireAuth.js';

export function createApp() {
  const router = createRouter();

  router.get('/api/health', getHealth);

  router.post('/api/auth/register', postRegister);
  router.post('/api/auth/login', postLogin);
  router.post('/api/auth/logout', postLogout);
  router.get('/api/auth/me', [requireAuth], getMe);

  return router;
}