'use strict';

import type { z as Zod } from 'zod';
import { z } from 'zod';

const createUserSchema = z.strictObject({
  username: z
    .string({ error: 'El username es obligatorio' })
    .min(3, 'El username debe tener al menos 3 caracteres')
    .max(50, 'El username no puede superar los 50 caracteres'),
  password: z
    .string({ error: 'La contraseña es obligatoria' })
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type CreateUserBody = Zod.infer<typeof createUserSchema>;

export { createUserSchema };
