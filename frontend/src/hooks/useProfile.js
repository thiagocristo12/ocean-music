import { useContext } from 'react';
import ProfileContext from '../context/ProfileContext.js';

function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile precisa ser usado dentro de um <ProfileProvider>.');
  }
  return context;
}

export default useProfile;