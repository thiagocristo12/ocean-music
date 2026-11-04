import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword } from './password.js';

test('o hash tem o formato scrypt$salt$hash', async () => {
  const hash = await hashPassword('senha1234');
  const parts = hash.split('$');
  assert.equal(parts.length, 3);
  assert.equal(parts[0], 'scrypt');
});

test('senha correta é aceita e senha errada é recusada', async () => {
  const hash = await hashPassword('senha1234');
  assert.equal(await verifyPassword('senha1234', hash), true);
  assert.equal(await verifyPassword('senha4321', hash), false);
});

test('a mesma senha gera hashes diferentes (salt aleatório)', async () => {
  const first = await hashPassword('senha1234');
  const second = await hashPassword('senha1234');
  assert.notEqual(first, second);
});

test('hash em formato inválido é recusado (ex.: placeholder do seed antigo)', async () => {
  assert.equal(await verifyPassword('senha1234', 'PLACEHOLDER_ETAPA_13'), false);
  assert.equal(await verifyPassword('senha1234', 'bcrypt$abc$def'), false);
});