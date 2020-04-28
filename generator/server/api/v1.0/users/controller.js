import HttpStatus from 'http-status-codes';
/* eslint-disable promise/no-callback-in-promise */
import { success, notFound } from '../../../services/response';
import Users from './model';
import InvalidUserError from './errors';

export const create = ({ bodymen: { body } }, res, next) => {
  try {
    return Users.create(body)
      .then(async (user) => {
        const token = await user.generateAuthToken();
        return { user, token };
      })
      .then(success(res, HttpStatus.CREATED))
      .catch(next);
  } catch (error) {
    /* istanbul ignore next */
    return res.status(HttpStatus.BAD_REQUEST).send(error.message);
  }
};

export const login = async ({ bodymen: { body } }, res) => {
  try {
    const { email, password } = body;
    const user = await Users.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    return res.send({ user, token });
  } catch (error) {
    if (error instanceof InvalidUserError) {
      return res.status(HttpStatus.UNAUTHORIZED).send(error.message);
    }

    /* istanbul ignore next */
    return res.status(HttpStatus.BAD_REQUEST).send(error.message);
  }
};

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Users.find(query, select, cursor)
    .then((users) => users.map((items) => items.view()))
    .then(success(res))
    .catch(next);

export const profile = async (req, res) => res.send(req.user);

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (error) {
    /* istanbul ignore next */
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const logoutAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);

    await req.user.save();

    res.send();
  } catch (error) {
    /* istanbul ignore next */
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const show = ({ params }, res, next) =>
  Users.findById(params.id)
    .then(notFound(res))
    .then((users) => (users ? users.view() : null))
    .then(success(res))
    .catch(next);

export const updateFull = ({ bodymen: { body }, params }, res, next) =>
  Users.findById(params.id)
    .then(notFound(res))
    .then((users) => (users ? Object.assign(users, body).save() : null))
    .then((users) => (users ? users.view(true) : null))
    .then(success(res))
    .catch(next);

export const updatePartial = (req, res, next) => {
  const { body, params } = req;

  Users.findById(params.id)
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

export const destroy = ({ params }, res, next) =>
  Users.findById(params.id)
    .then(notFound(res))
    .then((users) => (users ? users.remove() : null))
    .then(success(res, HttpStatus.NO_CONTENT))
    .catch(next);
