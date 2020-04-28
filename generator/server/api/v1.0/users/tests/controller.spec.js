import request from 'supertest';
import HttpStatus from 'http-status-codes';
/* eslint-disable-next-line */
import dotenv from 'dotenv/config';
import { apiUri, version } from 'config';
import app from '../../../../app';
import User from '../model';
import {
  connect,
  closeDatabase,
  clearDatabase,
} from '../../../../../tests/db-handler';

const apiRoot = `${apiUri}/${version}/users`;

beforeAll(async () => connect());

afterEach(async () => clearDatabase());

afterAll(async () => closeDatabase());

describe('/users', () => {
  test('POST /register 201', async () => {
    const { status, body } = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test', password: '1234567', email: 'test@test.com' });

    expect(status).toBe(HttpStatus.CREATED);
    expect(body).toBeObject();
    expect(body.user).toBeTruthy();
    expect(body.token).toBeTruthy();
    expect(body).toContainAllKeys(['user', 'token']);
  });

  test('POST /login sucessful', async () => {
    await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test', password: '1234567', email: 'test@test.com' });

    const { body } = await request(app)
      .post(`${apiRoot}/login`)
      .send({ password: '1234567', email: 'test@test.com' });

    expect(body).toBeObject();
    expect(body.user).toBeTruthy();
    expect(body.token).toBeTruthy();
    expect(body).toContainAllKeys(['user', 'token']);
  });

  test('POST /login wrong user', async () => {
    const { status } = await request(app)
      .post(`${apiRoot}/login`)
      .send({ password: '1234567', email: 'test@test.com' });

    expect(status).toBe(HttpStatus.UNAUTHORIZED);
  });

  test('POST /login wrong password', async () => {
    await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test', password: '1234567', email: 'test@test.com' });

    const { status } = await request(app)
      .post(`${apiRoot}/login`)
      .send({ password: '1234567XXX', email: 'test@test.com' });

    expect(status).toBe(HttpStatus.UNAUTHORIZED);
  });

  test('POST /login wrong email', async () => {
    await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test', password: '1234567', email: 'test@test.com' });

    const { status } = await request(app)
      .post(`${apiRoot}/login`)
      .send({ password: '1234567', email: 'testXXX@test.com' });

    expect(status).toBe(HttpStatus.UNAUTHORIZED);
  });

  test('POST /profile/logout', async () => {
    const { body } = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test', password: '1234567', email: 'test@test.com' });
    const { token } = body;

    const logoutResponse = await request(app)
      .post(`${apiRoot}/profile/logout`)
      .set('Authorization', `Bearer ${token}`);

    const userAfter = await User.find({ email: 'test@test.com' });
    expect(logoutResponse.body).toBeObject();
    expect(logoutResponse.body).toBeEmpty();
    expect(userAfter[0].tokens).toBeArrayOfSize(0);
  });

  test('POST /profile/logoutall', async () => {
    const { body } = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test', password: '1234567', email: 'test@test.com' });
    const { token } = body;

    await request(app)
      .post(`${apiRoot}/login`)
      .send({ password: '1234567', email: 'test@test.com' });

    await request(app)
      .post(`${apiRoot}/login`)
      .send({ password: '1234567', email: 'test@test.com' });

    const userBefore = await User.find({ email: 'test@test.com' });
    expect(userBefore[0].tokens).toBeArrayOfSize(3);

    const logoutResponse = await request(app)
      .post(`${apiRoot}/profile/logoutall`)
      .set('Authorization', `Bearer ${token}`);

    const userAfter = await User.find({ email: 'test@test.com' });
    expect(logoutResponse.body).toBeObject();
    expect(userAfter[0].tokens).toBeArrayOfSize(0);
  });

  test('GET /profile sucessful', async () => {
    const { body } = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test', password: '1234567', email: 'test@test.com' });
    const { user, token } = body;

    const response = await request(app)
      .get(`${apiRoot}/profile`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toBeObject();
    expect(response.body.name).toBe(user.name);
    expect(response.body.password).toBe(user.password);
    expect(response.body.tokens).toEqual(user.tokens);
  });

  test('PUT /:id 200', async () => {
    const register = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test', password: '1234567', email: 'test@test.com' });
    const registerUser = register.body.user;
    const registerToken = register.body.token;

    const { status, body } = await request(app)
      .put(`${apiRoot}/${registerUser.id}`)
      .set('Authorization', `Bearer ${registerToken}`)
      .send({ name: 'test2', password: '12345678', email: 'test2@test.com' });

    expect(status).toBe(HttpStatus.OK);
    expect(body).toBeObject();
    expect(body.id).toEqual(registerUser.id);
    expect(body.name).toEqual('test2');
    expect(body.password).toBeTruthy();
    expect(body.email).toEqual('test2@test.com');
  });

  test('PUT /:id 401', async () => {
    const register = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test', password: '1234567', email: 'test@test.com' });
    const registerUser = register.body.user;

    const { status } = await request(app)
      .put(`${apiRoot}/${registerUser.id}`)
      .send({ name: 'test2', password: '12345678', email: 'test2@test.com' });

    expect(status).toBe(HttpStatus.UNAUTHORIZED);
  });

  test('PUT /:id 401 stolen token', async () => {
    const registerOne = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test1', password: '1234567', email: 'test1@test.com' });
    const registerOneBody = registerOne.body.user;

    const registerTwo = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test2', password: '1234567', email: 'test2@test.com' });
    const registerTwoBody = registerTwo.body.user;

    const putOne = await request(app)
      .put(`${apiRoot}/${registerTwoBody.id}`)
      .send({ name: 'test11', password: '12345678', email: 'test11@test.com' });

    const putTwo = await request(app)
      .put(`${apiRoot}/${registerOneBody.id}`)
      .send({ name: 'test22', password: '12345678', email: 'test22@test.com' });

    expect(putOne.status).toBe(HttpStatus.UNAUTHORIZED);
    expect(putTwo.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  test('PUT /:id 404', async () => {
    const register = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test1', password: '1234567', email: 'test1@test.com' });
    const registerToken = register.body.token;

    const { status } = await request(app)
      .put(`${apiRoot}/5ea838342954d882aef921a0`)
      .set('Authorization', `Bearer ${registerToken}`)
      .send({ name: 'test11', password: '12345678', email: 'test11@test.com' });

    expect(status).toBe(HttpStatus.NOT_FOUND);
  });

  test('PATCH /:id 200', async () => {
    const register = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test1', password: '1234567', email: 'test1@test.com' });
    const registerUser = register.body.user;
    const registerToken = register.body.token;

    const { status, body } = await request(app)
      .patch(`${apiRoot}/${registerUser.id}`)
      .set('Authorization', `Bearer ${registerToken}`)
      .send({ name: 'new-test', password: '1234567', email: 'test@test.com' });

    expect(status).toBe(HttpStatus.OK);
    expect(body).toBeObject();
    expect(body.id).toEqual(registerUser.id);
    expect(body.name).toEqual('new-test');
  });

  test('PATCH /:id 401', async () => {
    const register = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test', password: '1234567', email: 'test@test.com' });
    const registerUser = register.body.user;

    const { status } = await request(app)
      .patch(`${apiRoot}/${registerUser.id}`)
      .send({ name: 'test2', password: '12345678', email: 'test2@test.com' });

    expect(status).toBe(HttpStatus.UNAUTHORIZED);
  });

  test('PATCH /:id 401 stolen token', async () => {
    const registerOne = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test1', password: '1234567', email: 'test1@test.com' });
    const registerOneBody = registerOne.body.user;

    const registerTwo = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test2', password: '1234567', email: 'test2@test.com' });
    const registerTwoBody = registerTwo.body.user;

    const patchOne = await request(app)
      .patch(`${apiRoot}/${registerTwoBody.id}`)
      .send({ name: 'test11', password: '12345678', email: 'test11@test.com' });

    const patchTwo = await request(app)
      .patch(`${apiRoot}/${registerOneBody.id}`)
      .send({ name: 'test22', password: '12345678', email: 'test22@test.com' });

    expect(patchOne.status).toBe(HttpStatus.UNAUTHORIZED);
    expect(patchTwo.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  test('PATCH /:id 404', async () => {
    const register = await request(app)
      .post(`${apiRoot}/register`)
      .send({ name: 'test1', password: '1234567', email: 'test1@test.com' });
    const registerToken = register.body.token;

    const { status } = await request(app)
      .patch(`${apiRoot}/5ea838342954d882aef921a0`)
      .set('Authorization', `Bearer ${registerToken}`)
      .send({ name: 'test11', password: '12345678', email: 'test11@test.com' });

    expect(status).toBe(HttpStatus.NOT_FOUND);
  });
});
