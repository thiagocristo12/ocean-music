import { Card } from '../ui';

function CurrentGoalCard({ goal }) {
  return (
    <Card>
      <p className="text-sm font-medium text-ocean-600">Seu objetivo atual</p>
      <h3 className="mt-1 text-lg font-semibold text-ink-900">{goal.name}</h3>
      <p className="mt-1 text-sm text-ink-500">
        Suas trilhas recomendadas foram escolhidas pensando nisso.
      </p>
    </Card>
  );
}

export default CurrentGoalCard;