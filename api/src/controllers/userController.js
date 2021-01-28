import express from 'express';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { transports, createLogger, format } from 'winston';
import passport from 'passport';
import { validationResult } from 'express-validator';
import config from '../store/config';
import {
  generatePassword,
  signUpValidation,
  signInValidation,
} from '../store/utils';
import {
  ERROR_UNKNOWN,
  USER_TAKEN,
  PASSWORD_WRONG,
  USER_WRONG,
} from '../store/constants';
import User from '../models/User';

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
  defaultMeta: { service: 'user' },
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({ filename: 'logs/info.log' }),
  ],
});

const userController = express.Router();

const { secret, expiresIn } = config.passport;

userController.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { email } = jwtDecode(req.headers.authorization);
      const token = jwt.sign({ email }, secret, { expiresIn });
      await User.findOne(
        { email },
        { email: 1, username: 1, stats: 1 },
        (err, result) => {
          if (err) {
            logger.error(err);
          }
          logger.info(`${email} auto log in`);
          return res.status(200).json({ ...result.toJSON(), token });
        },
      );
    } catch (err) {
      logger.error(err);
      return res.status(500).json({
        code: 500,
        errMsg: ERROR_UNKNOWN,
        err,
      });
    }
  },
);

userController.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { email } = jwtDecode(req.headers.authorization);
      const stats = req.body;
      const newStats = {};
      Object.keys(stats).forEach((key) => {
        newStats[`stats.${key}`] = stats[key];
      });
      if (stats && email) {
        await User.updateOne(
          { email },
          {
            $set: newStats,
          },
        );
        logger.info(`${email} updated stats`);
        return res.status(200).json({
          code: 200,
          status: 'OK',
        });
      }
      return res.status(403).json({
        code: 403,
        errMsg: 'Wrong import data',
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({
        code: 500,
        errMsg: ERROR_UNKNOWN,
        err,
      });
    }
  },
);

userController.post('/signup', signUpValidation, async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = validationErrors.mapped();
    logger.error(err);
    return res.status(400).json({
      code: 400,
      errors: err,
    });
  }
  try {
    const { username, email, password, stats } = req.body;
    const user = await User.findOne({ email });
    const hashedPassword = await generatePassword(password);
    if (!user) {
      const data = {
        username,
        email,
        hashedPassword,
        stats,
      };
      logger.info(`${username} : ${email} registered`);
      await new User(data).save();

      const newUser = await User.findOne({ email });
      const token = jwt.sign({ email }, secret, { expiresIn });
      const result = { ...newUser.toJSON(), token };
      delete result.hashedPassword;
      res.status(200).json(result);
    } else {
      res.status(403).json({
        status: 403,
        errMsg: USER_TAKEN,
      });
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      code: 500,
      errMsg: ERROR_UNKNOWN,
      err,
    });
  }
  return false;
});

userController.post('/signin', signInValidation, async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.status(403).json({
      code: 403,
      errors: validationErrors.mapped(),
    });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.email) {
    const isPasswordValid = await user.verifyPassword(password);
    if (isPasswordValid) {
      const token = jwt.sign({ email }, secret, { expiresIn });
      const result = { ...user.toJSON(), token };
      delete result.hashedPassword;
      logger.info(`${user.email} logged in`);
      res.status(200).json(result);
    } else {
      res.status(403).json({
        code: 403,
        errMsg: PASSWORD_WRONG,
      });
    }
  } else {
    res.status(404).json({
      code: 404,
      errMsg: USER_WRONG,
    });
  }
});

export default userController;
