'use strict';

import cors from 'cors';
import express from 'express';
import type { Express, Request, Response, Router } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { env } from './src/config/env.js';
import { spec } from './src/docs/swaggerSpec.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { notFound } from './src/middlewares/notFound.js';
import logger from './src/utils/logger.js';

export interface AppDependencies {
  usersRouter: Router;
}

const DEVELOPMENT_ORIGINS = ['http://localhost:5173'];

const resolveAllowedOrigins = (): string[] => {
  if (env.CORS_ORIGINS !== undefined) {
    return env.CORS_ORIGINS;
  }

  return env.NODE_ENV === 'development' ? [...DEVELOPMENT_ORIGINS] : [];
};

const createApp = (deps: AppDependencies): Express => {
  const app = express();

  app.use(
    cors({
      origin: resolveAllowedOrigins(),
      credentials: false,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
    })
  );
  app.use(helmet());
  app.use(express.json());
  app.use(morgan('combined', { stream: logger.stream }));

  app.use('/users', deps.usersRouter);

  /**
   * @swagger
   * /health:
   *   get:
   *     tags:
   *       - Health
   *     summary: Health check
   *     description: Returns the service health status.
   *     responses:
   *       '200':
   *         description: Service is healthy.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               required: [status]
   *               properties:
   *                 status:
   *                   type: string
   *                   enum: [ok]
   *                   example: ok
   *             example:
   *               status: ok
   */
  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  if (env.NODE_ENV === 'development') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
    logger.info(`Swagger UI available at http://localhost:${env.PORT}/api-docs`);
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export { createApp };
