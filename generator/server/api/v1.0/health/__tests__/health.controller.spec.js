import { getHealth } from '../health.controller';

describe('Health controller with mocks', () => {
  test('health', async () => {
    const mockReq = () => {
      const req = {};

      req.originalUrl = '/api/v1.0/health';

      return req;
    };
    const req = mockReq();

    const mockRes = () => {
      const res = {};

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      return res;
    };
    const res = mockRes();

    await getHealth(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
