'use strict';

import type { ErrorCode } from './errorCodes.js';

export abstract class AppError extends Error {
  statusCode: number;
  code: ErrorCode;
  isOperational: boolean;

  constructor(message: string, statusCode = 500, code: ErrorCode = 'INTERNAL_ERROR') {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
