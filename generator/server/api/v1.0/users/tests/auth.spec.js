import request from 'supertest';
import HttpStatus from 'http-status-codes';
/* eslint-disable no-unused-vars */
import dotenv from 'dotenv/config';
import { apiUri, version } from 'config';
import app from '../../../../app';

const apiRoot = `${apiUri}/${version}/users`;

beforeAll(async () => dbConnect());

afterEach(async () => dbClear());

afterAll(async () => dbClose());

describe('auth', () => {
  test('invalid authorization request header (unauthorized error)', async () => {
    const response = await request(app).get(`${apiRoot}/profile`);

    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  test('invalid jwt token (forbidden error)', async () => {
    const response = await request(app)
      .get(`${apiRoot}/profile`)
      .set('Authorization', 'Bearer XXX');

    expect(response.status).toBe(HttpStatus.FORBIDDEN);
  });

  test('user not exists (unauthorized error)', async () => {
    const register = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test1', password: '1234567', email: 'test1@test.com' });
    const registerToken = register.body.token;
    const registerUserId = register.body.user.id;

    await request(app)
      .post(`${apiRoot}/profile/logout`)
      .set('Authorization', `Bearer ${registerToken}`);

    const { status } = await request(app)
      .patch(`${apiRoot}/${registerUserId}`)
      .set('Authorization', `Bearer ${registerToken}`);

    expect(status).toBe(HttpStatus.UNAUTHORIZED);
  });
});
