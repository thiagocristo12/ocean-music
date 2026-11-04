import ErrorBoundary from './components/ErrorBoundary.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import ProfileProvider from './context/ProfileProvider.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProfileProvider>
          <AppRoutes />
        </ProfileProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;