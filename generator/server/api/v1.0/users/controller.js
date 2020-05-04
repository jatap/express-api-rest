import HttpStatus from 'http-status-codes';
/* eslint-disable promise/no-callback-in-promise */
import { success, notFound } from '../../../services/response';
import User from './model';
import InvalidLoginCredentials from './errors/invalid-login-credentials';

export const register = ({ bodymen: { body } }, res, next) => {
  try {
    return User.create(body)
      .then(async (user) => {
        const token = await user.generateAuthToken();
        return { user, token };
      })
      .then(success(res, HttpStatus.CREATED))
      .catch(next);
  } catch (error) {
    /* istanbul ignore next */
    return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
  }
};

export const login = async ({ bodymen: { body } }, res) => {
  try {
    const { email, password } = body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    return res.send({ user, token });
  } catch (error) {
    if (error instanceof InvalidLoginCredentials) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
    }

    /* istanbul ignore next */
    return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    return res.send(req.user);
  } catch (error) {
    /* istanbul ignore next */
    return res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (error) {
    /* istanbul ignore next */
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const logoutAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);

    await req.user.save();

    res.send();
  } catch (error) {
    /* istanbul ignore next */
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const updateFull = ({ bodymen: { body }, params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => (user ? Object.assign(user, body).save() : null))
    .then((user) => (user ? user.view(true) : null))
    .then(success(res))
    .catch(next);

export const updatePartial = (req, res, next) => {
  const { body, params } = req;

  User.findById(params.id)
    .then(notFound(res))
    .then((user) => {
      if (user) {
        return Object.assign(user, body).save();
      }

      return null;
    })
    .then((user) => (user ? user.view(true) : null))
    .then(success(res))
    .catch(next);
};
