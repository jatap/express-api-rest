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
 * @apiSuccess {String} date Date of the API REST health check.
 * @apiSuccessExample Sucess-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "available"
 *       "version": "v1.0"
 *       "date": "Sun May 03 2020 19:29:15 GMT+0000 (Coordinated Universal Time)"
 *     }
 */
/* eslint-disable no-unused-vars */
router.get('/health', (req, res, next) => {
  getHealth(req, res);
});

export default router;
