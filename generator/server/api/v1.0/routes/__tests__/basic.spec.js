import request from 'supertest';
import app from '../../../../app';

describe('v1.0 Basic Routes', () => {
  test('error', async () => {
    const res = await request(app).get('/api/v1.0/error');

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
    expect(res.body.message).toBe('An internal server error occurred');
  });
});
