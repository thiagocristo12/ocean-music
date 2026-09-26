import { Card } from '../ui';

const statusMessages = {
  active: 'Você estudou hoje. Continue assim!',
  at_risk: 'Estude hoje para manter sua sequência.',
  none: 'Comece hoje para iniciar sua sequência.',
};

function StreakCard({ streak }) {
  return (
    <Card className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sun-soft text-2xl">
        🔥
      </div>
      <div>
        <p className="text-xl font-bold text-ink-900">
          {streak.current} {streak.current === 1 ? 'dia' : 'dias'} seguidos
        </p>
        <p className="text-sm text-ink-500">{statusMessages[streak.status]}</p>
      </div>
    </Card>
  );
}

export default StreakCard;