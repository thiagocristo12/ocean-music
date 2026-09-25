import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

function RedirectIfAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/onboarding" replace />;

  return children;
}

export default RedirectIfAuth;