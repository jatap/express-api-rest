import express from 'express';
import info from './info';
import basic from '../../v1.0/routes/basic';

const router = express.Router();

router.use(info);
router.use(basic);

export default router;
