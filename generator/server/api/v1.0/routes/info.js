import express from 'express';
import { getInfo } from '../controllers/info';

const router = express.Router();

/* eslint-disable no-unused-vars */
router.get('/', (req, res, next) => {
  getInfo(req, res, next);
});

export default router;
