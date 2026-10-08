import { readJsonBody } from '../../core/http.js';
import * as progressService from './progressService.js';

export async function getMyProgress({ user }) {
  return progressService.getDashboardInputs(user.id);
}

export async function postCompleteLesson({ req, user }) {
  const body = await readJsonBody(req);
  await progressService.completeLesson(user.id, body);
  return { success: true };
}