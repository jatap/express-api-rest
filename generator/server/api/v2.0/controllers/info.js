const data = {
  version: 'v2.0',
  date: new Date().toString(),
  info: 'Hello v2.0 GET API',
};

/* eslint-disable no-unused-vars */
const getInfo = (req, res, next) => {
  res.send(data);
};

/* eslint-disable import/prefer-default-export */
export { getInfo };
