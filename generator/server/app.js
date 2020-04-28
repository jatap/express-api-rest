import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import compression from 'compression';
import HttpStatus from 'http-status-codes';
import config from 'config';
import { errorHandler as queryErrorHandler } from 'querymen';
import { errorHandler as bodyErrorHandler } from 'bodymen';
import mongoose, { buildUri } from './services/mongoose';
import api from './api';

const app = express();

/* istanbul ignore next */
if (config.util.getEnv('NODE_ENV') !== 'test') {
  if (buildUri) {
    mongoose.connect(buildUri(), config.mongo.options);
  }
  mongoose.Promise = Promise;
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(queryErrorHandler());
app.use(bodyErrorHandler());

app.use('/api', api);

app.use((req, res, next) => {
  /* eslint-disable prefer-const */
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = HttpStatus.NOT_FOUND;
  next(err);
});

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  /* istanbul ignore next */
  if (config.util.getEnv('NODE_ENV') !== 'test') {
    console.error(`*** Error: "${err.message}" ***`);
  }

  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
  res.json({ error: err.message });
});

export default app;
