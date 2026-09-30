function ContentBlock({ block }) {
  if (block.type === 'tip') {
    return (
      <div className="rounded-xl bg-ocean-50 p-4 text-ink-700">
        <p>💡 {block.body}</p>
      </div>
    );
  }

  return (
    <div>
      {block.title && <h2 className="text-lg font-semibold text-ink-900">{block.title}</h2>}
      <p className="mt-1 text-ink-700">{block.body}</p>
    </div>
  );
}

export default ContentBlock;