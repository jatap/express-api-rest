import express from 'express';
import Boom from '@hapi/boom';

const router = express.Router();

/* eslint-disable prefer-const */
router.get('/error', (req, res, next) => {
  const err = Boom.internal();
  next(err);
});

export default router;
