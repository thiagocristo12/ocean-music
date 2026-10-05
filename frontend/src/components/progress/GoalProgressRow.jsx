import { ProgressBar } from '../ui';

function GoalProgressRow({ goal, progressPercent }) {
  return (
    <div className="py-3">
      <ProgressBar value={progressPercent} label={goal.name} />
    </div>
  );
}

export default GoalProgressRow;