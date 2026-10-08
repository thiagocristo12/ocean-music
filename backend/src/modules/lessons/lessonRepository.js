import { pool } from '../../database/pool.js';

// O id de uma lição, em toda a plataforma, é "<trackSlug>--<lessonSlug>"
// (mesmo formato criado no front-end desde a Etapa 8, em TrackDetail.jsx).
export function parseLessonId(id) {
  const separatorIndex = id.indexOf('--');
  if (separatorIndex === -1) return null;
  return {
    trackSlug: id.slice(0, separatorIndex),
    lessonSlug: id.slice(separatorIndex + 2),
  };
}

export async function findLessonContent(trackSlug, lessonSlug) {
  const lessonResult = await pool.query(
    `SELECT l.id, l.content
     FROM lessons l
     JOIN stages s ON s.id = l.stage_id
     JOIN tracks t ON t.id = s.track_id
     WHERE t.slug = $1 AND l.slug = $2`,
    [trackSlug, lessonSlug]
  );
  const lesson = lessonResult.rows[0];
  if (!lesson) return null;

  const exercisesResult = await pool.query(
    `SELECT key, type, prompt, payload, solution, explanation
     FROM exercises
     WHERE lesson_id = $1
     ORDER BY position`,
    [lesson.id]
  );

  // ⚠️ A `solution` é incluída aqui de propósito — ver decisão D-65.
  // O front-end avalia a resposta no navegador (ExerciseShell.jsx),
  // mesmo comportamento que já existia com os dados mock desde a Etapa 9.
  return {
    content: lesson.content, // já é um array JS (o driver 'pg' decodifica jsonb automaticamente)
    exercises: exercisesResult.rows.map((row) => ({
      key: row.key,
      type: row.type,
      prompt: row.prompt,
      payload: row.payload,
      solution: row.solution,
      explanation: row.explanation,
    })),
  };
}