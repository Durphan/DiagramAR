'use strict';

import bcrypt from 'bcryptjs';

import type { IPasswordHasherService } from './interfaces/password-hasher.interface.js';

export class BcryptPasswordHasher implements IPasswordHasherService {
  async hash(password: string, rounds: number): Promise<string> {
    return bcrypt.hash(password, rounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export type BcryptPasswordHasherCtor = new () => BcryptPasswordHasher;
