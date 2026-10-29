'use strict';

import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { z as Zod } from 'zod';

import { ValidationError } from '../errors/ValidationError.js';
import logger from '../utils/logger.js';

const validateBodyInput = (schema: Zod.ZodType<unknown>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const body: unknown = req.body;
    const result = schema.safeParse(body);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Error de validación';
      logger.error('Error de validación:', message);
      next(new ValidationError(message));
      return;
    }

    next();
  };
};

export { validateBodyInput };
