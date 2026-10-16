const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/users.controllers');
const { validateBodyInput } = require('../middlewares/validateUserInput');
const { registerSchema } = require('../schemas/user.schema');

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
 *               required: [mensaje, usuarioId]
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario creado correctamente
 *                 usuarioId:
 *                   type: integer
 *                   example: 1
 *             example:
 *               mensaje: Usuario creado correctamente
 *               usuarioId: 1
 *       '400':
 *         description: >
 *           Validation error. The body always uses the key `message`. The
 *           `stack` field appears only when NODE_ENV=development. The runtime
 *           also returns a `code` field (VALIDATION_ERROR), noted here as
 *           prose only.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   required: [message, stack]
 *                   properties:
 *                     message: { type: string, example: El username es obligatorio }
 *                     stack: { type: string }
 *                 - type: object
 *                   required: [message]
 *                   properties:
 *                     message: { type: string, example: El username es obligatorio }
 *             examples:
 *               development:
 *                 summary: Response shape when NODE_ENV=development
 *                 value:
 *                   message: El username es obligatorio
 *                   stack: |-
 *                     ValidationError: El username es obligatorio
 *                         at src/middlewares/validateUserInput.js:11:19
 *               production:
 *                 summary: Response shape when NODE_ENV=production or unset
 *                 value:
 *                   message: El username es obligatorio
 *       '409':
 *         description: >
 *           Username already exists. The runtime also returns a `code` field
 *           (CONFLICT), noted here as prose only.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [message]
 *               properties:
 *                 message: { type: string }
 *             example:
 *               message: >-
 *                 Validation Error: El nombre de usuario "demo_user" ya está
 *                 en uso. Por favor, elige otro.
 *       '500':
 *         description: >
 *           Unexpected server error. The runtime also returns a `code` field
 *           (INTERNAL_ERROR), noted here as prose only.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [message]
 *               properties:
 *                 message: { type: string }
 *             example:
 *               message: Internal server error
 */
router.post('/', validateBodyInput(registerSchema), registerUser);

module.exports = router;
