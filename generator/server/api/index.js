import express from 'express';

import v1Router from './v1.0/routes';

const router = express.Router();

router.use('/v1.0', v1Router);

export default router;
