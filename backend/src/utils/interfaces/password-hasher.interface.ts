'use strict';

export interface IPasswordHasherService {
  hash(password: string, rounds: number): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
