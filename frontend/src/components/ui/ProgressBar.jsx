function ProgressBar({ value, label, showValue = true }) {
  // Garante um número inteiro entre 0 e 100
  const percent = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div>
      {(label || showValue) && (
        <div className="mb-1 flex items-center justify-between text-sm text-ink-500">
          <span>{label}</span>
          {showValue && <span className="font-semibold text-ink-700">{percent}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label || 'Progresso'}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-3 w-full overflow-hidden rounded-full bg-ocean-100"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-ocean-500 to-aqua-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;