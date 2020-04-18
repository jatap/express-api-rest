import express from 'express';
import { getHealth } from './controller';

const router = express.Router();

/* eslint-disable no-unused-vars */
router.get('/health', (req, res, next) => {
  getHealth(req, res);
});

export default router;
