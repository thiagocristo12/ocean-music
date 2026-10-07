import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

// Formato salvo no banco: "scrypt$<salt em hex>$<hash em hex>"
// O salt é único por senha, então duas pessoas com a mesma senha geram
// hashes diferentes — essencial para dificultar ataques de dicionário.
export async function hashPassword(plainPassword) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await scryptAsync(plainPassword, salt, KEY_LENGTH);
  return `scrypt$${salt}$${derivedKey.toString('hex')}`;
}

export async function verifyPassword(plainPassword, storedHash) {
  const [scheme, salt, hashHex] = storedHash.split('$');
  if (scheme !== 'scrypt' || !salt || !hashHex) return false;

  const derivedKey = await scryptAsync(plainPassword, salt, KEY_LENGTH);
  const storedKey = Buffer.from(hashHex, 'hex');

  // timingSafeEqual evita vazar informação pelo tempo de resposta
  // (comparar strings com === pode responder mais rápido quando os
  // primeiros caracteres já não batem, o que um atacante pode medir).
  if (derivedKey.length !== storedKey.length) return false;
  return timingSafeEqual(derivedKey, storedKey);
}