const { test } = require('node:test');
const assert = require('node:assert/strict');

const { register } = require('../src/services/auth.service');
const userRepository = require('../src/repositories/user.repository');
const bcrypt = require('bcryptjs');
const ConflictError = require('../src/errors/ConflictError');

test('Username available', async (test) => {
  const username = 'alice';
  const password = 'secret123';
  const sentinelHash = 'sentinel-hash';
  const sentinelUser = { id: 1, username, password: sentinelHash };

  test.mock.method(userRepository, 'findByUsername', async () => null);
  const hashMock = test.mock.method(bcrypt, 'hash', async () => sentinelHash);
  const createUserMock = test.mock.method(userRepository, 'createUser', async () => sentinelUser);

  const result = await register(username, password);

  assert.equal(hashMock.mock.callCount(), 1);
  assert.deepEqual([...hashMock.mock.calls[0].arguments], [password, 10]);
  assert.equal(createUserMock.mock.callCount(), 1);
  assert.deepEqual([...createUserMock.mock.calls[0].arguments], [username, sentinelHash]);
  assert.deepEqual(result, sentinelUser);
});

test('Username already exists', async (test) => {
  const username = 'alice';
  const password = 'secret123';
  const existingUser = { id: 1, username };

  test.mock.method(userRepository, 'findByUsername', async () => existingUser);
  const hashMock = test.mock.method(bcrypt, 'hash', async () => 'unused');
  const createUserMock = test.mock.method(userRepository, 'createUser', async () => ({}));

  await assert.rejects(register(username, password), (err) => {
    assert.ok(err instanceof ConflictError);
    assert.equal(err.statusCode, 409);
    assert.equal(err.code, 'CONFLICT');
    return true;
  });

  assert.equal(hashMock.mock.callCount(), 0);
  assert.equal(createUserMock.mock.callCount(), 0);
});

test('Repository failure during the availability check', async (test) => {
  const username = 'alice';
  const password = 'secret123';
  const repositoryError = new Error('repository unavailable');

  test.mock.method(userRepository, 'findByUsername', async () => {
    throw repositoryError;
  });
  const hashMock = test.mock.method(bcrypt, 'hash', async () => 'unused');
  const createUserMock = test.mock.method(userRepository, 'createUser', async () => ({}));

  await assert.rejects(register(username, password), (err) => {
    assert.strictEqual(err, repositoryError);
    return true;
  });

  assert.equal(hashMock.mock.callCount(), 0);
  assert.equal(createUserMock.mock.callCount(), 0);
});

test('bcrypt hashing failure', async (test) => {
  const username = 'alice';
  const password = 'secret123';
  const hashingError = new Error('hashing failed');

  test.mock.method(userRepository, 'findByUsername', async () => null);
  test.mock.method(bcrypt, 'hash', async () => {
    throw hashingError;
  });
  const createUserMock = test.mock.method(userRepository, 'createUser', async () => ({}));

  await assert.rejects(register(username, password), (err) => {
    assert.strictEqual(err, hashingError);
    return true;
  });

  assert.equal(createUserMock.mock.callCount(), 0);
});
