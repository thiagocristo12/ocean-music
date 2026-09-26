import { Button, Card } from '../components/ui';
import Logo from '../components/brand/Logo.jsx';
import useAuth from '../hooks/useAuth.js';
import useProfile from '../hooks/useProfile.js';

// ⚠️ TEMPORÁRIO: o painel de verdade (com recomendações, progresso etc.)
// chega na Etapa 7. Por enquanto, só confirma que o perfil foi salvo.
const levelLabels = { beginner: 'Iniciante', intermediate: 'Intermediário' };

function Dashboard() {
  const { user, logout } = useAuth();
  const { profile } = useProfile();

  return (
    <main className="flex min-h-screen items-center justify-center bg-ocean-50 p-4">
      <Card className="w-full max-w-sm text-center">
        <div className="mb-4 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-xl font-bold text-ink-900">Olá, {user?.name}!</h1>
        <p className="mt-2 text-ink-500">
          Perfil salvo: nível {levelLabels[profile?.level]}, {profile?.areaSlugs.length} área(s)
          escolhida(s). O painel completo chega na Etapa 7.
        </p>
        <Button className="mt-6" fullWidth onClick={logout}>
          Sair
        </Button>
      </Card>
    </main>
  );
}

export default Dashboard;