import { useState } from 'react';
import { Card, Button } from '../ui';
import ContentBlock from './ContentBlock.jsx';
import usePreferences from '../../hooks/usePreferences.js';

// Fase de conteúdo da lição. No modo normal, mostra todos os blocos de uma vez.
// No modo simplificado (Configurações), mostra UM bloco por vez, com "Entendi"
// entre eles: o conteúdo é dividido em partes menores (decisão D-116).
function LessonIntro({ blocks, onFinish }) {
  const { preferences } = usePreferences();
  const [step, setStep] = useState(0);

  if (!preferences.simplifiedMode || blocks.length === 0) {
    return (
      <Card className="space-y-4">
        {blocks.map((block, index) => (
          <ContentBlock key={index} block={block} />
        ))}
        <Button fullWidth onClick={onFinish}>
          Começar exercícios
        </Button>
      </Card>
    );
  }

  const isLastStep = step === blocks.length - 1;

  return (
    <Card className="space-y-4">
      <div aria-live="polite" className="space-y-3">
        <p className="text-sm font-medium text-ink-500">
          Parte {step + 1} de {blocks.length}
        </p>
        <ContentBlock block={blocks[step]} />
      </div>

      <div className="flex gap-3">
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            Voltar
          </Button>
        )}
        <Button className="flex-1" onClick={() => (isLastStep ? onFinish() : setStep(step + 1))}>
          {isLastStep ? 'Começar exercícios' : 'Entendi'}
        </Button>
      </div>
    </Card>
  );
}

export default LessonIntro;