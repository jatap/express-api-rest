import HttpStatus from 'http-status-codes';

/* eslint-disable max-classes-per-file */
class InvalidLoginCredentials extends Error {
  constructor() {
    super();
    this.status = HttpStatus.UNAUTHORIZED;
    this.message = 'Invalid login credentials';
    this.name = 'InvalidLoginCredentials';
  }
}

export default InvalidLoginCredentials;
