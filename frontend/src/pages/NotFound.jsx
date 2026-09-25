import { Link } from 'react-router-dom';
import { buttonBaseClasses, buttonVariants } from '../components/ui';

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ocean-50 p-6 text-center">
      <h1 className="text-3xl font-bold text-ink-900">Página não encontrada</h1>
      <p className="text-ink-500">O endereço que você tentou acessar ainda não existe.</p>
      <Link to="/" className={`${buttonBaseClasses} ${buttonVariants.primary}`}>
        Voltar para o início
      </Link>
    </main>
  );
}

export default NotFound;