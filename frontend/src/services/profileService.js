import { areas, styles, goals } from '../data/catalog.js';

const PROFILES_KEY = 'ocean:v1:profiles';
const DRAFT_KEY_PREFIX = 'ocean:v1:onboardingDraft:';

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readProfiles() {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeProfiles(profiles) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

// Simula uma chamada de API que devolve o catálogo (útil se, no futuro,
// as opções passarem a vir do backend em vez de um arquivo local).
export async function getOptions() {
  await delay(150);
  return { areas, styles, goals };
}

export async function getProfile(userId) {
  await delay();
  const profiles = readProfiles();
  return profiles[userId] || null;
}

export async function saveProfile(userId, input) {
  await delay();
  const profiles = readProfiles();

  const profile = {
    level: input.level,
    priorExperience: input.priorExperience,
    areaSlugs: input.areaSlugs,
    goalSlugs: input.goalSlugs,
    styleSlugs: input.styleSlugs,
    completedAt: new Date().toISOString(),
  };

  profiles[userId] = profile;
  writeProfiles(profiles);
  clearDraft(userId);
  return profile;
}

// --- Rascunho do onboarding (para não perder o progresso ao recarregar) ---

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