import express from 'express';
import info from './info';
import basic from '../../v1.0/routes/basic';
import health from './health';

const router = express.Router();

router.use(info);
router.use(basic);
router.use(health);

export default router;
