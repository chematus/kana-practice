import bcrypt from 'bcrypt';
import { check } from 'express-validator';
import config from './config';
import {
  PASSWORD_EMPTY,
  PASSWORD_LENGTH,
  EMAIL_EMPTY,
  EMAIL_WRONG,
} from './constants';

export const generatePassword = async (pwd) => {
  return bcrypt.hash(pwd, config.env.salt);
};

export const signUpValidation = [
  check('email')
    .exists()
    .withMessage(EMAIL_EMPTY)
    .isEmail()
    .withMessage(EMAIL_WRONG),
  check('password')
    .exists()
    .withMessage(PASSWORD_EMPTY)
    .isLength({ min: 8 })
    .withMessage(PASSWORD_LENGTH),
];

export const signInValidation = [
  check('email')
    .exists()
    .withMessage(EMAIL_EMPTY)
    .isEmail()
    .withMessage(EMAIL_WRONG),
  check('password')
    .exists()
    .withMessage(PASSWORD_EMPTY)
    .isLength({ min: 8 })
    .withMessage(PASSWORD_LENGTH),
];
