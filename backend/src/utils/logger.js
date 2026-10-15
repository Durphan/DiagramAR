const fs = require('fs');
const path = require('path');
const winston = require('winston');
const timezone = "America/Argentina/Buenos_Aires";
const isProduction = process.env.NODE_ENV === 'production';
const logDir = path.resolve(__dirname, '../../logs');
fs.mkdirSync(logDir, { recursive: true });


const level = process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug');



const devFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss', zone: timezone }),
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    const line = `${timestamp} ${level}: ${message}`;
    return stack ? `${line}\n${stack}` : line;
  })
);

const prodFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss', zone: timezone }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level,
  format: isProduction ? prodFormat : devFormat,
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'app.log') }),
    new winston.transports.Console(),
  ],
});

const stream = {
  write: (message) => {
    logger.info(message.trimEnd());
  },
};

logger.stream = stream;

module.exports = logger;
