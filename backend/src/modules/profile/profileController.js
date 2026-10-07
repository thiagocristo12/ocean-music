import { readJsonBody } from '../../core/http.js';
import * as profileService from './profileService.js';

export async function getMyProfile({ user }) {
  const profile = await profileService.getProfile(user.id);
  return { profile };
}

export async function putMyProfile({ req, user }) {
  const body = await readJsonBody(req);
  const profile = await profileService.saveProfile(user.id, body);
  return { profile };
}