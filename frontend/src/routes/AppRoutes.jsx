import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing.jsx';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import Onboarding from '../pages/Onboarding.jsx';
import DesignSystem from '../pages/DesignSystem.jsx';
import NotFound from '../pages/NotFound.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
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

      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        }
      />

      {/* Página de apoio para consultar os componentes do design system */}
      <Route path="/dev/ui" element={<DesignSystem />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;