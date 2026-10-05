import { Card } from '../ui';

function StreakSummaryCard({ streak }) {
  return (
    <Card className="grid grid-cols-2 gap-4 text-center">
      <div>
        <p className="text-3xl font-bold text-ink-900">{streak.current}</p>
        <p className="text-sm text-ink-500">
          {streak.current === 1 ? 'dia seguido' : 'dias seguidos'}
        </p>
      </div>
      <div>
        <p className="text-3xl font-bold text-ink-900">{streak.longest}</p>
        <p className="text-sm text-ink-500">
          Melhor sequência: {streak.longest} {streak.longest === 1 ? 'dia' : 'dias'}
        </p>
      </div>
    </Card>
  );
}

export default StreakSummaryCard;