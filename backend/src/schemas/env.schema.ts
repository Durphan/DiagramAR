import { z } from 'zod';

const SQLITE_DATABASE_TYPES = ['better-sqlite3', 'sqlite'] as const;

const NETWORK_DATABASE_TYPES = [
  'postgres',
  'cockroachdb',
  'mysql',
  'mariadb',
  'mssql',
  'oracle',
] as const;

const baseEnvSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).optional(),
  DATABASE_URL: z.preprocess(
    (value) => (typeof value === 'string' ? value.trim() : value),
    z.string().min(1, { message: 'Must not be empty' }).optional()
  ),
  DATABASE_SSL: z
    .string()
    .nonempty({ message: 'DATABASE_SSL must not be empty' })
    .transform((value) => value.trim().toLowerCase())
    .pipe(
      z.enum(['true', 'false', '1', '0', 'yes', 'no'], {
        message: 'Must be true, false, 1, 0, yes, or no',
      })
    )
    .transform((value) => value === 'true' || value === '1' || value === 'yes')
    .optional(),
  CORS_ORIGINS: z
    .string()
    .optional()
    .transform((value) =>
      value === undefined
        ? undefined
        : value
            .split(',')
            .map((origin) => origin.trim())
            .filter((origin) => origin !== '')
    )
    .pipe(z.array(z.url()).optional()),
});

const sqliteEnvSchema = baseEnvSchema.extend({
  DATABASE_TYPE: z.enum(SQLITE_DATABASE_TYPES).default('better-sqlite3'),
  DATABASE_NAME: z.string().nonempty({ message: 'DATABASE_NAME must not be empty' }).optional(),
});

const networkEnvSchema = baseEnvSchema.extend({
  DATABASE_TYPE: z.enum(NETWORK_DATABASE_TYPES),
  DATABASE_HOST: z
    .string({ message: 'DATABASE_HOST is required for network databases' })
    .nonempty({ message: 'DATABASE_HOST must not be empty' })
    .min(1, { message: 'Must not be empty' }),
  DATABASE_PORT: z.coerce
    .number({ message: 'DATABASE_PORT is required for network databases' })
    .int({ message: 'Must be an integer' })
    .min(1, { message: 'Must be greater than or equal to 1' })
    .max(65535, { message: 'Must be less than or equal to 65535' }),
  DATABASE_USER: z
    .string({ message: 'DATABASE_USER is required for network databases' })
    .nonempty({ message: 'DATABASE_USER must not be empty' })
    .min(1, { message: 'Must not be empty' }),
  DATABASE_PASSWORD: z
    .string({ message: 'DATABASE_PASSWORD is required for network databases' })
    .nonempty({ message: 'DATABASE_PASSWORD must not be empty' })
    .min(1, { message: 'Must not be empty' }),
  DATABASE_NAME: z
    .string({ message: 'DATABASE_NAME is required for network databases' })
    .nonempty({ message: 'DATABASE_NAME must not be empty' })
    .min(1, { message: 'Must not be empty' }),
});

export const envSchema = z.discriminatedUnion('DATABASE_TYPE', [sqliteEnvSchema, networkEnvSchema]);
