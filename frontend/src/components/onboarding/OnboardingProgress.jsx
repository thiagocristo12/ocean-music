function OnboardingProgress({ current, total }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="mb-6">
      <p className="mb-1 text-sm font-medium text-ink-500">
        Passo {current} de {total}
      </p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-ocean-100">
        <div
          className="h-full rounded-full bg-ocean-600 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default OnboardingProgress;