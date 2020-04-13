import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import Boom from '@hapi/boom';
import cors from 'cors';
import api from './api';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api', api);

app.use((req, res, next) => {
  /* eslint-disable prefer-const */
  const err = Boom.notFound(`${req.method} ${req.url} Not Found`);
  next(err);
});

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  console.error(err.output.payload);

  res.status(err.output.payload.statusCode || 500);
  res.json(err.output.payload);
});

export default app;
