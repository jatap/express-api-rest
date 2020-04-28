import request from 'supertest';
import HttpStatus from 'http-status-codes';
import { apiUri, version } from 'config';
import app from '../../../../app';
import {
  connect,
  closeDatabase,
  clearDatabase,
} from '../../../../../tests/db-handler';

const apiRoot = `${apiUri}/${version}/users`;

beforeAll(async () => connect());

afterEach(async () => clearDatabase());

afterAll(async () => closeDatabase());

describe('auth', () => {
  test('unauthorized error', async () => {
    const response = await request(app)
      .get(`${apiRoot}/profile`)
      .set('Authorization', 'Bearer XXX');

    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });
});
