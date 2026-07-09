import { Router } from 'express';
import {
  createLayanan,
  getAllLayanan,
  getLayananById,
  updateLayanan,
  deleteLayanan,
  generatePDF,
} from '../controllers/layananController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { Role } from '../models';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Layanan routes
router.post('/', createLayanan);
router.get('/', getAllLayanan);
router.get('/:id', getLayananById);
router.get('/:id/pdf', generatePDF);
router.put('/:id', roleMiddleware([Role.SEKRETARIS, Role.KAPALA]), updateLayanan);
router.delete('/:id', roleMiddleware([Role.SEKRETARIS, Role.KAPALA]), deleteLayanan);

export default router;
