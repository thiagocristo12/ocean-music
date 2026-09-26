import { Link } from 'react-router-dom';
import Logo from '../components/brand/Logo.jsx';
import { buttonBaseClasses, buttonVariants } from '../components/ui';
import useAuth from '../hooks/useAuth.js';

function AppHeader() {
  const { logout } = useAuth();

  return (
    <header className="border-b border-ink-100 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/dashboard">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={logout}
          className={`${buttonBaseClasses} ${buttonVariants.ghost} px-3 py-2 text-sm`}
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default AppHeader;