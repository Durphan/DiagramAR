const express = require("express");

const usersRoutes = require("./src/routes/users.routes");

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler)

module.exports = app;
