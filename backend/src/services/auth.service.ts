'use strict';

import { ConflictError } from '../errors/ConflictError.js';
import type { CreatedUser } from '../repositories/interfaces/created-user.interface.js';
import type { IUserRepository } from '../repositories/interfaces/user.repository.interface.ts';
import type { IAuthService } from './interfaces/auth.service.interface.ts';
import type { IPasswordHasherService } from '../utils/interfaces/password-hasher.interface.js';

export class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository;
  private readonly hasher: IPasswordHasherService;

  constructor(userRepository: IUserRepository, hasher: IPasswordHasherService) {
    this.userRepository = userRepository;
    this.hasher = hasher;
  }

  async register(username: string, password: string): Promise<CreatedUser> {
    await this.ensureUsernameIsAvailable(username);
    const passwordHash = await this.hasher.hash(password, 10);

    return this.userRepository.createUser(username, passwordHash);
  }

  private async ensureUsernameIsAvailable(username: string): Promise<void> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      throw new ConflictError(
        `Validation error: the username "${username}" is already taken. Please choose another one.`
      );
    }
  }
}
