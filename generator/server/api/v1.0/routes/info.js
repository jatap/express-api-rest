import express from 'express';

const router = express.Router();

const data = {
  version: '1.0',
  date: new Date().toString(),
  info: 'Hello v1.0 GET API',
};

/* eslint-disable no-unused-vars */
router.get('/', (req, res, next) => {
  res.send(data);
});

export default router;
