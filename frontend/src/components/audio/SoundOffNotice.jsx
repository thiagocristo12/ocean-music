import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SOUND_DISABLED_EVENT } from '../../utils/preferences.js';

// Aviso rápido (5 s) quando alguém tenta tocar um som com "Sons ativados"
// desligado. Montado uma vez no App: vale para qualquer botão de áudio, sem
// editar cada um deles (decisão D-115). Mesmo padrão do ConnectionBanner.
function SoundOffNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId;

    function handleSoundDisabled() {
      setVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setVisible(false), 5000);
    }

    window.addEventListener(SOUND_DISABLED_EVENT, handleSoundDisabled);
    return () => {
      window.removeEventListener(SOUND_DISABLED_EVENT, handleSoundDisabled);
      clearTimeout(timeoutId);
    };
  }, []);

  // O contêiner com role="status" fica sempre na página, para o leitor de tela
  // anunciar o texto quando ele aparece.
  return (
    <div role="status" aria-live="polite">
      {visible && (
        <div className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-md items-center justify-between gap-3 rounded-xl bg-ink-900 px-4 py-3 text-sm text-white shadow-lift">
          <span>O som está desativado.</span>
          <Link
            to="/configuracoes"
            onClick={() => setVisible(false)}
            className="inline-flex min-h-[44px] items-center font-semibold text-aqua-300 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-300"
          >
            Ativar nas configurações
          </Link>
        </div>
      )}
    </div>
  );
}

export default SoundOffNotice;