import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useProfile from '../hooks/useProfile.js';

// Exige login E perfil completo. Vai proteger o Dashboard a partir de agora.
function RequireOnboarding({ children }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isOnboardingComplete, isLoading: profileLoading } = useProfile();

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ocean-50">
        <p className="text-ink-500">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isOnboardingComplete) return <Navigate to="/onboarding" replace />;

  return children;
}

export default RequireOnboarding;