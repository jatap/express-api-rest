import request from 'supertest';
import app from '../../../../app';

describe('v1.0 Health Route', () => {
  test('health', async () => {
    const res = await request(app).get('/api/v1.0/health');

    expect(res.status).toBe(200);
    expect(res.body.version).toBe('v1.0');
    expect(res.body.status).toBe('available');
  });
});
