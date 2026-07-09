import { Router } from 'express';
import { login, register, adminRegister, getMe, resetPassword } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { validateRequest } from '../middlewares/validationMiddleware';
import { Role } from '../models';

const router = Router();

// Public routes
router.post('/login', validateRequest(['username', 'password']), login);
router.post('/register', validateRequest(['username', 'password']), register);
router.post('/reset-password', validateRequest(['username', 'newPassword']), resetPassword);

// Protected routes
router.get('/me', authMiddleware, getMe);

// Admin only routes
router.post('/admin/register', authMiddleware, roleMiddleware([Role.SEKRETARIS, Role.KAPALA]), validateRequest(['username', 'password', 'role']), adminRegister);

export default router;
