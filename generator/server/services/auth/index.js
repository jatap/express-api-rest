import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from 'config';
import Users from '../../api/v1.0/users/model';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, config.get('auth.salt'));
    /* eslint-disable no-underscore-dangle */
    const user = await Users.findOne({ _id: data._id, 'tokens.token': token });

    /* istanbul ignore next */
    if (!user) {
      throw new Error('Invalid user');
    }

    req.user = user;
    req.token = token;

    return next();
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send('Not authorized to access this resource');
  }
};

export default auth;
