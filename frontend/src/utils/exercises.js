export function evaluateExercise(exercise, answer) {
  if (exercise.type === 'multiple_choice') {
    return { correct: answer?.selectedOptionId === exercise.solution.correctOptionId };
  }
  if (exercise.type === 'true_false') {
    return { correct: answer?.value === exercise.solution.value };
  }
  return { correct: false };
}