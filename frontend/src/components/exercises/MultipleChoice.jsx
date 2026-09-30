function MultipleChoice({ exercise, answer, onChange, disabled }) {
  return (
    <div className="space-y-2">
      {exercise.payload.options.map((option) => {
        const selected = answer?.selectedOptionId === option.id;
        return (
          <button
            key={option.id}
            type="button"
            disabled={disabled}
            aria-pressed={selected}
            onClick={() => onChange({ selectedOptionId: option.id })}
            className={`w-full rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${
              selected
                ? 'border-ocean-600 bg-ocean-50 text-ocean-800'
                : 'border-ink-200 bg-white text-ink-700 hover:border-ocean-300 hover:bg-ocean-50'
            }`}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );
}

export default MultipleChoice;