'use strict';

import type { NextFunction, Request, Response } from 'express';

import { env } from '../config/env.js';
import type { ErrorResponse } from '../entities/response/response.dto.js';
import { AppError } from '../errors/AppError.js';
import logger from '../utils/logger.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction): void => {
  logger.error(err);

  const isOperationalError = err instanceof AppError;
  const statusCode = isOperationalError ? err.statusCode : 500;
  const message = isOperationalError ? err.message : 'Internal server error';

  const body: ErrorResponse = {
    code: isOperationalError ? err.code : 'INTERNAL_ERROR',
    message,
  };

  if (env.NODE_ENV === 'development' && err instanceof Error && err.stack) {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
};

export { errorHandler };
