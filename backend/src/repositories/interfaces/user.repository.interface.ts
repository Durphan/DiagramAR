'use strict';

import type { CreatedUser } from './created-user.interface.ts';
import type { UserRecord } from './user.record.interface.ts';

export interface IUserRepository {
  findByUsername(username: string): Promise<UserRecord | null>;
  createUser(username: string, passwordHash: string): Promise<CreatedUser>;
}
