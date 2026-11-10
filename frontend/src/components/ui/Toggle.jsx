// Interruptor liga/desliga acessível: role="switch" + aria-checked, com a área
// de toque de 44 px (decisão D-93). O estado aparece também pela posição da
// bolinha e pelo ✓, e não só pela cor.
function Toggle({ id, label, description, checked, onChange, disabled = false }) {
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p id={labelId} className="font-medium text-ink-900">
          {label}
        </p>
        {description && (
          <p id={descriptionId} className="mt-0.5 text-sm text-ink-500">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className="flex min-h-[44px] min-w-[56px] shrink-0 items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span
          aria-hidden="true"
          className={`flex h-7 w-12 items-center rounded-full transition ${
            checked ? 'bg-ocean-600' : 'bg-ink-200'
          }`}
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-ocean-600 shadow transition-transform ${
              checked ? 'translate-x-6' : 'translate-x-1'
            }`}
          >
            {checked ? '✓' : ''}
          </span>
        </span>
      </button>
    </div>
  );
}

export default Toggle;