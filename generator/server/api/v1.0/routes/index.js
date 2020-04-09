import express from 'express';
import info from './info';
import basic from './basic';

const router = express.Router();

router.use(info);
router.use(basic);

export default router;
