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

export const updatePartial = ({ bodymen: { body }, params }, res, next) =>
  Users.findById(params.id)
    .then(notFound(res))
    .then((users) => {
      if (users) {
        Object.keys(body).forEach((key) => {
          if (!body[key]) {
            /* eslint-disable no-param-reassign */
            delete body[key];
          }
        });
        return Object.assign(users, body).save();
      }

      return null;
    })
    .then((users) => (users ? users.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Users.findById(params.id)
    .then(notFound(res))
    .then((users) => (users ? users.remove() : null))
    .then(success(res, HttpStatus.NO_CONTENT))
    .catch(next);
