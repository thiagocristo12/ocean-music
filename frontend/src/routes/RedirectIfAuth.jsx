import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useProfile from '../hooks/useProfile.js';

function RedirectIfAuth({ children }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isOnboardingComplete, isLoading: profileLoading } = useProfile();

  if (authLoading || (isAuthenticated && profileLoading)) return null;

  if (isAuthenticated) {
    return <Navigate to={isOnboardingComplete ? '/dashboard' : '/onboarding'} replace />;
  }

  return children;
}

export default RedirectIfAuth;