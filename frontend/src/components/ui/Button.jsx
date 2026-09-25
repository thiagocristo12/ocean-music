import { buttonBaseClasses, buttonVariants } from './buttonStyles.js';

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
      className={`${buttonBaseClasses} ${buttonVariants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;