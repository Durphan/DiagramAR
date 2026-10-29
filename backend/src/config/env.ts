'use strict';

import 'dotenv/config';
import { envSchema } from '../schemas/env.schema.js';

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ');
  throw new Error(`Invalid environment: ${details}`);
}

export const env = parsed.data;

export type Env = typeof env;
