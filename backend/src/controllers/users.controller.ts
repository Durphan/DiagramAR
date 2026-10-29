'use strict';

import type { Request, Response } from 'express';

import httpStatus from '../constants/httpStatus.js';
import type { CreateUserSuccessResponse } from '../entities/response/response.dto.js';
import { USER_CREATED_MESSAGE } from '../entities/response/response.dto.js';
import type { CreateUserBody } from '../schemas/user.schema.js';
import type { IAuthService } from '../services/interfaces/auth.service.interface.ts';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { IUserController } from './interfaces/user.controller.interface.ts';

const userController = (authService: IAuthService): IUserController => {
  const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password }: CreateUserBody = req.body;

    const user = await authService.register(username, password);
    const body: CreateUserSuccessResponse = {
      message: USER_CREATED_MESSAGE,
      userId: user.id,
    };

    res.status(httpStatus.CREATED).json(body);
  });

  return { registerUser };
};

export { userController };
