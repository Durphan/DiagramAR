const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const logger = require('./src/utils/logger');
const usersRoutes = require('./src/routes/users.routes');
const errorHandler = require('./src/middlewares/errorHandler');
const spec = require('./src/docs/swaggerSpec');

const app = express();

app.use(express.json());

app.use(morgan('combined', { stream: logger.stream }));

app.use('/users', usersRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check
 *     description: Returns the service health status.
 *     responses:
 *       '200':
 *         description: Service is healthy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [status]
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [ok]
 *                   example: ok
 *             example:
 *               status: ok
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


  app.get('/api-docs', swaggerUi.setup(spec));
  logger.info('Swagger UI available at http://localhost:3000/api-docs');

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

app.use(errorHandler);

module.exports = app;
