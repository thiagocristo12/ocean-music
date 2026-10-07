import { pool } from '../../database/pool.js';

export async function listAreas() {
  const result = await pool.query('SELECT id, slug, name FROM areas ORDER BY position');
  return result.rows;
}

export async function listStyles() {
  const result = await pool.query('SELECT id, slug, name FROM styles ORDER BY position');
  return result.rows;
}

export async function listGoals() {
  const result = await pool.query(
    `SELECT g.id, g.slug, g.name, a.slug AS area_slug
     FROM goals g
     JOIN areas a ON a.id = g.area_id
     ORDER BY g.position`
  );
  return result.rows;
}