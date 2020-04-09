/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-extraneous-import */
import merge from 'lodash/merge';

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
  },
  test: {},
  development: {},
  production: {
    port: process.env.PORT || 8080,
  },
};

export default merge(config.all, config[config.all.env]);
