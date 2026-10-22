import { useState } from 'react';
import { useMetronome } from '../../hooks/useAudio.js';
import { Button } from '../ui';

function MetronomeControl({ initialBpm = 80 }) {
  const [bpm, setBpm] = useState(initialBpm);
  const { isRunning, activeBeat, start, stop } = useMetronome();

  function handleToggle() {
    if (isRunning) stop();
    else start(bpm);
  }

  function adjustBpm(amount) {
    setBpm((current) => {
      const next = Math.min(200, Math.max(40, current + amount));
      if (isRunning) start(next); // reinicia já no novo andamento
      return next;
    });
  }

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-500">Metrônomo</p>
          <p className="text-2xl font-bold text-ink-900">{bpm} BPM</p>
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3].map((beat) => (
            <span
              key={beat}
              aria-hidden="true"
              className={`h-3 w-3 rounded-full transition-colors ${
                isRunning && activeBeat === beat ? 'bg-ocean-600' : 'bg-ocean-100'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => adjustBpm(-5)}
          aria-label="Diminuir andamento"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 text-lg font-semibold text-ink-700 hover:bg-ocean-50"
        >
          −
        </button>
        <Button onClick={handleToggle} className="flex-1">
          {isRunning ? 'Parar' : 'Começar'}
        </Button>
        <button
          type="button"
          onClick={() => adjustBpm(5)}
          aria-label="Aumentar andamento"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 text-lg font-semibold text-ink-700 hover:bg-ocean-50"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default MetronomeControl;