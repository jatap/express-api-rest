import HttpStatus from 'http-status-codes';
import * as response from '..';

let res;

beforeEach(() => {
  res = {
    status: jest.fn(() => res),
    json: jest.fn(() => res),
    end: jest.fn(() => res),
  };
});

describe('success', () => {
  it('responds with passed object and status 200', () => {
    expect(response.success(res)({ prop: 'value' })).toBeNull();
    expect(res.status).toBeCalledWith(HttpStatus.OK);
    expect(res.json).toBeCalledWith({ prop: 'value' });
  });

  it('responds with passed object and status 201', () => {
    expect(
      response.success(res, HttpStatus.CREATED)({ prop: 'value' }),
    ).toBeNull();
    expect(res.status).toBeCalledWith(HttpStatus.CREATED);
    expect(res.json).toBeCalledWith({ prop: 'value' });
  });

  it('does not send any response when object has not been passed', () => {
    expect(response.success(res, HttpStatus.CREATED)()).toBeNull();
    expect(res.status).not.toBeCalled();
  });
});

describe('notFound', () => {
  it('responds with status 404 when object has not been passed', () => {
    expect(response.notFound(res)()).toBeNull();
    expect(res.status).toBeCalledWith(HttpStatus.NOT_FOUND);
    expect(res.end).toHaveBeenCalledTimes(1);
  });

  it('returns the passed object and does not send any response', () => {
    expect(response.notFound(res)({ prop: 'value' })).toEqual({
      prop: 'value',
    });
    expect(res.status).not.toBeCalled();
    expect(res.end).not.toBeCalled();
  });
});
