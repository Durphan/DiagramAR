const express = require('express');
const morgan = require('morgan');

const logger = require('./src/utils/logger');
const usersRoutes = require('./src/routes/users.routes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use(morgan('combined', { stream: logger.stream }));

app.use('/users', usersRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

module.exports = app;
