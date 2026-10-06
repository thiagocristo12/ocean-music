import http from 'node:http';
import { env } from './config/env.js';
import { checkDatabaseConnection } from './database/pool.js';
import { createApp } from './app.js';

async function main() {
  console.log('Verificando conexão com o banco de dados...');
  await checkDatabaseConnection();
  console.log('Conexão com o banco OK.');

  const router = createApp();
  const server = http.createServer((req, res) => router.handle(req, res));

  server.listen(env.port, () => {
    console.log(`Ocean Music API rodando em http://localhost:${env.port}`);
  });
}

main().catch((error) => {
  console.error('Falha ao iniciar o servidor:', error.message);
  process.exit(1);
});