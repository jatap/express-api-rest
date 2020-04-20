import HttpStatus from 'http-status-codes';

export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || HttpStatus.OK).json(entity);
  }

  return null;
};

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity;
  }

  res.status(HttpStatus.NOT_FOUND).end();

  return null;
};
