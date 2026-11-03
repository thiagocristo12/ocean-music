import { usePlayNote } from '../../hooks/useAudio.js';
import Waveform from './Waveform.jsx';

// `stimulus` segue o mesmo formato usado nos exercícios audio_choice e nos
// blocos de conteúdo audio_demo:
// { kind: 'note', note: 'A4' } ou { kind: 'chord', notes: ['E4','G#4','B4'] }
function PlayButton({ stimulus, label = 'Ouvir', className = '' }) {
  const { play, isPlaying } = usePlayNote();

  function handleClick() {
    if (stimulus.kind === 'chord') {
      play(stimulus.notes, { duration: 1.2 });
    } else {
      play(stimulus.note, { duration: 1 });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPlaying}
      aria-label={label}
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-ocean-200 bg-white px-4 py-2 text-sm font-medium text-ocean-700 transition hover:bg-ocean-50 disabled:cursor-wait disabled:opacity-70 ${className}`}
    >
      <span aria-hidden="true">{isPlaying ? '🔊' : '▶'}</span>
      {label}
      <Waveform active={isPlaying} />
    </button>
  );
}

export default PlayButton;