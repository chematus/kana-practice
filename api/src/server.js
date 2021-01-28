import express from 'express';
import mongoose from 'mongoose';
import { transports, createLogger, format } from 'winston';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import Sentry from 'winston-sentry-log';
import config from './store/config';
import applyPassportStrategy from './store/passport';
import userController from './controllers/userController';
import ocrController from './controllers/ocrController';

const {
  env: { port, mongoURI },
  sentry: { dsn, level },
} = config;
const sentryOptions = {
  config: {
    dsn,
  },
  level,
};

const transportsList = [
  new transports.File({ filename: 'logs/error.log', level: 'error' }),
  new transports.File({ filename: 'logs/info.log' }),
];

if (dsn) {
  transportsList.push(new Sentry(sentryOptions));
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'main' },
  transports: transportsList,
});

const app = express();

app.use(cors());
applyPassportStrategy(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userController);
app.use('/ocr', ocrController);

app.listen(port, () => {
  logger.info(`Active at ${port}`);
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      logger.info('Mongo ready');
    });
});
