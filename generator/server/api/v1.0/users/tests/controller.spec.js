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

afterEach(async () => clearDatabase());

afterAll(async () => closeDatabase());

test('POST /users 201', async () => {
  const { status, body } = await request(app)
    .post(`${apiRoot}`)
    .send({ name: 'test', password: '1234568', email: 'test@test.com' });

  expect(status).toBe(HttpStatus.CREATED);
  expect(typeof body).toEqual('object');
  expect(body.name).toEqual('test');
  expect(body.password).toBeTruthy();
  expect(body.email).toEqual('test@test.com');
});

test('GET /users 200 without content', async () => {
  const { status, body } = await request(app).get(`${apiRoot}`);

  expect(status).toBe(HttpStatus.OK);
  expect(Array.isArray(body)).toBe(true);
});

test('GET /users 200 with content', async () => {
  users = await Users.create({
    name: 'test',
    password: '1234567',
    email: 'test@test.com',
  });

  const { status, body } = await request(app).get(`${apiRoot}`);

  expect(status).toBe(HttpStatus.OK);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBe(1);
});

test('GET /users/:id 200', async () => {
  users = await Users.create({
    name: 'test',
    password: '1234567',
    email: 'test@test.com',
  });

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
  users = await Users.create({
    name: 'test',
    password: '1234567',
    email: 'test@test.com',
  });

  const { status, body } = await request(app)
    .put(`${apiRoot}/${users.id}`)
    .send({ name: 'test', password: '1234567', email: 'test@test.com' });

  expect(status).toBe(HttpStatus.OK);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(users.id);
  expect(body.name).toEqual('test');
  expect(body.password).toBeTruthy();
  expect(body.email).toEqual('test@test.com');
});

test('PUT /users/:id 404', async () => {
  const { status } = await request(app)
    .put(`${apiRoot}/123456789098765432123456`)
    .send({ name: 'test', password: '1234567', email: 'test@test.com' });
  expect(status).toBe(HttpStatus.NOT_FOUND);
});

test('PATCH /users/:id 200', async () => {
  users = await Users.create({
    name: 'test',
    password: '1234567',
    email: 'test@test.com',
  });

  const { status, body } = await request(app)
    .patch(`${apiRoot}/${users.id}`)
    .send({ name: 'new-test', password: '1234567', email: 'test@test.com' });

  expect(status).toBe(HttpStatus.OK);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(users.id);
  expect(body.name).toEqual('new-test');
});

test('PATCH /users/:id 404', async () => {
  const { status } = await request(app)
    .patch(`${apiRoot}/123456789098765432123456`)
    .send({ name: 'test', email: 'test@test.com' });
  expect(status).toBe(HttpStatus.NOT_FOUND);
});

test('DELETE /users/:id 204', async () => {
  users = await Users.create({
    name: 'test',
    password: '1234567',
    email: 'test@test.com',
  });

  const { status } = await request(app).delete(`${apiRoot}/${users.id}`);
  expect(status).toBe(HttpStatus.NO_CONTENT);
});

test('DELETE /users/:id 404', async () => {
  const { status } = await request(app).delete(
    `${apiRoot}/123456789098765432123456`,
  );
  expect(status).toBe(HttpStatus.NOT_FOUND);
});
