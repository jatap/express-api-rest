/* eslint-disable no-return-await */
import Users from '../model';
import {
  connect,
  closeDatabase,
  clearDatabase,
} from '../../../../../tests/db-handler';

let users;

beforeAll(async () => await connect());

beforeEach(async () => {
  users = await Users.create({ name: 'test', email: 'test' });
});

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('view', () => {
  test('returns simple view', () => {
    const view = users.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(users.id);
    expect(view.name).toBe(users.name);
    expect(view.email).toBe(users.email);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  test('returns full view', () => {
    const view = users.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(users.id);
    expect(view.name).toBe(users.name);
    expect(view.email).toBe(users.email);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
