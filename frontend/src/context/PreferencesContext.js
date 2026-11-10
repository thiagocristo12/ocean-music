import { createContext } from 'react';

// Só o objeto de contexto (arquivo separado do Provider: regra do Fast Refresh).
const PreferencesContext = createContext(null);

export default PreferencesContext;