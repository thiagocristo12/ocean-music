import { createRouter } from './core/router.js';
import { getHealth } from './modules/health/healthController.js';

export function createApp() {
  const router = createRouter();

  router.get('/api/health', getHealth);

  return router;
}