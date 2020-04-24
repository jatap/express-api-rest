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
} from './controller';
import { schema } from './model';

const router = new Router();
const { name, email, password } = schema.tree;

router.post('/', body({ name, email, password }), create);

router.get('/', query(), index);

router.get('/:id', show);

router.put('/:id', body({ name, email, password }), updateFull);

router.patch('/:id', updatePartial);

router.delete('/:id', destroy);

export default router;
