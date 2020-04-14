import request from 'supertest';
import app from '../../../../app';

describe('v2.0 Health Route', () => {
  test('health', async () => {
    const res = await request(app).get('/api/v2.0/health');

    expect(res.status).toBe(200);
    expect(res.body.version).toBe('v2.0');
    expect(res.body.status).toBe('available');
  });
});
