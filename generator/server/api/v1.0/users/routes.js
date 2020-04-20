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
const { name, email } = schema.tree;

router.post('/', body({ name, email }), create);

router.get('/', query(), index);

router.get('/:id', show);

router.put('/:id', body({ name, email }), updateFull);

router.patch('/:id', body({ name, email }), updatePartial);

router.delete('/:id', destroy);

export default router;
