import { buildUri } from '..';

describe('mongoose', () => {
  test('buildUri', () => {
    expect(buildUri()).toStartWith('mongodb://');
    expect(buildUri()).toIncludeMultiple([':', '@']);
  });
});
