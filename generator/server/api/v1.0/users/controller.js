import HttpStatus from 'http-status-codes';
/* eslint-disable promise/no-callback-in-promise */
import { success, notFound } from '../../../services/response';
import Users from './model';

export const create = ({ bodymen: { body } }, res, next) =>
  Users.create(body)
    .then((users) => users.view(true))
    .then(success(res, HttpStatus.CREATED))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Users.find(query, select, cursor)
    .then((users) => users.map((items) => items.view()))
    .then(success(res))
    .catch(next);

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
