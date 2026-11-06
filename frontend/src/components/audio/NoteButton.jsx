import { usePlayNote } from '../../hooks/useAudio.js';
import Waveform from './Waveform.jsx';

// Botão de nota de referência (usado no afinador): toca a nota e mostra o
// estado "tocando". O som dura mais que o de um exercício (2,5 s por padrão),
// para dar tempo de comparar com o instrumento.
// compact = versão vertical e estreita, para grades com várias notas.
function NoteButton({ note, label, detail, compact = false, duration = 2.5 }) {
  const { play, isPlaying } = usePlayNote();

  function handleClick() {
    // Não usamos "disabled": ele tira o foco do botão e atrapalha quem navega
    // pelo teclado (decisão D-112). Só ignoramos o clique enquanto toca.
    if (isPlaying) return;
    play(note, { duration });
  }

  const stateStyle = isPlaying
    ? 'border-ocean-600 bg-ocean-50'
    : 'border-ink-200 bg-white hover:border-ocean-300 hover:bg-ocean-50';

  const layoutStyle = compact
    ? 'flex min-h-[64px] flex-col items-center justify-center px-1 py-2 text-center'
    : 'flex min-h-[56px] items-center justify-between gap-3 px-4 py-2 text-left';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-disabled={isPlaying}
      aria-label={`Tocar ${label}${detail ? `, ${detail}` : ''}`}
      className={`w-full rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 aria-disabled:cursor-wait ${stateStyle} ${layoutStyle}`}
    >
      <span>
        <span className="block font-semibold text-ink-900">{label}</span>
        {detail && (
          <span className={`block text-ink-500 ${compact ? 'text-xs' : 'text-sm'}`}>{detail}</span>
        )}
      </span>

      {compact ? (
        <Waveform active={isPlaying} className="mt-1 text-ocean-600" />
      ) : (
        <span className="flex items-center gap-2 text-ocean-600" aria-hidden="true">
          <Waveform active={isPlaying} />
          <span>{isPlaying ? '🔊' : '▶'}</span>
        </span>
      )}
    </button>
  );
}

export default NoteButton;