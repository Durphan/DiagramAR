'use strict';

import express from 'express';
import type { Router } from 'express';

import type { IUserController } from '../controllers/interfaces/user.controller.interface.ts';
import { validateBodyInput } from '../middlewares/validateUserInput.js';
import { createUserSchema } from '../schemas/user.schema.js';

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: >
 *       Registers a new user account. Usernames are unique: a duplicate
 *       username fails with 409 Conflict.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 description: Unique username for the new account.
 *                 example: demo_user
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Account password, at least 6 characters.
 *                 example: secreto123
 *           example:
 *             username: demo_user
 *             password: secreto123
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [message, userId]
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado correctamente
 *                 userId:
 *                   type: integer
 *                   example: 1
 *             example:
 *               message: Usuario creado correctamente
 *               userId: 1
 *       '400':
 *         description: >
 *           Validation error. The body always uses the keys `code` and
 *           `message`. The `stack` field appears only when NODE_ENV=development.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [code, message]
 *               properties:
 *                 code:
 *                   type: string
 *                   enum: [VALIDATION_ERROR]
 *                   example: VALIDATION_ERROR
 *                 message:
 *                   type: string
 *                   example: El username es obligatorio
 *                 stack:
 *                   type: string
 *             example:
 *               code: VALIDATION_ERROR
 *               message: El username es obligatorio
 *       '409':
 *         description: Username already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [code, message]
 *               properties:
 *                 code:
 *                   type: string
 *                   enum: [CONFLICT]
 *                   example: CONFLICT
 *                 message:
 *                   type: string
 *                   example: >-
 *                     Validation error: the username "demo_user" is already
 *                     taken. Please choose another one.
 *             example:
 *               code: CONFLICT
 *               message: >-
 *                 Validation error: the username "demo_user" is already
 *                 taken. Please choose another one.
 *       '500':
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [code, message]
 *               properties:
 *                 code:
 *                   type: string
 *                   enum: [INTERNAL_ERROR]
 *                   example: INTERNAL_ERROR
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *             example:
 *               code: INTERNAL_ERROR
 *               message: Internal server error
 */
const createUsersRouter = (controller: IUserController): Router => {
  const router = express.Router();

  router.post('/', validateBodyInput(createUserSchema), controller.registerUser);

  return router;
};

export { createUsersRouter };
