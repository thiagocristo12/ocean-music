import PlayButton from '../audio/PlayButton.jsx';
import MetronomeControl from '../audio/MetronomeControl.jsx';

function ContentBlock({ block }) {
  if (block.type === 'tip') {
    return (
      <div className="rounded-xl bg-ocean-50 p-4 text-ink-700">
        <p>💡 {block.body}</p>
      </div>
    );
  }

  if (block.type === 'audio_demo') {
    return (
      <div className="space-y-2">
        {block.caption && <p className="text-ink-700">{block.caption}</p>}
        <PlayButton stimulus={block.stimulus} label="Ouvir" />
      </div>
    );
  }

  if (block.type === 'practice') {
    return (
      <div className="space-y-3">
        <p className="text-ink-700">{block.instruction}</p>
        {block.metronomeBpm && <MetronomeControl initialBpm={block.metronomeBpm} />}
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