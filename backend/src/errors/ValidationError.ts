'use strict';

import type { ErrorCode } from './errorCodes.js';

import { AppError } from './AppError.js';
import httpStatus from '../constants/httpStatus.js';

export class ValidationError extends AppError {
  constructor(message: string, code: ErrorCode = 'VALIDATION_ERROR') {
    super(message, httpStatus.BAD_REQUEST, code);
  }
}
