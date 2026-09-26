function getGreeting(hour) {
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function GreetingHeader({ name }) {
  const greeting = getGreeting(new Date().getHours());

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">
        {greeting}, {name}!
      </h1>
      <p className="mt-1 text-ink-500">Veja o que preparamos para você hoje.</p>
    </div>
  );
}

export default GreetingHeader;