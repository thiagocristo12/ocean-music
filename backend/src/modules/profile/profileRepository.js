import { pool } from '../../database/pool.js';

export async function findProfileByUserId(userId) {
  const profileResult = await pool.query(
    'SELECT level, prior_experience, onboarding_completed_at FROM profiles WHERE user_id = $1',
    [userId]
  );
  const profile = profileResult.rows[0];
  if (!profile) return null;

  const [areasResult, goalsResult, stylesResult] = await Promise.all([
    pool.query(
      `SELECT a.slug FROM profile_areas pa
       JOIN areas a ON a.id = pa.area_id
       WHERE pa.user_id = $1 ORDER BY pa.priority`,
      [userId]
    ),
    pool.query(
      `SELECT g.slug FROM profile_goals pg
       JOIN goals g ON g.id = pg.goal_id
       WHERE pg.user_id = $1`,
      [userId]
    ),
    pool.query(
      `SELECT s.slug FROM profile_styles ps
       JOIN styles s ON s.id = ps.style_id
       WHERE ps.user_id = $1`,
      [userId]
    ),
  ]);

  return {
    level: profile.level,
    priorExperience: profile.prior_experience,
    areaSlugs: areasResult.rows.map((row) => row.slug),
    goalSlugs: goalsResult.rows.map((row) => row.slug),
    styleSlugs: stylesResult.rows.map((row) => row.slug),
  };
}

// Salva o perfil inteiro de uma vez, dentro de uma transação: ou tudo
// é gravado com sucesso, ou nada é alterado (evita um perfil "pela
// metade" se algo falhar no meio do caminho, ex.: conexão cair).
export async function saveProfile(userId, { level, priorExperience, areaSlugs, goalSlugs, styleSlugs }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `INSERT INTO profiles (user_id, level, prior_experience)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id) DO UPDATE SET level = $2, prior_experience = $3`,
      [userId, level, priorExperience]
    );

    // Edição de perfil (Etapa 10): limpa as escolhas antigas antes de
    // gravar as novas, mais simples do que calcular quais mudaram.
    await client.query('DELETE FROM profile_areas WHERE user_id = $1', [userId]);
    await client.query('DELETE FROM profile_goals WHERE user_id = $1', [userId]);
    await client.query('DELETE FROM profile_styles WHERE user_id = $1', [userId]);

    for (const [index, slug] of areaSlugs.entries()) {
      await client.query(
        `INSERT INTO profile_areas (user_id, area_id, priority)
         SELECT $1, id, $2 FROM areas WHERE slug = $3`,
        [userId, index + 1, slug]
      );
    }
    for (const slug of goalSlugs) {
      await client.query(
        'INSERT INTO profile_goals (user_id, goal_id) SELECT $1, id FROM goals WHERE slug = $2',
        [userId, slug]
      );
    }
    for (const slug of styleSlugs) {
      await client.query(
        'INSERT INTO profile_styles (user_id, style_id) SELECT $1, id FROM styles WHERE slug = $2',
        [userId, slug]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}