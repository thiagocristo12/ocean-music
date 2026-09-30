import { Link } from 'react-router-dom';
import AppHeader from '../layouts/AppHeader.jsx';
import { Card, buttonBaseClasses, buttonVariants } from '../components/ui';
import useAuth from '../hooks/useAuth.js';
import useProfile from '../hooks/useProfile.js';
import { areas, goals, styles } from '../data/catalog.js';
import { levelLabels, experienceLabels, findNames } from '../utils/profileLabels.js';

function InfoRow({ label, value }) {
  return (
    <div className="border-b border-ink-100 py-3 last:border-0">
      <p className="text-sm text-ink-500">{label}</p>
      <p className="font-medium text-ink-900">{value}</p>
    </div>
  );
}

function Profile() {
  const { user } = useAuth();
  const { profile } = useProfile();

  // RequireOnboarding já garante login + perfil completo antes de chegar
  // aqui, então profile nunca deveria ser nulo nesta tela.
  if (!profile) return null;

  const areaNames = findNames(areas, profile.areaSlugs);
  const goalNames = findNames(goals, profile.goalSlugs);
  const styleNames = findNames(styles, profile.styleSlugs);

  return (
    <div className="min-h-screen bg-ocean-50">
      <AppHeader />

      <main className="mx-auto max-w-lg space-y-6 p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-ink-900">Seu perfil</h1>

        <Card>
          <InfoRow label="Nome" value={user.name} />
          <InfoRow label="E-mail" value={user.email} />
        </Card>

        <Card>
          <InfoRow label="Nível" value={levelLabels[profile.level]} />
          <InfoRow label="Experiência anterior" value={experienceLabels[profile.priorExperience]} />
          <InfoRow
            label="Áreas de interesse"
            value={areaNames.length > 0 ? areaNames.join(', ') : 'Nenhuma selecionada'}
          />
          <InfoRow
            label="Objetivos"
            value={goalNames.length > 0 ? goalNames.join(', ') : 'Nenhum selecionado'}
          />
          <InfoRow
            label="Estilos preferidos"
            value={styleNames.length > 0 ? styleNames.join(', ') : 'Nenhum selecionado'}
          />
        </Card>

        <Link to="/onboarding?edit=1" className={`${buttonBaseClasses} ${buttonVariants.primary} w-full`}>
          Editar perfil
        </Link>
      </main>
    </div>
  );
}

export default Profile;