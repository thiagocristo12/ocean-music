import AppHeader from '../layouts/AppHeader.jsx';
import { Card } from '../components/ui';
import MetronomeControl from '../components/audio/MetronomeControl.jsx';
import NoteButton from '../components/audio/NoteButton.jsx';
import { GUITAR_STRINGS, REFERENCE_NOTE, C_OCTAVE, formatHz } from '../data/tuning.js';

function Tools() {
  return (
    <div className="min-h-screen bg-ocean-50">
      <AppHeader />

      <main className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Ferramentas</h1>
          <p className="mt-1 text-ink-500">Apoio para o seu estudo, sem precisar abrir uma lição.</p>
        </div>

        <section aria-labelledby="metronomo-titulo" className="space-y-3">
          <h2 id="metronomo-titulo" className="text-lg font-semibold text-ink-900">
            Metrônomo
          </h2>
          <MetronomeControl initialBpm={80} />
          <p className="text-sm text-ink-500">
            Comece devagar e só aumente o andamento quando conseguir tocar sem errar.
          </p>
        </section>

        <section aria-labelledby="afinador-titulo" className="space-y-3">
          <h2 id="afinador-titulo" className="text-lg font-semibold text-ink-900">
            Afinador de referência
          </h2>

          <Card className="space-y-6">
            <p className="text-sm text-ink-500">
              Toque a nota e ajuste o seu instrumento de ouvido, até os dois sons ficarem iguais.
              Este afinador não escuta o seu instrumento: ele toca a nota certa para você comparar.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold text-ink-900">Violão (afinação padrão)</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {GUITAR_STRINGS.map((item) => (
                  <NoteButton
                    key={item.string}
                    note={item.note}
                    label={`${item.string}ª corda · ${item.name}`}
                    detail={`${formatHz(item.note)} Hz`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-ink-900">Nota de referência</h3>
              <NoteButton
                note={REFERENCE_NOTE.note}
                label={`${REFERENCE_NOTE.name} de referência`}
                detail={`${formatHz(REFERENCE_NOTE.note)} Hz · usado para afinar orquestras e instrumentos`}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-ink-900">Oitava de Dó</h3>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {C_OCTAVE.map((item) => (
                  <NoteButton
                    key={item.note}
                    compact
                    duration={1.5}
                    note={item.note}
                    label={item.name}
                    detail={`${formatHz(item.note)} Hz`}
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-ink-500">
              Dica: alto-falantes pequenos, como os do celular, reproduzem mal os sons graves. Para
              ouvir bem as cordas mais graves, use fones de ouvido.
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default Tools;