import jwt from 'jsonwebtoken';

import {
  notAuthenticatedError,
  invalidCredentialsError,
} from '../services/errorService.js';

import dotenv from 'dotenv';
dotenv.config();
const SECRET = process.env.SECRET;

const authUserController = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      notAuthenticatedError();
    }

    const token = authorization.split(' ')[1];

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(token, SECRET);
    } catch (err) {
      console.log(err);
      invalidCredentialsError();
    }

    req.user = tokenInfo;

    next();
  } catch (err) {
    next(err);
  }
};

export default authUserController;
