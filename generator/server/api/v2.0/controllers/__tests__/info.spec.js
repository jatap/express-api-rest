import { getInfo } from '../info';

describe('v1.0 Info Routes with mocks', () => {
  test('info', async () => {
    const mockReq = () => {
      const req = {};

      req.originalUrl = '/api/v1.0';

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

    await getInfo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
