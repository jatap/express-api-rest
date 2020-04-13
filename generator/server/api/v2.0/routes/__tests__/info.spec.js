import request from 'supertest';
import app from '../../../../app';

describe('v2.0 Info Routes', () => {
  test('home', async () => {
    const res = await request(app).get('/api/v2.0');

    expect(res.status).toBe(200);
    expect(res.body.version).toBe('v2.0');
    expect(res.body.info).toBe('Hello v2.0 GET API');
  });
});
