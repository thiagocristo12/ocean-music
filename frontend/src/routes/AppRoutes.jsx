import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing.jsx';
import DesignSystem from '../pages/DesignSystem.jsx';
import NotFound from '../pages/NotFound.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Página de apoio para consultar os componentes do design system */}
      <Route path="/dev/ui" element={<DesignSystem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;