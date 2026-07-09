import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { Role } from '../models';

const router = Router();

// All routes require authentication and admin role
router.use(authMiddleware, roleMiddleware([Role.SEKRETARIS, Role.KAPALA]));

router.get('/stats', getDashboardStats);

export default router;
