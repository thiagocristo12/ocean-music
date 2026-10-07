import { pool } from '../../database/pool.js';

export async function findUserByEmail(email) {
  const result = await pool.query(
    'SELECT id, name, email, password_hash FROM users WHERE lower(email) = lower($1)',
    [email]
  );
  return result.rows[0] ?? null;
}

export async function findUserById(userId) {
  const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [userId]);
  return result.rows[0] ?? null;
}

export async function insertUser({ name, email, passwordHash }) {
  const result = await pool.query(
    'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, passwordHash]
  );
  return result.rows[0];
}

export async function insertSession({ userId, expiresAt }) {
  const result = await pool.query(
    'INSERT INTO sessions (user_id, expires_at) VALUES ($1, $2) RETURNING id',
    [userId, expiresAt]
  );
  return result.rows[0].id;
}

// Devolve o usuário dono de uma sessão válida (ainda não expirada).
export async function findUserBySessionId(sessionId) {
  const result = await pool.query(
    `SELECT u.id, u.name, u.email
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.id = $1 AND s.expires_at > now()`,
    [sessionId]
  );
  return result.rows[0] ?? null;
}

export async function deleteSession(sessionId) {
  await pool.query('DELETE FROM sessions WHERE id = $1', [sessionId]);
}