import { useState } from 'react';
import { Card, Button } from '../ui';
import { exerciseRegistry } from './registry.js';
import { evaluateExercise } from '../../utils/exercises.js';
import FeedbackPanel from './FeedbackPanel.jsx';

// Cuida do "entorno" de qualquer exercício: enunciado, botão Verificar,
// painel de feedback e botão Continuar. Quem sabe desenhar a INTERAÇÃO em
// si (múltipla escolha, verdadeiro/falso...) é o componente do registry.
function ExerciseShell({ exercise, index, total, onAnswered }) {
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(null);

  const { Component, isAnswerComplete } = exerciseRegistry[exercise.type] ?? {};

  if (!Component) {
    // Tipo desconhecido: nunca trava a sessão, só pula o exercício.
    return (
      <Card className="space-y-4">
        <p className="text-ink-500">Este exercício ainda não está disponível.</p>
        <Button fullWidth onClick={() => onAnswered({ correct: true, skipped: true })}>
          Pular
        </Button>
      </Card>
    );
  }

  function handleVerify() {
    setResult(evaluateExercise(exercise, answer));
  }

  function handleContinue() {
    onAnswered(result);
  }

  return (
    <Card className="space-y-4">
      <p className="text-sm font-medium text-ink-500">
        Exercício {index + 1} de {total}
      </p>
      <p className="text-lg font-semibold text-ink-900">{exercise.prompt}</p>

      <Component exercise={exercise} answer={answer} onChange={setAnswer} disabled={Boolean(result)} />

      {result && <FeedbackPanel isCorrect={result.correct} explanation={exercise.explanation} />}

      {!result ? (
        <Button fullWidth disabled={!isAnswerComplete(answer)} onClick={handleVerify}>
          Verificar
        </Button>
      ) : (
        <Button fullWidth onClick={handleContinue}>
          Continuar
        </Button>
      )}
    </Card>
  );
}

export default ExerciseShell;