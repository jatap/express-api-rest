import express from 'express';
import { getError, getForbidden } from '../controllers/basic';

const router = express.Router();

router.get('/error', (req, res, next) => {
  getError(req, res, next);
});

router.get('/forbidden', (req, res, next) => {
  getForbidden(req, res, next);
});

export default router;
