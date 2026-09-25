import { createContext } from 'react';

// Só o "objeto" de contexto — fica separado do Provider (arquivo .jsx)
// para respeitar a mesma regra do Fast Refresh que corrigimos no Button:
// um arquivo de componente não deve exportar mais nada além de componentes.
const AuthContext = createContext(null);

export default AuthContext;