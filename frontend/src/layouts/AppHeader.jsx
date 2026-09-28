import { Link } from 'react-router-dom';
import Logo from '../components/brand/Logo.jsx';
import { buttonBaseClasses, buttonVariants } from '../components/ui';
import useAuth from '../hooks/useAuth.js';

function AppHeader() {
  const { logout } = useAuth();
  const smallGhost = `${buttonBaseClasses} ${buttonVariants.ghost} px-3 py-2 text-sm`;

  return (
    <header className="border-b border-ink-100 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/dashboard">
          <Logo />
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/trilhas" className={smallGhost}>
            Trilhas
          </Link>
          <button type="button" onClick={logout} className={smallGhost}>
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;