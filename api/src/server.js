import express from 'express';
import mongoose from 'mongoose';
import { transports, createLogger, format } from 'winston';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './store/config';
import applyPassportStrategy from './store/passport';
import userController from './controllers/userController';
import ocrController from './controllers/ocrController';

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
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/info.log' }),
  ],
});

const app = express();

app.use(cors());
applyPassportStrategy(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userController);
app.use('/ocr', ocrController);

const { port = 8000, mongoURI } = config.env;

app.listen(port, () => {
  logger.info(`Active at ${port}`);
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      logger.info('Mongo ready');
    });
});
