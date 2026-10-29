'use strict';

import type { DataSource, Repository } from 'typeorm';

import { User } from '../entities/user.ts';
import type { CreatedUser } from './interfaces/created-user.interface.ts';
import type { IUserRepository } from './interfaces/user.repository.interface.ts';
import type { UserRecord } from './interfaces/user.record.interface.ts';

export class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async createUser(username: string, hashedPassword: string): Promise<CreatedUser> {
    const user = this.repository.create({ username, password: hashedPassword });
    const saved = await this.repository.save(user);
    return { id: saved.id, username: saved.username, password: hashedPassword };
  }

  async findByUsername(username: string): Promise<UserRecord | null> {
    const user = await this.repository.findOne({ where: { username } });
    if (!user) {
      return null;
    }
    return { id: user.id, username: user.username, password: user.password };
  }
}
