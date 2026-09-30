import { exerciseContent } from '../data/exerciseContent.js';

// ⚠️ conteúdo genérico para lições que ainda não foram escritas à mão.
// Serve para o fluxo funcionar em TODAS as lições da plataforma desde já.
// O texto pedagógico de verdade dessas trilhas será escrito aos poucos,
// fora do escopo desta etapa — isso não exige nenhuma mudança de código.
function buildFallbackContent(lesson, track) {
  return {
    content: [
      {
        type: 'text',
        title: lesson.title,
        body: `Esta lição faz parte da trilha "${track.title}". Em breve, este espaço terá uma explicação completa sobre o assunto.`,
      },
    ],
    exercises: [
      {
        key: 'fallback-1',
        type: 'true_false',
        prompt: `Esta lição pertence à trilha "${track.title}".`,
        payload: {},
        solution: { value: true },
        explanation: `Sim, "${lesson.title}" é uma das lições de "${track.title}".`,
      },
      {
        key: 'fallback-2',
        type: 'multiple_choice',
        prompt: 'O que você deve fazer ao terminar esta lição?',
        payload: {
          options: [
            { id: 'a', text: 'Seguir para a próxima lição' },
            { id: 'b', text: 'Parar de estudar música' },
            { id: 'c', text: 'Desinstalar o Ocean Music' },
          ],
        },
        solution: { correctOptionId: 'a' },
        explanation: 'O ideal é continuar sua trilha de aprendizado.',
      },
    ],
  };
}

export function getLessonContent(lessonId, lesson, track) {
  return exerciseContent[lessonId] ?? buildFallbackContent(lesson, track);
}