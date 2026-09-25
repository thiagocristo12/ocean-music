import { useState, useEffect, useCallback } from 'react';
import AuthContext from './AuthContext.js';
import * as authService from '../services/authService.js';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ao abrir (ou recarregar) o app, verifica se já existe uma sessão salva
  useEffect(() => {
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
  }, []);

  const register = useCallback(async (data) => {
    const newUser = await authService.register(data);
    setUser(newUser);
    return newUser;
  }, []);

  const login = useCallback(async (data) => {
    const loggedUser = await authService.login(data);
    setUser(loggedUser);
    return loggedUser;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;