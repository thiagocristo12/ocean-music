import { Routes, Route, useParams } from 'react-router-dom';
import Landing from '../pages/Landing.jsx';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import Onboarding from '../pages/Onboarding.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Tracks from '../pages/Tracks.jsx';
import TrackDetail from '../pages/TrackDetail.jsx';
import Exercise from '../pages/Exercise.jsx';
import DesignSystem from '../pages/DesignSystem.jsx';
import NotFound from '../pages/NotFound.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import RequireOnboarding from './RequireOnboarding.jsx';
import RedirectIfAuth from './RedirectIfAuth.jsx';

// A rota de exercício usa o MESMO componente <Exercise> para lições
// diferentes (ex.: ao clicar em "Próxima lição"). Sem uma key baseada no
// id da lição, o React reaproveita a mesma instância do componente e o
// estado interno (fase, exercício atual, acertos) "vaza" de uma lição
// para a outra. Este wrapper força uma instância nova a cada id.
function ExerciseRoute() {
  const { id } = useParams();
  return <Exercise key={id} />;
}

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

      <Route
        path="/dashboard"
        element={
          <RequireOnboarding>
            <Dashboard />
          </RequireOnboarding>
        }
      />
      <Route
        path="/trilhas"
        element={
          <RequireOnboarding>
            <Tracks />
          </RequireOnboarding>
        }
      />
      <Route
        path="/trilhas/:slug"
        element={
          <RequireOnboarding>
            <TrackDetail />
          </RequireOnboarding>
        }
      />
      <Route
        path="/exercicio/:id"
        element={
          <RequireOnboarding>
            <ExerciseRoute />
          </RequireOnboarding>
        }
      />

      <Route path="/dev/ui" element={<DesignSystem />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;