import { Link, NavLink } from 'react-router-dom';
import Logo from '../components/brand/Logo.jsx';
import useAuth from '../hooks/useAuth.js';

// Ordem do menu no tablet e no desktop. No celular, o "Perfil" sobe para a linha
// do topo (ao lado de "Sair") para que as 4 abas caibam em 360 px (decisão D-110).
const navItems = [
  { to: '/dashboard', label: 'Início' },
  { to: '/trilhas', label: 'Trilhas' },
  { to: '/progresso', label: 'Progresso' },
  { to: '/ferramentas', label: 'Ferramentas' },
  { to: '/perfil', label: 'Perfil' },
];

const profileItem = navItems.find((item) => item.to === '/perfil');
const mobileTabs = navItems.filter((item) => item.to !== '/perfil');

const itemBase =
  'inline-flex min-h-[44px] items-center rounded-xl px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500';

function linkStyle({ isActive }) {
  return `${itemBase} ${isActive ? 'bg-ocean-100 text-ocean-700' : 'text-ink-700 hover:bg-ocean-50'}`;
}

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
            <NavLink key={item.to} to={item.to} className={linkStyle}>
              {item.label}
            </NavLink>
          ))}
          <button type="button" onClick={logout} className={`${itemBase} text-ink-700 hover:bg-ocean-50`}>
            Sair
          </button>
        </nav>

        {/* Celular: Perfil e Sair no topo */}
        <div className="flex items-center gap-1 sm:hidden">
          <NavLink to={profileItem.to} className={linkStyle}>
            {profileItem.label}
          </NavLink>
          <button type="button" onClick={logout} className={`${itemBase} text-ink-700 hover:bg-ocean-50`}>
            Sair
          </button>
        </div>
      </div>

      {/* Celular: abas de navegação em uma segunda linha */}
      <nav aria-label="Principal (celular)" className="flex border-t border-ink-100 sm:hidden">
        {mobileTabs.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex min-h-[44px] flex-auto items-center justify-center border-b-2 px-2 text-sm font-medium ${
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