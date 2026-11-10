import { useState, useCallback, useLayoutEffect } from 'react';
import PreferencesContext from './PreferencesContext.js';
import { DEFAULT_PREFERENCES, loadPreferences, savePreferences } from '../utils/preferences.js';

function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(() => loadPreferences());

  // Aplica "Reduzir animações" na página inteira: um atributo no <html> que o
  // CSS (index.css) lê. useLayoutEffect roda antes de a tela ser pintada,
  // então não há um "piscar" com animações ao abrir o app (decisão D-117).
  useLayoutEffect(() => {
    document.documentElement.dataset.reduceMotion = String(preferences.reduceMotion);
  }, [preferences.reduceMotion]);

  const updatePreference = useCallback(
    (key, value) => {
      setPreferences(savePreferences({ ...preferences, [key]: value }));
    },
    [preferences]
  );

  const resetPreferences = useCallback(() => {
    setPreferences(savePreferences(DEFAULT_PREFERENCES));
  }, []);

  const value = { preferences, updatePreference, resetPreferences };

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export default PreferencesProvider;