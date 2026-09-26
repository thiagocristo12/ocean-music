import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing.jsx';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import Onboarding from '../pages/Onboarding.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import DesignSystem from '../pages/DesignSystem.jsx';
import NotFound from '../pages/NotFound.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import RequireOnboarding from './RequireOnboarding.jsx';
import RedirectIfAuth from './RedirectIfAuth.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/cadastro"
        element={
          <RedirectIfAuth>
            <Register />
          </RedirectIfAuth>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectIfAuth>
            <Login />
          </RedirectIfAuth>
        }
      />

      {/* Só exige login: é aqui que o perfil ainda incompleto é preenchido */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        }
      />

      {/* Exige login E perfil completo */}
      <Route
        path="/dashboard"
        element={
          <RequireOnboarding>
            <Dashboard />
          </RequireOnboarding>
        }
      />

      <Route path="/dev/ui" element={<DesignSystem />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;