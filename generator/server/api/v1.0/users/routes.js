import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
  register,
  login,
  profile,
  logout,
  logoutAll,
  updateFull,
  updatePartial,
} from './controller';
import { schema } from './model';
import auth from './auth';

const router = new Router();
const { name, email, password } = schema.tree;

router.post('/register', body({ name, email, password }), register);
router.post('/login', body({ email, password }), login);
router.get('/profile', auth, profile);
router.post('/profile/logout', auth, logout);
router.post('/profile/logoutall', auth, logoutAll);

router.put('/:id', auth, body({ name, email, password }), updateFull);
router.patch('/:id', auth, updatePartial);

export default router;
