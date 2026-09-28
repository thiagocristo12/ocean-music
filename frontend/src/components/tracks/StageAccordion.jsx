import { useState } from 'react';
import LessonRow from './LessonRow.jsx';

function StageAccordion({ stage, lessons, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const completedCount = lessons.filter((lesson) => lesson.status === 'completed').length;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500"
      >
        <div>
          <h3 className="font-semibold text-ink-900">{stage.title}</h3>
          <p className="text-sm text-ink-500">
            {completedCount} de {lessons.length} concluídas
          </p>
        </div>
        <span
          aria-hidden="true"
          className={`text-ink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          ⌄
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-ink-100">
          {lessons.map((lesson) => (
            <LessonRow key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
}

export default StageAccordion;