import { Link } from 'react-router-dom';

const statusStyles = {
  completed: 'text-success',
  suggested: 'text-ocean-600',
  not_started: 'text-ink-300',
};

const statusIcons = {
  completed: '✓',
  suggested: '▶',
  not_started: '○',
};

const statusLabels = {
  completed: 'Concluída',
  suggested: 'Sugerida',
  not_started: 'Não iniciada',
};

// Nenhuma lição fica trancada: todas são um <Link> clicável,
// independente do status. O status só orienta, nunca bloqueia.
function LessonRow({ lesson }) {
  return (
    <Link
      to={`/exercicio/${lesson.id}`}
      className={`flex items-center justify-between gap-3 border-b border-ink-100 px-4 py-3 text-left last:border-0 hover:bg-ocean-50 ${
        lesson.status === 'suggested' ? 'bg-ocean-50' : ''
      }`}
    >
      <span className="flex items-center gap-3">
        <span aria-hidden="true" className={`text-lg ${statusStyles[lesson.status]}`}>
          {statusIcons[lesson.status]}
        </span>
        <span className="font-medium text-ink-900">{lesson.title}</span>
      </span>
      <span className="text-sm text-ink-500">{statusLabels[lesson.status]}</span>
    </Link>
  );
}

export default LessonRow;