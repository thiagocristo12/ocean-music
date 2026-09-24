import { useId } from 'react';

function Input({ label, error, hint, id, className = '', ...rest }) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const message = error || hint;

  const borderStyle = error
    ? 'border-danger focus:ring-danger/30'
    : 'border-ink-200 focus:border-ocean-500 focus:ring-ocean-500/30';

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-ink-700">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-2.5 text-base text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 ${borderStyle}`}
        {...rest}
      />
      {message && (
        <p id={messageId} className={`mt-1 text-sm ${error ? 'text-danger' : 'text-ink-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Input;