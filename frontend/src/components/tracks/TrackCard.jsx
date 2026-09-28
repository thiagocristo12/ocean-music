import { Link } from 'react-router-dom';
import { Card, ProgressBar } from '../ui';

const levelLabels = { beginner: 'Iniciante', intermediate: 'Intermediário' };

function TrackCard({ track, progressPercent }) {
  return (
    <Link to={`/trilhas/${track.slug}`} className="block">
      <Card className="h-full space-y-3 transition hover:shadow-lift">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ocean-600">
            {levelLabels[track.level]}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-ink-900">{track.title}</h3>
          <p className="text-sm text-ink-500">{track.totalLessons} lições</p>
        </div>
        <ProgressBar value={progressPercent} showValue={false} />
      </Card>
    </Link>
  );
}

export default TrackCard;