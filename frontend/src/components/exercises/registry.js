import MultipleChoice from './MultipleChoice.jsx';
import TrueFalse from './TrueFalse.jsx';

// Cada tipo de exercício sabe: (1) qual componente desenhar e (2) quando a
// resposta já está completa o suficiente para liberar o botão Verificar.
// Adicionar um novo tipo = criar o componente + uma entrada nova aqui.
export const exerciseRegistry = {
  multiple_choice: {
    Component: MultipleChoice,
    isAnswerComplete: (answer) => Boolean(answer?.selectedOptionId),
  },
  true_false: {
    Component: TrueFalse,
    isAnswerComplete: (answer) => typeof answer?.value === 'boolean',
  },
};