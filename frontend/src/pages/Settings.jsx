import { useState } from 'react';
import AppHeader from '../layouts/AppHeader.jsx';
import { Button, Card } from '../components/ui';
import Toggle from '../components/ui/Toggle.jsx';
import NoteButton from '../components/audio/NoteButton.jsx';
import usePreferences from '../hooks/usePreferences.js';

function Settings() {
  const { preferences, updatePreference, resetPreferences } = usePreferences();
  const [wasReset, setWasReset] = useState(false);

  function handleChange(key, value) {
    setWasReset(false);
    updatePreference(key, value);
  }

  function handleReset() {
    resetPreferences();
    setWasReset(true);
  }

  return (
    <div className="min-h-screen bg-ocean-50">
      <AppHeader />

      <main className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Configurações</h1>
          <p className="mt-1 text-ink-500">Ajuste o Ocean Music ao seu jeito.</p>
        </div>

        <Card role="group" aria-labelledby="config-aprendizado">
          <h2 id="config-aprendizado" className="text-lg font-semibold text-ink-900">
            Aprendizado
          </h2>
          <Toggle
            id="simplified-mode"
            label="Modo de aprendizado simplificado"
            description="Mostra o conteúdo das lições em partes pequenas, uma de cada vez, com um botão “Entendi” entre elas."
            checked={preferences.simplifiedMode}
            onChange={(value) => handleChange('simplifiedMode', value)}
          />
        </Card>

        <Card role="group" aria-labelledby="config-aparencia">
          <h2 id="config-aparencia" className="text-lg font-semibold text-ink-900">
            Aparência
          </h2>
          <Toggle
            id="reduce-motion"
            label="Reduzir animações"
            description="Diminui os movimentos da tela. Se o seu aparelho já pede menos movimento, o Ocean Music respeita isso automaticamente."
            checked={preferences.reduceMotion}
            onChange={(value) => handleChange('reduceMotion', value)}
          />
        </Card>

        <Card role="group" aria-labelledby="config-som">
          <h2 id="config-som" className="text-lg font-semibold text-ink-900">
            Som
          </h2>
          <Toggle
            id="sound-enabled"
            label="Sons ativados"
            description="Controla o metrônomo, as notas de referência e os exercícios de áudio."
            checked={preferences.soundEnabled}
            onChange={(value) => handleChange('soundEnabled', value)}
          />
          {preferences.soundEnabled && (
            <div className="pt-2">
              <NoteButton note="A4" label="Testar o som" detail="Toca a nota Lá (440 Hz)" duration={1.5} />
            </div>
          )}
        </Card>

        <Card className="space-y-3">
          <p className="text-sm text-ink-500">
            Estas preferências ficam salvas só neste navegador. Em outro computador ou celular, você
            precisa ajustá-las de novo.
          </p>
          <Button variant="secondary" onClick={handleReset}>
            Restaurar padrões
          </Button>
          <p role="status" className="text-sm font-medium text-success">
            {wasReset ? 'Preferências restauradas.' : ''}
          </p>
        </Card>
      </main>
    </div>
  );
}

export default Settings;