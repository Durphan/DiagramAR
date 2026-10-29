'use strict';

import fs from 'node:fs';
import path from 'node:path';

import type { Logger } from 'winston';
import winston from 'winston';

import { env } from '../config/env.js';

const timezone = 'America/Argentina/Buenos_Aires';
const isProduction = env.NODE_ENV === 'production';
const logDir = path.resolve(import.meta.dirname, '../../logs');
fs.mkdirSync(logDir, { recursive: true });

const level = env.LOG_LEVEL ?? (isProduction ? 'info' : 'debug');

// `zone` is carried over from the previous JavaScript module. logform's
// timestamp format does not declare it, so it is passed through a named
// constant (not a fresh object literal) to keep the runtime call unchanged.
const devTimestamp = { format: 'YYYY-MM-DD HH:mm:ss', zone: timezone };
const prodTimestamp = { format: 'YYYY-MM-DD HH:mm:ss', zone: timezone };

const devFormat = winston.format.combine(
  winston.format.timestamp(devTimestamp),
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.printf((info) => {
    const timestamp = typeof info.timestamp === 'string' ? info.timestamp : '';
    const message = typeof info.message === 'string' ? info.message : String(info.message);
    const stack = typeof info.stack === 'string' ? info.stack : undefined;
    const line = `${timestamp} ${info.level}: ${message}`;
    return stack ? `${line}\n${stack}` : line;
  })
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(prodTimestamp),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const winstonLogger = winston.createLogger({
  level,
  format: isProduction ? prodFormat : devFormat,
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'app.log') }),
    new winston.transports.Console(),
  ],
});

export interface LoggerStream {
  write: (line: string) => void;
}

export type LoggerModule = Omit<Logger, 'stream'> & { stream: LoggerStream };

const stream: LoggerStream = {
  write: (message: string) => {
    winstonLogger.info(message.trimEnd());
  },
};

const logger: LoggerModule = Object.assign(winstonLogger, { stream });

export default logger;
