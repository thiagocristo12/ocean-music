import { useState, useEffect, useCallback } from 'react';
import ProfileContext from './ProfileContext.js';
import useAuth from '../hooks/useAuth.js';
import * as profileService from '../services/profileService.js';

function ProfileProvider({ children }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Recarrega sempre que o usuário mudar (login, logout ou troca de conta).
  // Mesmo padrão do AuthProvider: nenhum setState roda diretamente no corpo
  // do efeito — tudo acontece dentro do .then(), que é assíncrono por
  // natureza e não conta como "setState síncrono dentro de um efeito".
  useEffect(() => {
    let isCancelled = false;

    Promise.resolve()
      .then(() => (user ? profileService.getProfile(user.id) : null))
      .then((current) => {
        if (isCancelled) return;
        setProfile(current);
        setIsLoading(false);
      });

    // Evita atualizar o estado se o usuário mudar de novo antes
    // da primeira busca terminar (efeito "cancelado")
    return () => {
      isCancelled = true;
    };
  }, [user]);

  // Recarrega o perfil sob demanda, fora de um efeito
  // (ex.: útil se no futuro criarmos um botão "atualizar perfil")
  const refreshProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      return;
    }
    const current = await profileService.getProfile(user.id);
    setProfile(current);
  }, [user]);

  const saveProfile = useCallback(
    async (input) => {
      if (!user) throw new Error('Usuário não autenticado.');
      const saved = await profileService.saveProfile(user.id, input);
      setProfile(saved);
      return saved;
    },
    [user]
  );

  const value = {
    profile,
    isLoading,
    isOnboardingComplete: Boolean(profile),
    saveProfile,
    refreshProfile,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export default ProfileProvider;