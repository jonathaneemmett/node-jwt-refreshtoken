import { Router } from 'express';
import {
	getAll,
	getById,
	create,
	update,
	remove,
} from '../controllers/productController.js';
import { adminHandler, tokenHandler } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', [tokenHandler, adminHandler], create);
router.put('/:id', [tokenHandler, adminHandler], update);
router.delete('/:id', [tokenHandler, adminHandler], remove);

export default router;
