import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import {
  create,
  index,
  show,
  updateFull,
  updatePartial,
  destroy,
  login,
  profile,
  logout,
  logoutAll,
} from './controller';
import { schema } from './model';
import auth from './auth';

const router = new Router();
const { name, email, password } = schema.tree;

router.post('/', body({ name, email, password }), create);
router.post('/login', body({ email, password }), login);

router.get('/', query(), index);

router.get('/profile', auth, profile);
router.post('/profile/logout', auth, logout);
router.post('/profile/logoutall', auth, logoutAll);

router.get('/:id', show);

router.put('/:id', body({ name, email, password }), updateFull);

router.patch('/:id', updatePartial);

router.delete('/:id', destroy);

export default router;
