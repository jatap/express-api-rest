import data from '../index';

describe('main', () => {
  test('prints Hello World!', () => {
    const result = 'Hello World!';

    expect(data).toBe(result);
  });
});
