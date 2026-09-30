import { Card } from '../ui';
import { levelLabels, experienceLabels, findNames } from '../../utils/profileLabels.js';

function SummaryRow({ label, value, onEdit }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-ink-100 py-3 last:border-0">
      <div>
        <p className="text-sm text-ink-500">{label}</p>
        <p className="font-medium text-ink-900">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-sm font-medium text-ocean-700 hover:underline"
      >
        Editar
      </button>
    </div>
  );
}

function StepSummary({ draft, areas, goals, styles, onEditStep }) {
  const areaNames = findNames(areas, draft.areaSlugs);
  const goalNames = findNames(goals, draft.goalSlugs);
  const styleNames = findNames(styles, draft.styleSlugs);

  return (
    <div>
      <h2 className="text-lg font-semibold text-ink-900">Seu perfil musical está pronto</h2>
      <p className="mt-1 text-sm text-ink-500">
        Você pode editar essas informações a qualquer momento pelo seu perfil.
      </p>

      <Card className="mt-4">
        <SummaryRow label="Nível" value={levelLabels[draft.level]} onEdit={() => onEditStep(1)} />
        <SummaryRow
          label="Experiência anterior"
          value={experienceLabels[draft.priorExperience]}
          onEdit={() => onEditStep(1)}
        />
        <SummaryRow
          label="Áreas de interesse"
          value={areaNames.length > 0 ? areaNames.join(', ') : 'Nenhuma selecionada'}
          onEdit={() => onEditStep(2)}
        />
        <SummaryRow
          label="Objetivos"
          value={goalNames.length > 0 ? goalNames.join(', ') : 'Nenhum selecionado'}
          onEdit={() => onEditStep(3)}
        />
        <SummaryRow
          label="Estilos preferidos"
          value={styleNames.length > 0 ? styleNames.join(', ') : 'Nenhum selecionado'}
          onEdit={() => onEditStep(4)}
        />
      </Card>
    </div>
  );
}

export default StepSummary;