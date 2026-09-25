function Logo({ variant = 'color', className = '' }) {
  const textColor = variant === 'white' ? 'text-white' : 'text-ocean-700';
  const waveColor = variant === 'white' ? '#FFFFFF' : '#1D5AE8';
  const noteColor = variant === 'white' ? '#7DE3F2' : '#22C7E0';

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M3 18c2-4 4-4 6 0s4 4 6 0 4-4 6 0"
          stroke={waveColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="21" cy="8" r="3" fill={noteColor} />
        <path d="M21 8V3.5" stroke={noteColor} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className={`font-display text-lg font-bold ${textColor}`}>Ocean Music</span>
    </span>
  );
}

export default Logo;