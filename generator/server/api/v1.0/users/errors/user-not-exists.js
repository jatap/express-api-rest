import HttpStatus from 'http-status-codes';

/* eslint-disable max-classes-per-file */
class UserNotExists extends Error {
  constructor() {
    super();
    this.status = HttpStatus.UNAUTHORIZED;
    this.message = 'Invalid login credentials';
    this.name = 'UserNotExists';
  }
}

export default UserNotExists;
