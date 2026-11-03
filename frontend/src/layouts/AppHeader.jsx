import { Link, NavLink } from 'react-router-dom';
import Logo from '../components/brand/Logo.jsx';
import useAuth from '../hooks/useAuth.js';

const navItems = [
  { to: '/dashboard', label: 'Início' },
  { to: '/trilhas', label: 'Trilhas' },
  { to: '/progresso', label: 'Progresso' },
  { to: '/perfil', label: 'Perfil' },
];

const itemBase =
  'inline-flex min-h-[44px] items-center rounded-xl px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500';

function AppHeader() {
  const { logout } = useAuth();

  return (
    <header className="border-b border-ink-100 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2 sm:px-6">
        <Link to="/dashboard">
          <Logo />
        </Link>

        {/* Tablet e desktop: tudo na mesma linha */}
        <nav aria-label="Principal" className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${itemBase} ${isActive ? 'bg-ocean-100 text-ocean-700' : 'text-ink-700 hover:bg-ocean-50'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button type="button" onClick={logout} className={`${itemBase} text-ink-700 hover:bg-ocean-50`}>
            Sair
          </button>
        </nav>

        {/* Celular: só o "Sair" no topo */}
        <button type="button" onClick={logout} className={`${itemBase} text-ink-700 hover:bg-ocean-50 sm:hidden`}>
          Sair
        </button>
      </div>

      {/* Celular: abas de navegação em uma segunda linha */}
      <nav aria-label="Principal (celular)" className="grid grid-cols-4 border-t border-ink-100 sm:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex min-h-[44px] items-center justify-center border-b-2 px-1 text-sm font-medium ${
                isActive ? 'border-ocean-600 text-ocean-700' : 'border-transparent text-ink-500'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default AppHeader;