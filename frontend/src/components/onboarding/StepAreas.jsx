function AreaButton({ label, priority, onClick }) {
  const selected = Boolean(priority);

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 ${
        selected
          ? 'border-ocean-600 bg-ocean-50 text-ocean-800'
          : 'border-ink-200 bg-white text-ink-700 hover:border-ocean-300 hover:bg-ocean-50'
      }`}
    >
      {selected && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean-600 text-xs font-semibold text-white">
          {priority}
        </span>
      )}
      <span>{label}</span>
    </button>
  );
}

function StepAreas({ areas, selectedSlugs, onToggle }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-ink-900">O que você quer aprender?</h2>
      <p className="mt-1 text-sm text-ink-500">
        Escolha até 3. A ordem indica o que é mais importante para você.
      </p>
      <div className="mt-4 space-y-2">
        {areas.map((area) => {
          const priority = selectedSlugs.indexOf(area.slug) + 1;
          return (
            <AreaButton
              key={area.slug}
              label={area.name}
              priority={priority > 0 ? priority : null}
              onClick={() => onToggle(area.slug)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StepAreas;