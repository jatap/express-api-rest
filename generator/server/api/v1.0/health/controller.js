import HttpStatus from 'http-status-codes';

const data = {
  status: 'available',
  version: 'v1.0',
  date: new Date().toString(),
};

const getHealth = (req, res) => {
  req.headers = { ...req.headers, 'cache-control': 'no-cache' };
  res.status(HttpStatus.OK).json(data);
};

/* eslint-disable import/prefer-default-export */
export { getHealth };
