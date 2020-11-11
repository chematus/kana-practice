import express from 'express';
import mongoose from 'mongoose';
import logger from 'winston';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './store/config';
import applyPassportStrategy from './store/passport';
import userController from './controllers/user.controller';

const app = express();

app.use(cors());
applyPassportStrategy(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', userController);

const { port = 8000, mongoURI } = config.env;

app.listen(port, () => {
  logger.info(`Active at ${port}`);
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      logger.info('Mongo ready');
    });
});
