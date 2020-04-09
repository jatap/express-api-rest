import express from 'express';

import v1Router from './v1.0/routes';
import v2Router from './v2.0/routes';

const router = express.Router();

router.use('/v1.0', v1Router);
router.use('/v2.0', v2Router);

export default router;
