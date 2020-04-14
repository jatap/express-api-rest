import Boom from '@hapi/boom';

/* eslint-disable prefer-const */
const getError = (req, res, next) => {
  const err = Boom.internal();
  next(err);
};

/* eslint-disable prefer-const, no-unused-vars */
const getForbidden = (req, res, next) => {
  const err = Boom.forbidden();
  next(err);
};

export { getError, getForbidden };
