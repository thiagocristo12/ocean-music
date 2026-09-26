import { Link } from 'react-router-dom';
import { Card, ProgressBar, buttonBaseClasses, buttonVariants } from '../ui';

const levelLabels = { beginner: 'Iniciante', intermediate: 'Intermediário' };

function NextActionCard({ track }) {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-medium text-ocean-600">Comece por aqui</p>
        <h2 className="text-xl font-semibold text-ink-900">{track.title}</h2>
        <p className="text-ink-500">
          {levelLabels[track.level]} · {track.totalLessons} lições
        </p>
      </div>
      <ProgressBar value={0} label="Progresso da trilha" />
      <Link
        to={`/trilhas/${track.slug}`}
        className={`${buttonBaseClasses} ${buttonVariants.primary} w-full`}
      >
        Começar
      </Link>
    </Card>
  );
}

export default NextActionCard;