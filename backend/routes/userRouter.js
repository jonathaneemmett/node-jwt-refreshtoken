import { Router } from 'express';
import { tokenHandler, adminHandler } from '../middleware/authMiddleware.js';

import {
	register,
	login,
	logout,
	getUsers,
	refreshToken,
} from '../controllers/userController.js';

const router = Router();

// Protected routes
router.get('/', [tokenHandler, adminHandler], getUsers);

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

export default router;
