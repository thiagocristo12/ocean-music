import { createRouter } from './core/router.js';
import { getHealth } from './modules/health/healthController.js';
import { postRegister, postLogin, postLogout, getMe } from './modules/auth/authController.js';
import { requireAuth } from './modules/auth/requireAuth.js';
import { getOptions } from './modules/catalog/catalogController.js';
import { getMyProfile, putMyProfile } from './modules/profile/profileController.js';
import { listTracks, getTrackBySlug } from './modules/tracks/trackController.js';
import { getLessonContent } from './modules/lessons/lessonController.js';
import { getMyProgress, postCompleteLesson } from './modules/progress/progressController.js';

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

  router.get('/api/tracks', listTracks);
  router.get('/api/tracks/:slug', getTrackBySlug);
  router.get('/api/lessons/:id', getLessonContent);

  router.get('/api/me/progress', [requireAuth], getMyProgress);
  router.post('/api/me/progress/complete-lesson', [requireAuth], postCompleteLesson);

  return router;
}