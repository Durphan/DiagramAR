'use strict';

import type { Request, Response } from 'express';

import httpStatus from '../constants/httpStatus.js';
import type { ErrorResponse } from '../entities/response/response.dto.js';

const notFound = (req: Request, res: Response): void => {
  const body: ErrorResponse = {
    code: 'NOT_FOUND',
    message: `No se encontró el recurso solicitado: ${req.originalUrl}`,
  };

  res.status(httpStatus.NOT_FOUND).json(body);
};

export { notFound };
