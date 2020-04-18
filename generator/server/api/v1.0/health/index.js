import express from 'express';
import routes from './health.routes';

const router = express.Router();

router.use(routes);

export default router;
