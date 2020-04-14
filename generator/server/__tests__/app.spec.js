import request from 'supertest';
import Boom from '@hapi/boom';
import app from '../app';

describe('app', () => {
  test('not found', async () => {
    const res = await request(app).get('/invalid-route');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Not Found');
  });

  test('error without status code assigned', async () => {
    /* eslint-disable no-underscore-dangle */
    const router = app._router;

    /* eslint-disable no-unused-vars */
    router.get('/sample', (req, res, next) => {
      const err = Boom.internal();
      err.output.statusCode = undefined;
      err.output.payload.statusCode = undefined;
      next(err);
    });

    const newStack = [];
    const anonymous = [];
    const boundDispatch = [];

    /* eslint-disable no-underscore-dangle, array-callback-return */
    router.stack.map((layer) => {
      if (layer.name !== '<anonymous>' && layer.name !== 'bound dispatch') {
        newStack.push(layer);
      } else if (layer.name === '<anonymous>') {
        anonymous.push(layer);
      } else if (layer.name === 'bound dispatch') {
        boundDispatch.push(layer);
      }
    });

    boundDispatch.map((item) => newStack.push(item));
    anonymous.map((item) => newStack.push(item));

    router.stack = newStack;

    const response = await request(app).get('/sample');

    expect(response.status).toBe(500);
  });
});