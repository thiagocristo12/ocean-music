import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  DEFAULT_PREFERENCES,
  SOUND_DISABLED_EVENT,
  loadPreferences,
  savePreferences,
  isSoundEnabled,
  notifySoundDisabled,
} from './preferences.js';

const KEY = 'ocean:v1:preferences';

// Armazenamento falso, em memória (os testes rodam fora do navegador).
function createFakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    data,
    getItem: vi.fn((key) => (key in data ? data[key] : null)),
    setItem: vi.fn((key, value) => {
      data[key] = String(value);
    }),
  };
}

let storage;

beforeEach(() => {
  storage = createFakeStorage();
  vi.stubGlobal('localStorage', storage);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('loadPreferences', () => {
  it('sem nada salvo, devolve os padrões', () => {
    expect(loadPreferences()).toEqual(DEFAULT_PREFERENCES);
  });

  it('os padrões são: som ligado, sem modo simplificado e sem redução de animações', () => {
    expect(DEFAULT_PREFERENCES).toEqual({ simplifiedMode: false, reduceMotion: false, soundEnabled: true });
  });

  it('JSON corrompido cai nos padrões, sem quebrar', () => {
    storage.data[KEY] = '{isso não é json';
    expect(loadPreferences()).toEqual(DEFAULT_PREFERENCES);
  });

  it('se o armazenamento lançar erro ao ler, cai nos padrões', () => {
    storage.getItem.mockImplementation(() => {
      throw new Error('bloqueado');
    });
    expect(loadPreferences()).toEqual(DEFAULT_PREFERENCES);
  });

  it('dado parcial é completado com os padrões', () => {
    storage.data[KEY] = JSON.stringify({ soundEnabled: false });
    expect(loadPreferences()).toEqual({ simplifiedMode: false, reduceMotion: false, soundEnabled: false });
  });

  it('ignora valores que não são booleanos e chaves desconhecidas', () => {
    storage.data[KEY] = JSON.stringify({ soundEnabled: 'não', reduceMotion: 1, simplifiedMode: true, tema: 'escuro' });
    expect(loadPreferences()).toEqual({ simplifiedMode: true, reduceMotion: false, soundEnabled: true });
  });

  it('um valor que não é objeto (ex.: lista ou número) cai nos padrões', () => {
    storage.data[KEY] = JSON.stringify([1, 2, 3]);
    expect(loadPreferences()).toEqual(DEFAULT_PREFERENCES);
    storage.data[KEY] = '42';
    expect(loadPreferences()).toEqual(DEFAULT_PREFERENCES);
  });
});

describe('savePreferences', () => {
  it('grava e a leitura seguinte devolve o mesmo valor', () => {
    const saved = savePreferences({ simplifiedMode: true, reduceMotion: true, soundEnabled: false });
    expect(saved).toEqual({ simplifiedMode: true, reduceMotion: true, soundEnabled: false });
    expect(loadPreferences()).toEqual(saved);
  });

  it('grava só as chaves conhecidas', () => {
    savePreferences({ simplifiedMode: true, intruso: 'x' });
    expect(JSON.parse(storage.data[KEY])).toEqual({ simplifiedMode: true, reduceMotion: false, soundEnabled: true });
  });

  it('se o armazenamento lançar erro ao gravar, não quebra e devolve o valor', () => {
    storage.setItem.mockImplementation(() => {
      throw new Error('cota excedida');
    });
    expect(savePreferences({ simplifiedMode: true })).toEqual({
      simplifiedMode: true,
      reduceMotion: false,
      soundEnabled: true,
    });
  });
});

describe('isSoundEnabled', () => {
  it('é verdadeiro por padrão', () => {
    expect(isSoundEnabled()).toBe(true);
  });

  it('acompanha o que foi salvo, na hora', () => {
    savePreferences({ soundEnabled: false });
    expect(isSoundEnabled()).toBe(false);
    savePreferences({ soundEnabled: true });
    expect(isSoundEnabled()).toBe(true);
  });
});

describe('notifySoundDisabled', () => {
  it('dispara o evento que o aviso de som desativado escuta', () => {
    const fakeWindow = { dispatchEvent: vi.fn() };
    vi.stubGlobal('window', fakeWindow);
    notifySoundDisabled();
    expect(fakeWindow.dispatchEvent).toHaveBeenCalledTimes(1);
    expect(fakeWindow.dispatchEvent.mock.calls[0][0].type).toBe(SOUND_DISABLED_EVENT);
  });
});