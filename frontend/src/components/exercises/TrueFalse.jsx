const options = [
  { value: true, label: 'Verdadeiro' },
  { value: false, label: 'Falso' },
];

function TrueFalse({ answer, onChange, disabled }) {
  return (
    <div className="flex gap-3">
      {options.map((option) => {
        const selected = answer?.value === option.value;
        return (
          <button
            key={String(option.value)}
            type="button"
            disabled={disabled}
            aria-pressed={selected}
            onClick={() => onChange({ value: option.value })}
            className={`flex-1 rounded-xl border px-4 py-3 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${
              selected
                ? 'border-ocean-600 bg-ocean-50 text-ocean-800'
                : 'border-ink-200 bg-white text-ink-700 hover:border-ocean-300 hover:bg-ocean-50'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default TrueFalse;