import { Link } from 'react-router-dom';
import { ProgressBar } from '../ui';

function TrackProgressRow({ track, progressPercent }) {
  return (
    <Link to={`/trilhas/${track.slug}`} className="block py-3 hover:opacity-80">
      <ProgressBar value={progressPercent} label={track.title} />
    </Link>
  );
}

export default TrackProgressRow;