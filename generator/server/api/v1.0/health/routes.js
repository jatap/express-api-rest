import express from 'express';
import { getHealth } from './controller';

const router = express.Router();

/**
 * @api {get} /health Health Check
 * @apiName HealthCheck
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} status Status of the API REST.
 * @apiSuccess {String} version Version of the API REST.
 * @apiSuccessExample Sucess-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "available"
 *       "version": "v1.0"
 *     }
 */
/* eslint-disable no-unused-vars */
router.get('/health', (req, res, next) => {
  getHealth(req, res);
});

export default router;
