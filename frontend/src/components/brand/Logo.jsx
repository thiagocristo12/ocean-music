import logoImage from '../../assets/logo.png';

function Logo({ variant = 'color', className = '' }) {
  const textColor = variant === 'white' ? 'text-white' : 'text-ocean-700';

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img src={logoImage} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
      <span className={`font-display text-lg font-bold ${textColor}`}>Ocean Music</span>
    </span>
  );
}

export default Logo;