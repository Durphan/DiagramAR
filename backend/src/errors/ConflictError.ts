'use strict';

import type { ErrorCode } from './errorCodes.js';

import { AppError } from './AppError.js';
import httpStatus from '../constants/httpStatus.js';

export class ConflictError extends AppError {
  constructor(message: string, code: ErrorCode = 'CONFLICT') {
    super(message, httpStatus.CONFLICT, code);
  }
}
