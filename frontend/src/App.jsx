import ErrorBoundary from './components/ErrorBoundary.jsx';
import ConnectionBanner from './components/ConnectionBanner.jsx';
import SoundOffNotice from './components/audio/SoundOffNotice.jsx';
import PreferencesProvider from './context/PreferencesProvider.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import ProfileProvider from './context/ProfileProvider.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <ErrorBoundary>
      <PreferencesProvider>
        <AuthProvider>
          <ProfileProvider>
            <AppRoutes />
          </ProfileProvider>
        </AuthProvider>
        <ConnectionBanner />
        <SoundOffNotice />
      </PreferencesProvider>
    </ErrorBoundary>
  );
}

export default App;