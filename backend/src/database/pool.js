import pg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pg;

// Um "pool" mantém várias conexões abertas com o PostgreSQL e as
// reaproveita entre requisições — mais eficiente do que abrir e fechar
// uma conexão nova a cada consulta.
export const pool = new Pool({ connectionString: env.databaseUrl });

// Testa a conexão uma vez, na inicialização do servidor, para falhar
// rápido e com uma mensagem clara se o banco estiver fora do ar ou as
// credenciais do .env estiverem erradas — em vez de só falhar na
// primeira requisição real, de um jeito confuso para quem for depurar.
export async function checkDatabaseConnection() {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
  } finally {
    client.release();
  }
}