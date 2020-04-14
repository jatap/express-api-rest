const data = {
  version: 'v2.0',
  date: new Date().toString(),
  info: 'Hello v2.0 GET API',
};

const getInfo = (req, res) => {
  res.status(200).json(data);
};

/* eslint-disable import/prefer-default-export */
export { getInfo };
