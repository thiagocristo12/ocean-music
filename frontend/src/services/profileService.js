import { apiClient } from './apiClient.js';

const DRAFT_KEY_PREFIX = 'ocean:v1:onboardingDraft:';

export async function getOptions() {
  return apiClient.get('/catalog/options');
}

export async function getProfile() {
  const { profile } = await apiClient.get('/me/profile');
  return profile;
}

export async function saveProfile(input) {
  const { profile } = await apiClient.put('/me/profile', input);
  return profile;
}

// --- Rascunho do onboarding: continua em localStorage de propósito ---
// É um dado efêmero, de uso só durante o preenchimento do formulário;
// não faz sentido ocupar uma tabela no banco para isso (ver decisão D-74).

export function getDraft(userId) {
  try {
    const raw = localStorage.getItem(DRAFT_KEY_PREFIX + userId);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDraft(userId, draft) {
  localStorage.setItem(DRAFT_KEY_PREFIX + userId, JSON.stringify(draft));
}

export function clearDraft(userId) {
  localStorage.removeItem(DRAFT_KEY_PREFIX + userId);
}