const express = require("express");

const authRoutes = require("./src/routes/auth.routes");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler)

module.exports = app;
