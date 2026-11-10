// Preferências do usuário, guardadas SÓ no navegador (localStorage), por
// dispositivo e sem depender de login (decisão D-113).
const STORAGE_KEY = 'ocean:v1:preferences';

export const DEFAULT_PREFERENCES = {
  simplifiedMode: false, // conteúdo das lições em partes pequenas, uma por vez
  reduceMotion: false, // diminui as animações da interface
  soundEnabled: true, // metrônomo, notas e exercícios de áudio
};

export const SOUND_DISABLED_EVENT = 'ocean:sound-disabled';

// Aceita apenas as chaves conhecidas, com valores booleanos. Qualquer outra
// coisa (dado antigo, corrompido ou editado à mão) cai no valor padrão.
function sanitize(raw) {
  const result = { ...DEFAULT_PREFERENCES };
  if (raw && typeof raw === 'object') {
    for (const key of Object.keys(DEFAULT_PREFERENCES)) {
      if (typeof raw[key] === 'boolean') result[key] = raw[key];
    }
  }
  return result;
}

export function loadPreferences() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return sanitize(stored ? JSON.parse(stored) : null);
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

export function savePreferences(preferences) {
  const clean = sanitize(preferences);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
  } catch {
    // Armazenamento indisponível (ex.: modo privado restrito): a preferência
    // continua valendo na sessão atual, só não é lembrada depois.
  }
  return clean;
}

// Lê direto do armazenamento, a cada chamada: os hooks de áudio sempre veem
// o valor atual, sem depender de estado do React (decisão D-115).
export function isSoundEnabled() {
  return loadPreferences().soundEnabled;
}

export function notifySoundDisabled() {
  window.dispatchEvent(new CustomEvent(SOUND_DISABLED_EVENT));
}