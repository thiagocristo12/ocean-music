// trackProgress: o mesmo formato que já vem de progressService.getDashboardInputs()
// desde a Etapa 7 — um mapa { [trackSlug]: { completedLessons } }.

export function getCompletedLessons(trackProgress, trackSlug) {
  return trackProgress[trackSlug]?.completedLessons ?? 0;
}

export function getProgressPercent(track, trackProgress) {
  const completed = getCompletedLessons(trackProgress, track.slug);
  return Math.round((completed / track.totalLessons) * 100);
}

// Percorre as etapas de uma trilha em ordem e devolve a etapa, a lição e a
// posição (0-based) da lição cujo slug bate com o informado.
export function findLessonInTrack(content, lessonSlug) {
  let index = 0;
  for (const stage of content.stages) {
    for (const lesson of stage.lessons) {
      if (lesson.slug === lessonSlug) {
        return { stage, lesson, index };
      }
      index += 1;
    }
  }
  return null;
}

// Devolve a etapa e a lição que vêm logo depois da posição informada,
// ou null se a lição atual for a última da trilha.
export function getNextLesson(content, currentIndex) {
  let index = 0;
  for (const stage of content.stages) {
    for (const lesson of stage.lessons) {
      if (index === currentIndex + 1) return { stage, lesson };
      index += 1;
    }
  }
  return null;
}