'use strict';

import type { Express } from 'express';

import { createApp } from './app.js';
import { env } from './src/config/env.js';
import { userController } from './src/controllers/users.controller.js';
import AppDataSource from './src/config/data-source.ts';
import { UserRepository } from './src/repositories/user.repository.ts';
import { createUsersRouter } from './src/routes/users.routes.js';
import { AuthService } from './src/services/auth.service.js';
import { BcryptPasswordHasher } from './src/utils/bcrypt-password-hasher.js';
import logger from './src/utils/logger.js';

let app: Express;

try {
  await AppDataSource.initialize();

  const userRepository = new UserRepository(AppDataSource);
  const passwordHasher = new BcryptPasswordHasher();
  const authService = new AuthService(userRepository, passwordHasher);
  const usersController = userController(authService);
  const usersRouter = createUsersRouter(usersController);

  app = createApp({ usersRouter });
} catch (error) {
  logger.error(
    `Error al cargar la configuración: ${error instanceof Error ? error.message : String(error)}`
  );
  process.exit(1);
}

const port = env.PORT;

app.listen(port, () => {
  logger.info(`Servidor escuchando en http://localhost:${port}`);
});
