function Waveform({ active = false, className = '' }) {
  const bars = [0, 1, 2, 3];

  return (
    <span className={`inline-flex items-end gap-0.5 h-4 ${className}`} aria-hidden="true">
      {bars.map((bar) => (
        <span
          key={bar}
          className={`w-0.5 rounded-full bg-current ${active ? 'animate-bounce' : ''}`}
          style={{ height: '10px', animationDelay: active ? `${bar * 0.1}s` : undefined, opacity: active ? 1 : 0.3 }}
        />
      ))}
    </span>
  );
}

export default Waveform;