import express from 'express';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
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

const userController = express.Router();

const { secret, expiresIn } = config.passport;

userController.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({}, { username: 1, stats: 1 }, (err, result) => {
      return res.status(200).json({ data: result });
    });
  },
);

userController.post(
  '/user',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { email } = jwtDecode(req.headers.authorization);
      const { stats } = req.body;
      if (stats && email) {
        await User.updateOne(
          { email },
          {
            $set: { ...{ stats } },
          },
        );
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
    return res.status(400).json({
      code: 400,
      errors: validationErrors.mapped(),
    });
  }
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    const hashedPassword = await generatePassword(password);
    if (!user) {
      const data = {
        username,
        email,
        hashedPassword,
      };
      await new User(data).save();

      const newUser = await User.findOne({ email });
      const token = jwt.sign({ email }, secret, { expiresIn });
      const result = { ...newUser.toJSON(), ...{ token } };
      delete result.hashedPassword;
      res.status(200).json(result);
    } else {
      res.status(403).json({
        status: 403,
        errMsg: USER_TAKEN,
      });
    }
  } catch (err) {
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
    res.send(403).json({
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
      const result = { ...user.toJSON(), ...{ token } };
      delete result.hashedPassword;
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
