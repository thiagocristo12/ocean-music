import { Chip } from '../ui';

function StepGoals({ goals, areaSlugs, selectedSlugs, onToggle }) {
  const filtered = goals.filter((goal) => areaSlugs.includes(goal.areaSlug));
  const options = filtered.length > 0 ? filtered : goals;

  return (
    <div>
      <h2 className="text-lg font-semibold text-ink-900">Qual é o seu objetivo?</h2>
      <p className="mt-1 text-sm text-ink-500">
        Escolha até 3. Esse passo é opcional — se preferir, siga em frente sem marcar nada.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((goal) => (
          <Chip
            key={goal.slug}
            selected={selectedSlugs.includes(goal.slug)}
            onClick={() => onToggle(goal.slug)}
          >
            {goal.name}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default StepGoals;