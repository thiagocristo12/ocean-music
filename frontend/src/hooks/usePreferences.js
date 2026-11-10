import { useContext } from 'react';
import PreferencesContext from '../context/PreferencesContext.js';

function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences precisa ser usado dentro de um <PreferencesProvider>.');
  }
  return context;
}

export default usePreferences;