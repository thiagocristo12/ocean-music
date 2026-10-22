import MultipleChoice from './MultipleChoice.jsx';
import TrueFalse from './TrueFalse.jsx';
import AudioChoice from './AudioChoice.jsx';

export const exerciseRegistry = {
  multiple_choice: {
    Component: MultipleChoice,
    isAnswerComplete: (answer) => Boolean(answer?.selectedOptionId),
  },
  true_false: {
    Component: TrueFalse,
    isAnswerComplete: (answer) => typeof answer?.value === 'boolean',
  },
  audio_choice: {
    Component: AudioChoice,
    isAnswerComplete: (answer) => Boolean(answer?.selectedOptionId),
  },
};