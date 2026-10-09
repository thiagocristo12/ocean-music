import { useState, useEffect, useCallback } from 'react';
import ProfileContext from './ProfileContext.js';
import useAuth from '../hooks/useAuth.js';
import * as profileService from '../services/profileService.js';

function ProfileProvider({ children }) {
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?.id ?? null;

  // Guarda o perfil JUNTO com o id do usuário a quem ele pertence.
  // Assim sabemos se o que está no estado é do usuário atual ou sobra de outro.
  const [loaded, setLoaded] = useState({ userId: null, profile: null });

  useEffect(() => {
    if (!userId) return;
    let isCancelled = false;

    profileService.getProfile().then((current) => {
      if (isCancelled) return;
      setLoaded({ userId, profile: current });
    });

    return () => {
      isCancelled = true;
    };
  }, [userId]);

  const isCurrentUserLoaded = userId !== null && loaded.userId === userId;
  const profile = isCurrentUserLoaded ? loaded.profile : null;

  // Carregando = a autenticação ainda não terminou, OU há usuário logado
  // cujo perfil ainda não chegou.
  const isLoading = authLoading || (userId !== null && !isCurrentUserLoaded);

  const refreshProfile = useCallback(async () => {
    if (!userId) return;
    const current = await profileService.getProfile();
    setLoaded({ userId, profile: current });
  }, [userId]);

  const saveProfile = useCallback(
    async (input) => {
      if (!userId) throw new Error('Usuário não autenticado.');
      const saved = await profileService.saveProfile(input);
      setLoaded({ userId, profile: saved });
      return saved;
    },
    [userId]
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