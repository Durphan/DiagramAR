'use strict';

import type { CreatedUser } from '../../repositories/interfaces/created-user.interface.ts';

export interface IAuthService {
  register(username: string, password: string): Promise<CreatedUser>;
}
