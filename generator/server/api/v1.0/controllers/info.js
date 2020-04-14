const data = {
  version: 'v1.0',
  date: new Date().toString(),
  info: 'Hello v1.0 GET API',
};

const getInfo = (req, res) => {
  res.status(200).json(data);
};

/* eslint-disable import/prefer-default-export */
export { getInfo };
