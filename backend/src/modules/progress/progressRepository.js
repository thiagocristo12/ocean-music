import { pool } from '../../database/pool.js';

// trackProgress: { [trackSlug]: { completedLessons } } — mesmo formato
// que já existe em progressService.getDashboardInputs() no mock.
export async function getTrackProgress(userId) {
  const result = await pool.query(
    `SELECT t.slug, utp.completed_lessons
     FROM user_track_progress utp
     JOIN tracks t ON t.id = utp.track_id
     WHERE utp.user_id = $1`,
    [userId]
  );

  const trackProgress = {};
  for (const row of result.rows) {
    trackProgress[row.slug] = { completedLessons: row.completed_lessons };
  }
  return trackProgress;
}

// dailyActivity: lista de strings 'AAAA-MM-DD' — mesmo formato usado por
// utils/streak.js e utils/activity.js no front-end.
export async function getDailyActivity(userId) {
  const result = await pool.query(
    `SELECT to_char(activity_date, 'YYYY-MM-DD') AS date
     FROM user_daily_activity
     WHERE user_id = $1
     ORDER BY activity_date`,
    [userId]
  );
  return result.rows.map((row) => row.date);
}

export async function findTrackBySlug(trackSlug) {
  const result = await pool.query('SELECT id, total_lessons FROM tracks WHERE slug = $1', [trackSlug]);
  return result.rows[0] ?? null;
}

export async function findLessonId(trackSlug, lessonSlug) {
  const result = await pool.query(
    `SELECT l.id
     FROM lessons l
     JOIN stages s ON s.id = l.stage_id
     JOIN tracks t ON t.id = s.track_id
     WHERE t.slug = $1 AND l.slug = $2`,
    [trackSlug, lessonSlug]
  );
  return result.rows[0]?.id ?? null;
}

// Grava as 3 partes da conclusão de uma lição numa única transação —
// mesmo princípio de profileRepository.saveProfile (D-61): ou tudo é
// gravado, ou nada muda.
export async function completeLesson({ userId, trackDbId, lessonDbId, lessonIndex, scorePercent }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Progresso da trilha: nunca recua (mesma regra do mock, Etapa 9 — D-34).
    await client.query(
      `INSERT INTO user_track_progress (user_id, track_id, completed_lessons)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, track_id)
       DO UPDATE SET completed_lessons = GREATEST(user_track_progress.completed_lessons, $3),
                      updated_at = now()`,
      [userId, trackDbId, lessonIndex + 1]
    );

    // Atividade de hoje (usada para calcular a sequência de estudos).
    await client.query(
      `INSERT INTO user_daily_activity (user_id, activity_date)
       VALUES ($1, CURRENT_DATE)
       ON CONFLICT (user_id, activity_date) DO NOTHING`,
      [userId]
    );

    // Melhor pontuação da lição: também nunca recua.
    await client.query(
      `INSERT INTO user_lesson_scores (user_id, lesson_id, best_score_percent)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, lesson_id)
       DO UPDATE SET best_score_percent = GREATEST(user_lesson_scores.best_score_percent, $3),
                      updated_at = now()`,
      [userId, lessonDbId, scorePercent]
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}