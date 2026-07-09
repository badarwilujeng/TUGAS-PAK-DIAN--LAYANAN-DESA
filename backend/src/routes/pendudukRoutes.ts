import { Router } from 'express';
import {
  getAllPenduduk,
  getPendudukById,
  getMyPenduduk,
  createPenduduk,
  updatePenduduk,
  deletePenduduk,
} from '../controllers/pendudukController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { validateRequest } from '../middlewares/validationMiddleware';
import { Role } from '../models';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Penduduk can access their own data
router.get('/me', roleMiddleware(Role.PENDUK), getMyPenduduk);

// Admin can manage all penduduk
router.get('/', roleMiddleware([Role.SEKRETARIS, Role.KAPALA]), getAllPenduduk);
router.get('/:id', roleMiddleware([Role.SEKRETARIS, Role.KAPALA]), getPendudukById);
router.post('/', roleMiddleware([Role.SEKRETARIS, Role.KAPALA]), validateRequest(['nik', 'nama', 'Tempat_TanggalLahir', 'jenis_kelamin', 'alamat', 'rt', 'rw', 'dusun', 'agama', 'pendidikan', 'pekerjaan', 'status_kawin', 'hubungan_keluarga', 'kewarganegaraan']), createPenduduk);
router.put('/:id', roleMiddleware([Role.SEKRETARIS, Role.KAPALA]), updatePenduduk);
router.delete('/:id', roleMiddleware([Role.SEKRETARIS, Role.KAPALA]), deletePenduduk);

export default router;
