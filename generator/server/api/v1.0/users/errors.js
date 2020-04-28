/* eslint-disable max-classes-per-file */
class InvalidUserError extends Error {
  constructor() {
    super();
    this.message = 'Invalid login credentials';
    this.name = 'InvalidUserError';
  }
}

export default InvalidUserError;
