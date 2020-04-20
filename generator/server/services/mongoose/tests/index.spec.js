import { buildUri } from '..';

describe('mongoose', () => {
  test('buildUri', () => {
    const result =
      'mongodb://undefined:undefined@undefined:undefined/undefined';
    expect(buildUri()).toBe(result);
  });
});
