function FeedbackPanel({ isCorrect, explanation }) {
  const style = isCorrect ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger';
  const title = isCorrect ? 'Muito bem!' : 'Quase lá.';

  return (
    <div role="status" className={`rounded-xl p-4 ${style}`}>
      <p className="font-semibold">
        {isCorrect ? '✓ ' : '! '}
        {title}
      </p>
      <p className="mt-1 text-sm text-ink-700">{explanation}</p>
    </div>
  );
}

export default FeedbackPanel;