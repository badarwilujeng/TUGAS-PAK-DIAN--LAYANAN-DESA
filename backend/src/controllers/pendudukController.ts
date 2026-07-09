import { Request, Response } from 'express';
import { pendudukService } from '../services/pendudukService';
import { authService } from '../services/authService';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { Role, AuthenticatedRequest } from '../types';

// Admin: Get all penduduk with optional search
export const getAllPenduduk = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { nama, nik, dusun, rt, rw } = req.query;
    const penduduk = await pendudukService.findAll({
      nama: nama as string,
      nik: nik as string,
      dusun: dusun as string,
      rt: rt as string,
      rw: rw as string,
    });
    res.json({ success: true, data: penduduk });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single penduduk by ID
export const getPendudukById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const penduduk = await pendudukService.findById(parseInt(id, 10));

    if (!penduduk) {
      return res.status(404).json({ success: false, error: 'Penduduk not found' });
    }

    // If user is penduduk, they can only view their own data
    if (req.user?.role === Role.PENDUK) {
      // We need to check if this penduduk is linked to the user
      // For simplicity, we assume a penduduk user can only access via /penduduk/me
      // or if they try to access by id, we must check if they own it.
      // We'll need a way to get user's linked penduduk_id. We can include that in the user object from token verification.
      // But our authMiddleware only attaches id, username, role. We could also attach penduduk_id from users table.
      // Let's modify authMiddleware to also fetch penduduk_id and include it. Or we can fetch here.
      // For now, restrict penduduk from accessing this endpoint directly; they should use /me.
      return res.status(403).json({ success: false, error: 'Penduduk can only access their own data via /penduduk/me' });
    }

    res.json({ success: true, data: penduduk });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get logged-in penduduk's own data
export const getMyPenduduk = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user?.role !== Role.PENDUK) {
      return res.status(403).json({ success: false, error: 'Only penduduk can access this endpoint' });
    }

    // We need to get the penduduk_id linked to the user.
    // Use authService to find by user id.
    const user = await authService.findById(req.user!.id);
    if (!user || !user.penduduk_id) {
      return res.status(404).json({ success: false, error: 'Penduduk data not linked to user' });
    }

    const penduduk = await pendudukService.findById(user.penduduk_id);
    if (!penduduk) {
      return res.status(404).json({ success: false, error: 'Penduduk data not found' });
    }

    res.json({ success: true, data: penduduk });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new penduduk (admin only)
export const createPenduduk = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = req.body;
    const penduduk = await pendudukService.create(data);
    res.status(201).json({ success: true, data: penduduk });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update penduduk (admin only)
export const updatePenduduk = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const penduduk = await pendudukService.update(parseInt(id, 10), { ...data, id: parseInt(id, 10) });

    if (!penduduk) {
      return res.status(404).json({ success: false, error: 'Penduduk not found' });
    }

    res.json({ success: true, data: penduduk });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete penduduk (admin only)
export const deletePenduduk = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const success = await pendudukService.delete(parseInt(id, 10));

    if (!success) {
      return res.status(404).json({ success: false, error: 'Penduduk not found' });
    }

    res.json({ success: true, message: 'Penduduk deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
