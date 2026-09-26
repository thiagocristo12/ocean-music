const levelOptions = [
  { value: 'beginner', label: 'Estou começando agora' },
  { value: 'intermediate', label: 'Já sei o básico e quero evoluir' },
];

const experienceOptions = [
  { value: 'none', label: 'Nunca tive contato com música' },
  { value: 'some', label: 'Já tive algum contato (aulas soltas, vídeos, tocar de ouvido)' },
  { value: 'regular', label: 'Estudo com regularidade' },
];

function ChoiceButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`w-full rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 ${
        selected
          ? 'border-ocean-600 bg-ocean-50 text-ocean-800'
          : 'border-ink-200 bg-white text-ink-700 hover:border-ocean-300 hover:bg-ocean-50'
      }`}
    >
      {label}
    </button>
  );
}

function StepLevel({ draft, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink-900">Qual é o seu nível?</h2>
        <div className="mt-3 space-y-2">
          {levelOptions.map((option) => (
            <ChoiceButton
              key={option.value}
              label={option.label}
              selected={draft.level === option.value}
              onClick={() => onChange({ level: option.value })}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-ink-900">
          Você já teve alguma experiência com música?
        </h2>
        <div className="mt-3 space-y-2">
          {experienceOptions.map((option) => (
            <ChoiceButton
              key={option.value}
              label={option.label}
              selected={draft.priorExperience === option.value}
              onClick={() => onChange({ priorExperience: option.value })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StepLevel;