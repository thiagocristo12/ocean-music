import { createRouter } from './core/router.js';
import { getHealth } from './modules/health/healthController.js';
import { postRegister, postLogin, postLogout, getMe } from './modules/auth/authController.js';
import { requireAuth } from './modules/auth/requireAuth.js';
import { getOptions } from './modules/catalog/catalogController.js';
import { getMyProfile, putMyProfile } from './modules/profile/profileController.js';

export function createApp() {
  const router = createRouter();

  router.get('/api/health', getHealth);

  router.post('/api/auth/register', postRegister);
  router.post('/api/auth/login', postLogin);
  router.post('/api/auth/logout', postLogout);
  router.get('/api/auth/me', [requireAuth], getMe);

  router.get('/api/catalog/options', getOptions);

  router.get('/api/me/profile', [requireAuth], getMyProfile);
  router.put('/api/me/profile', [requireAuth], putMyProfile);

  return router;
}