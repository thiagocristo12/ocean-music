function WaveDivider({ color = '#EEF6FF', className = 'h-12' }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block w-full ${className}`}
    >
      <path
        d="M0 32c120 24 240 24 360 8s240-32 360-24 240 40 360 32 240-32 360-16v48H0z"
        fill={color}
      />
    </svg>
  );
}

export default WaveDivider;