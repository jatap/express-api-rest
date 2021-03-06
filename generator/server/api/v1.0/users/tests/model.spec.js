/* eslint-disable no-return-await */
import User from '../model';

let user;

beforeAll(async () => await dbConnect());

beforeEach(async () => {
  user = await User.create({
    name: 'test',
    password: '1234567',
    email: 'test@test.com',
  });
});

afterEach(async () => await dbClear());

afterAll(async () => await dbClose());

describe('methods', () => {
  describe('view', () => {
    test('returns simple view', () => {
      const view = user.view();
      expect(view).toBeObject();
      expect(view.id).toBe(user.id);
      expect(view.name).toBe(user.name);
      expect(view.password).toBe(user.password);
      expect(view.email).toBe(user.email);
      expect(view.createdAt).toBeTruthy();
      expect(view.updatedAt).toBeTruthy();
    });

    test('returns full view', () => {
      const view = user.view(true);
      expect(view).toBeObject();
      expect(view.id).toBe(user.id);
      expect(view.name).toBe(user.name);
      expect(view.password).toBe(user.password);
      expect(view.email).toBe(user.email);
      expect(view.createdAt).toBeTruthy();
      expect(view.updatedAt).toBeTruthy();
    });
  });

  describe('comparePassword', () => {
    test('positive', async () => {
      const comparePassword = await user.comparePassword('1234567');
      expect(comparePassword).toBeTruthy();
    });

    test('negative', async () => {
      const comparePassword = await user.comparePassword('1234567XXX');
      expect(comparePassword).toBeFalsy();
    });
  });
});

describe('pre save hook to encrypt password', () => {
  test('if password has not changed', async () => {
    user.name = 'test2';
    const updatedUser = await user.save();

    expect(updatedUser.name).toBe('test2');
    expect(user.password).toBe(updatedUser.password);
  });

  test('if password has changed', async () => {
    const updatedUser = { ...user };
    updatedUser.password = '7654321';
    await user.save();

    expect(user.password).not.toEqual(updatedUser.password);
  });
});

describe('statics', () => {
  describe('findByCredentials', () => {
    test('user exists', async () => {
      const userIn = await User.findByCredentials(user.email, '1234567');
      expect(userIn).toBeTruthy();
    });

    test('user does not exists', async () => {
      await expect(
        User.findByCredentials('invalid.user@test.com', '1234567'),
      ).rejects.toThrow(/Invalid login credentials/);
    });

    test('password does not match', async () => {
      await expect(
        User.findByCredentials(user.email, '1234567XX'),
      ).rejects.toThrow(/Invalid login credentials/);
    });
  });
});
