import { pool } from '../../database/pool.js';

// trackProgress: { [trackSlug]: { completedLessons } }
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

// dailyActivity: lista de strings 'AAAA-MM-DD'
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

// Posição (0-based) da lição dentro da trilha inteira, na ordem etapa → lição.
// Antes ficava em progressService com um import() dinâmico (pendência da 13.4b).
export async function findLessonIndexInTrack(trackDbId, lessonSlug) {
  const result = await pool.query(
    `SELECT l.slug
     FROM lessons l
     JOIN stages s ON s.id = l.stage_id
     WHERE s.track_id = $1
     ORDER BY s.position, l.position`,
    [trackDbId]
  );
  return result.rows.findIndex((row) => row.slug === lessonSlug);
}

// Grava as 3 partes da conclusão numa única transação (D-61/D-68).
export async function completeLesson({ userId, trackDbId, lessonDbId, lessonIndex, scorePercent }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `INSERT INTO user_track_progress (user_id, track_id, completed_lessons)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, track_id)
       DO UPDATE SET completed_lessons = GREATEST(user_track_progress.completed_lessons, $3),
                      updated_at = now()`,
      [userId, trackDbId, lessonIndex + 1]
    );

    await client.query(
      `INSERT INTO user_daily_activity (user_id, activity_date)
      VALUES ($1, (NOW() AT TIME ZONE 'America/Sao_Paulo')::date)
      ON CONFLICT (user_id, activity_date) DO NOTHING`,
      [userId]
    );

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