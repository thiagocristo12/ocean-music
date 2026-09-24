const variants = {
  primary: 'bg-ocean-600 text-white hover:bg-ocean-700 active:bg-ocean-800',
  secondary: 'border border-ocean-200 bg-white text-ocean-700 hover:bg-ocean-50',
  ghost: 'text-ocean-700 hover:bg-ocean-100',
};

function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;