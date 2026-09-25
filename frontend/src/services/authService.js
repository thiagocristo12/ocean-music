const USERS_KEY = 'ocean:v1:users';
const SESSION_KEY = 'ocean:v1:session';

// Classe de erro própria: permite ao formulário saber QUAL erro aconteceu
// (ex.: e-mail já cadastrado) e mostrar a mensagem no campo certo.
export class AuthError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
  }
}

// Simula o tempo de resposta de uma API de verdade,
// para as telas já lidarem com estados de carregamento desde já.
function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Nunca devolve a senha para quem chamou a função
function toPublicUser(user) {
  const { id, name, email } = user;
  return { id, name, email };
}

// ============================================================
// MOCK: a senha fica guardada em texto puro no localStorage,
// só para prototipar as telas. Isso é aceitável APENAS aqui.
// Na Etapa 13, a senha passa a ser tratada só pelo backend,
// com hash seguro (crypto.scrypt) — o front-end nunca mais
// vê nem guarda a senha depois do envio do formulário.
// ============================================================

export async function register({ name, email, password }) {
  await delay();
  const users = readUsers();
  const emailLower = email.trim().toLowerCase();

  if (users.some((existing) => existing.email === emailLower)) {
    throw new AuthError('EMAIL_TAKEN', 'Esse e-mail já está cadastrado.');
  }

  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: emailLower,
    password,
  };

  writeUsers([...users, user]);
  localStorage.setItem(SESSION_KEY, user.id);
  return toPublicUser(user);
}

export async function login({ email, password }) {
  await delay();
  const users = readUsers();
  const emailLower = email.trim().toLowerCase();
  const user = users.find((existing) => existing.email === emailLower);

  if (!user || user.password !== password) {
    throw new AuthError('INVALID_CREDENTIALS', 'E-mail ou senha incorretos.');
  }

  localStorage.setItem(SESSION_KEY, user.id);
  return toPublicUser(user);
}

export async function logout() {
  await delay(150);
  localStorage.removeItem(SESSION_KEY);
}

export async function getCurrentUser() {
  const id = localStorage.getItem(SESSION_KEY);
  if (!id) return null;

  const users = readUsers();
  const user = users.find((existing) => existing.id === id);
  return user ? toPublicUser(user) : null;
}