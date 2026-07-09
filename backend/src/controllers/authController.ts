import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { AuthenticatedRequest, Role } from '../types';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required' });
    }

    const result = await authService.login({ username, password });
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role = 'penduduk' } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required' });
    }

    // Only allow 'penduduk' role for public registration
    if (role !== 'penduduk') {
      return res.status(400).json({ success: false, error: 'Invalid role for registration' });
    }

    const user = await authService.register({ username, password, role, penduduk_id: undefined });
    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const adminRegister = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user?.role !== Role.SEKRETARIS && req.user?.role !== Role.KAPALA) {
      return res.status(403).json({ success: false, error: 'Only admin can create users' });
    }

    const { username, password, role, penduduk_id } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ success: false, error: 'Username, password, and role are required' });
    }

    const allowedRoles = [Role.PENDUK, Role.SEKRETARIS, Role.KAPALA];
    if (!allowedRoles.includes(role as Role)) {
      return res.status(400).json({ success: false, error: 'Invalid role' });
    }

    const user = await authService.register({ username, password, role, penduduk_id });
    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    const user = await authService.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        penduduk_id: user.penduduk_id,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { username, newPassword } = req.body;
    if (!username || !newPassword) {
      return res.status(400).json({ success: false, error: 'Username dan password baru wajib diisi' });
    }
    await authService.resetPassword(username, newPassword);
    res.json({ success: true, message: 'Password berhasil direset' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
