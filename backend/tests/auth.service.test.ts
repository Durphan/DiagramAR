'use strict';

import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { TestContext } from 'node:test';

import { ConflictError } from '../src/errors/ConflictError.js';
import type { CreatedUser } from '../src/repositories/interfaces/created-user.interface.js';
import type { IUserRepository } from '../src/repositories/interfaces/user.repository.interface.ts';
import type { UserRecord } from '../src/repositories/interfaces/user.record.interface.ts';
import { AuthService as AuthServiceCtor } from '../src/services/auth.service.js';
import type { IAuthService } from '../src/services/interfaces/auth.service.interface.ts';
import type { IPasswordHasherService } from '../src/utils/interfaces/password-hasher.interface.js';

const SENTINEL_USER: CreatedUser = { id: 1, username: 'alice', password: 'sentinel-hash' };

const createStubRepository = (overrides: Partial<IUserRepository> = {}): IUserRepository => ({
  findByUsername: (): Promise<UserRecord | null> => Promise.resolve(null),
  createUser: (): Promise<CreatedUser> => Promise.resolve(SENTINEL_USER),
  ...overrides,
});

const createStubHasher = (
  overrides: Partial<IPasswordHasherService> = {}
): IPasswordHasherService => ({
  hash: (): Promise<string> => Promise.resolve('sentinel-hash'),
  compare: (): Promise<boolean> => Promise.resolve(false),
  ...overrides,
});

const createService = (repository: IUserRepository, hasher: IPasswordHasherService): IAuthService =>
  new AuthServiceCtor(repository, hasher);

void test('Username available', async (test: TestContext) => {
  const username = 'alice';
  const password = 'secret123';
  const sentinelHash = 'sentinel-hash';
  const sentinelUser: CreatedUser = { id: 1, username, password: sentinelHash };

  const repository = createStubRepository();
  const hasher = createStubHasher();
  test.mock.method(repository, 'findByUsername', () => Promise.resolve(null));
  const hashMock = test.mock.method(hasher, 'hash', () => Promise.resolve(sentinelHash));
  const createUserMock = test.mock.method(repository, 'createUser', () =>
    Promise.resolve(sentinelUser)
  );

  const result = await createService(repository, hasher).register(username, password);

  assert.equal(hashMock.mock.callCount(), 1);
  assert.deepEqual([...(hashMock.mock.calls[0]?.arguments ?? [])], [password, 10]);
  assert.equal(createUserMock.mock.callCount(), 1);
  assert.deepEqual([...(createUserMock.mock.calls[0]?.arguments ?? [])], [username, sentinelHash]);
  assert.deepEqual(result, sentinelUser);
});

void test('Username already exists', async (test: TestContext) => {
  const username = 'alice';
  const password = 'secret123';
  const existingUser: UserRecord = { id: 1, username, password: 'hash' };

  const repository = createStubRepository();
  const hasher = createStubHasher();
  test.mock.method(repository, 'findByUsername', () => Promise.resolve(existingUser));
  const hashMock = test.mock.method(hasher, 'hash', () => Promise.resolve('unused'));
  const createUserMock = test.mock.method(repository, 'createUser', () =>
    Promise.resolve(SENTINEL_USER)
  );

  await assert.rejects(
    createService(repository, hasher).register(username, password),
    (err: unknown) => {
      assert.ok(err instanceof ConflictError);
      assert.equal(err.statusCode, 409);
      assert.equal(err.code, 'CONFLICT');
      return true;
    }
  );

  assert.equal(hashMock.mock.callCount(), 0);
  assert.equal(createUserMock.mock.callCount(), 0);
});

void test('Repository failure during the availability check', async (test: TestContext) => {
  const username = 'alice';
  const password = 'secret123';
  const repositoryError = new Error('repository unavailable');

  const repository = createStubRepository();
  const hasher = createStubHasher();
  test.mock.method(repository, 'findByUsername', () => Promise.reject(repositoryError));
  const hashMock = test.mock.method(hasher, 'hash', () => Promise.resolve('unused'));
  const createUserMock = test.mock.method(repository, 'createUser', () =>
    Promise.resolve(SENTINEL_USER)
  );

  await assert.rejects(
    createService(repository, hasher).register(username, password),
    (err: unknown) => {
      assert.strictEqual(err, repositoryError);
      return true;
    }
  );

  assert.equal(hashMock.mock.callCount(), 0);
  assert.equal(createUserMock.mock.callCount(), 0);
});

void test('bcrypt hashing failure', async (test: TestContext) => {
  const username = 'alice';
  const password = 'secret123';
  const hashingError = new Error('hashing failed');

  const repository = createStubRepository();
  const hasher = createStubHasher();
  test.mock.method(repository, 'findByUsername', () => Promise.resolve(null));
  test.mock.method(hasher, 'hash', () => Promise.reject(hashingError));
  const createUserMock = test.mock.method(repository, 'createUser', () =>
    Promise.resolve(SENTINEL_USER)
  );

  await assert.rejects(
    createService(repository, hasher).register(username, password),
    (err: unknown) => {
      assert.strictEqual(err, hashingError);
      return true;
    }
  );

  assert.equal(createUserMock.mock.callCount(), 0);
});
