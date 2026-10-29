'use strict';

import type { ErrorCode } from '../../errors/errorCodes.js';

export interface CreateUserSuccessResponse {
  message: string;
  userId: number;
}

export interface ErrorResponse {
  code: ErrorCode;
  message: string;
  stack?: string;
}

export const USER_CREATED_MESSAGE = 'Usuario creado correctamente';
