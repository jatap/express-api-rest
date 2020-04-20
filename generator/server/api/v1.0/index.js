import express from 'express';
import health from './health';
import users from './users';

const router = express.Router();

router.use(health);
router.use(users);

export default router;
