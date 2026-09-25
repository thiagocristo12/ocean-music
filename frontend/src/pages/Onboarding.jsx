import { Button, Card } from '../components/ui';
import Logo from '../components/brand/Logo.jsx';
import useAuth from '../hooks/useAuth.js';

// ⚠️ TEMPORÁRIO: esta página só prova que o login está funcionando.
// A Etapa 6 substitui este conteúdo pelo formulário real de perfil musical.
function Onboarding() {
  const { user, logout } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-ocean-50 p-4">
      <Card className="w-full max-w-sm text-center">
        <div className="mb-4 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-xl font-bold text-ink-900">Olá, {user?.name}!</h1>
        <p className="mt-2 text-ink-500">
          Sua conta foi criada. O onboarding (perfil musical) chega na próxima etapa.
        </p>
        <Button className="mt-6" fullWidth onClick={logout}>
          Sair
        </Button>
      </Card>
    </main>
  );
}

export default Onboarding;