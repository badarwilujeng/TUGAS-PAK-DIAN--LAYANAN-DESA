import { Response } from 'express';
import { dashboardService } from '../services/dashboardService';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { Role } from '../models';

export const getDashboardStats = async (req: any, res: Response) => {
  try {
    // Only admin can access dashboard stats
    if (req.user?.role !== Role.SEKRETARIS && req.user?.role !== Role.KAPALA) {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }

    const stats = await dashboardService.getStatistics();
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
