'use strict';

import type { RequestHandler } from 'express';

export interface IUserController {
  registerUser: RequestHandler;
}
