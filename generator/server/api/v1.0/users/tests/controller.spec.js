import request from 'supertest';
import HttpStatus from 'http-status-codes';
import { apiUri, version } from 'config';
import app from '../../../../app';
import Users from '../model';
import {
  connect,
  closeDatabase,
  clearDatabase,
} from '../../../../../tests/db-handler';

const apiRoot = `${apiUri}/${version}/users`;

let users;

beforeAll(async () => connect());

beforeEach(async () => {
  users = await Users.create({});
});

afterEach(async () => clearDatabase());

afterAll(async () => closeDatabase());

test('POST /users 201', async () => {
  const { status, body } = await request(app)
    .post(`${apiRoot}`)
    .send({ name: 'test', email: 'test' });
  expect(status).toBe(HttpStatus.CREATED);
  expect(typeof body).toEqual('object');
  expect(body.name).toEqual('test');
  expect(body.email).toEqual('test');
});

test('GET /users 200', async () => {
  const { status, body } = await request(app).get(`${apiRoot}`);
  expect(status).toBe(HttpStatus.OK);
  expect(Array.isArray(body)).toBe(true);
});

test('GET /users/:id 200', async () => {
  const { status, body } = await request(app).get(`${apiRoot}/${users.id}`);
  expect(status).toBe(HttpStatus.OK);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(users.id);
});

test('GET /users/:id 404', async () => {
  const { status } = await request(app).get(
    `${apiRoot}/123456789098765432123456`,
  );
  expect(status).toBe(404);
});

test('PUT /users/:id 200', async () => {
  const { status, body } = await request(app)
    .put(`${apiRoot}/${users.id}`)
    .send({ name: 'test', email: 'test' });
  expect(status).toBe(HttpStatus.OK);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(users.id);
  expect(body.name).toEqual('test');
  expect(body.email).toEqual('test');
});

test('PUT /users/:id 404', async () => {
  const { status } = await request(app)
    .put(`${apiRoot}/123456789098765432123456`)
    .send({ name: 'test', email: 'test' });
  expect(status).toBe(HttpStatus.NOT_FOUND);
});

test('PATCH /users/:id 200', async () => {
  const { status, body } = await request(app)
    .patch(`${apiRoot}/${users.id}`)
    .send({ name: 'test' });
  expect(status).toBe(HttpStatus.OK);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(users.id);
  expect(body.name).toEqual('test');
});

test('PATCH /users/:id 404', async () => {
  const { status } = await request(app)
    .patch(`${apiRoot}/123456789098765432123456`)
    .send({ name: 'test', email: 'test' });
  expect(status).toBe(HttpStatus.NOT_FOUND);
});

test('DELETE /users/:id 204', async () => {
  const { status } = await request(app).delete(`${apiRoot}/${users.id}`);
  expect(status).toBe(HttpStatus.NO_CONTENT);
});

test('DELETE /users/:id 404', async () => {
  const { status } = await request(app).delete(
    `${apiRoot}/123456789098765432123456`,
  );
  expect(status).toBe(HttpStatus.NOT_FOUND);
});
