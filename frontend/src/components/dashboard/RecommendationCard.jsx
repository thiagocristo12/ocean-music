import { Link } from 'react-router-dom';
import { Card, buttonBaseClasses, buttonVariants } from '../ui';

const levelLabels = { beginner: 'Iniciante', intermediate: 'Intermediário' };

function RecommendationCard({ track, reasons }) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ocean-600">
          {levelLabels[track.level]}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-ink-900">{track.title}</h3>
        <ul className="mt-2 space-y-1">
          {reasons.slice(0, 2).map((reason) => (
            <li key={reason.code} className="text-sm text-ink-500">
              · {reason.text}
            </li>
          ))}
        </ul>
      </div>
      <Link
        to={`/trilhas/${track.slug}`}
        className={`${buttonBaseClasses} ${buttonVariants.secondary} mt-4 w-full`}
      >
        Ver trilha
      </Link>
    </Card>
  );
}

export default RecommendationCard;