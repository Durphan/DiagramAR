const express = require('express');
const errorHandler = require('./src/middlewares/errorHandler');
const cookieParser = require('cookie-parser');

const usersRoutes = require('./src/routes/users.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/users', usersRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

module.exports = app;
