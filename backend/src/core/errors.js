// Erro "esperado" da aplicação: tem um código (para o front-end tratar
// de forma específica), uma mensagem amigável e o status HTTP certo.
// Diferente de um erro de bug (ex.: undefined.algumaCoisa), que não
// deve ser mostrado ao usuário final.
export class AppError extends Error {
  constructor(code, statusCode, message) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}