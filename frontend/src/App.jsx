import AuthProvider from './context/AuthProvider.jsx';
import ProfileProvider from './context/ProfileProvider.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <AppRoutes />
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;