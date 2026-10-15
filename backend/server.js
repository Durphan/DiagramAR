require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./models");
const logger = require("./src/utils/logger");

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await sequelize.sync();
    logger.info("Base de datos conectada");

    app.listen(PORT, () => {
      logger.info(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

iniciarServidor();