import { pool } from '../../database/pool.js';

// GET /api/health — confirma que o servidor está de pé E que o banco
// responde, em uma única checagem rápida.
export async function getHealth() {
  await pool.query('SELECT 1');
  return { status: 'ok', timestamp: new Date().toISOString() };
}