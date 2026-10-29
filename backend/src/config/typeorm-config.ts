'use strict';

import type { DataSourceOptions } from 'typeorm';

import { env, type Env } from './env.js';

export const DEFAULT_DATABASE_FILE = 'data/database.sqlite';

const hasANetworkDatabase = (
  config: Env
): config is Extract<Env, { DATABASE_USER: string; DATABASE_TYPE: string }> =>
  config.DATABASE_TYPE !== 'better-sqlite3' && config.DATABASE_TYPE !== 'sqlite';

const resolveSqliteDatabase = (config: Env): string =>
  config.DATABASE_URL ??
  config.DATABASE_NAME ??
  (config.NODE_ENV === 'test' ? ':memory:' : DEFAULT_DATABASE_FILE);

export const buildTypeOrmConfig = (config: Env = env): DataSourceOptions => {
  const sharedOptions = {
    synchronize: false,
    logging: false,
    entities: ['dist/src/entities/*.js'],
    migrations: ['dist/migrations/*.js'],
  };

  if (!hasANetworkDatabase(config)) {
    return {
      ...sharedOptions,
      type: config.DATABASE_TYPE,
      database: resolveSqliteDatabase(config),
    };
  }

  const connectionOptions: Partial<DataSourceOptions> = config.DATABASE_URL
    ? { url: config.DATABASE_URL }
    : {
        host: config.DATABASE_HOST,
        port: config.DATABASE_PORT,
        username: config.DATABASE_USER,
        password: config.DATABASE_PASSWORD,
        database: config.DATABASE_NAME,
      };

  return {
    ...sharedOptions,
    type: config.DATABASE_TYPE,
    ...connectionOptions,
    ...(config.DATABASE_SSL !== undefined ? { ssl: config.DATABASE_SSL } : {}),
  } as DataSourceOptions;
};
