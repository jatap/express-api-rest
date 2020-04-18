import express from 'express';
import basic from './basic';
import health from './health';

const router = express.Router();

router.use(basic);
router.use(health);

export default router;
