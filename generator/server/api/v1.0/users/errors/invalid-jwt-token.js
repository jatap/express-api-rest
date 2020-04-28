import HttpStatus from 'http-status-codes';

/* eslint-disable max-classes-per-file */
class InvalidJwtToken extends Error {
  constructor() {
    super();
    this.status = HttpStatus.FORBIDDEN;
    this.message = 'Invalid login credentials';
    this.name = 'InvalidJwtToken';
  }
}

export default InvalidJwtToken;
