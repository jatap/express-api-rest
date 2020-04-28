import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from './model';
import InvalidJwtToken from './errors/invalid-jwt-token';
import UserNotExists from './errors/user-not-exists';

const unauthorizedErrorMessage = {
  error: 'Not authorized to access this resource',
};

const hasAuthHeader = (authHeader = '') => {
  if (!authHeader || !authHeader.trim().includes('Bearer ', 0)) {
    return false;
  }

  return true;
};

const auth = async (req, res, next) => {
  if (!hasAuthHeader(req.header('Authorization'))) {
    return res.status(HttpStatus.UNAUTHORIZED).json(unauthorizedErrorMessage);
  }

  const token = req.header('Authorization').replace(/Bearer /i, '');

  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, config.get('auth.salt'));
  } catch (err) {
    return next(new InvalidJwtToken());
  }

  /* eslint-disable no-underscore-dangle */
  const user = await User.findOne({
    _id: jwtPayload._id,
    'tokens.token': token,
  });

  if (!user) {
    return next(new UserNotExists());
  }

  req.user = user;
  req.token = token;

  return next();
};

export default auth;
