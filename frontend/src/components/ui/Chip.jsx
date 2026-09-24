function Chip({ children, selected = false, className = '', ...rest }) {
  const style = selected
    ? 'border-ocean-600 bg-ocean-600 text-white'
    : 'border-ink-200 bg-white text-ink-700 hover:border-ocean-300 hover:bg-ocean-50';

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${style} ${className}`}
      {...rest}
    >
      {selected && (
        <span aria-hidden="true" className="mr-1.5">
          ✓
        </span>
      )}
      {children}
    </button>
  );
}

export default Chip;