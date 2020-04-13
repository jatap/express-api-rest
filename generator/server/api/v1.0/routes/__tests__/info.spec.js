import request from 'supertest';
import app from '../../../../app';

describe('v1.0 Info Routes', () => {
  test('home', async () => {
    const res = await request(app).get('/api/v1.0');

    expect(res.status).toBe(200);
    expect(res.body.version).toBe('v1.0');
    expect(res.body.info).toBe('Hello v1.0 GET API');
  });
});
