// Lê e valida as variáveis de ambiente uma única vez, na inicialização.
// process.env já vem preenchido pelo --env-file=.env (ver package.json).

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT) || 3001,
  databaseUrl: requireEnv('DATABASE_URL'),
};