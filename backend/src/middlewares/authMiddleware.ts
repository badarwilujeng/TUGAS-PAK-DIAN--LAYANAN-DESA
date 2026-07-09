import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { authService } from '../services/authService';
import { AuthenticatedRequest } from '../types';

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const decoded = verifyToken(token);

    // Verify user still exists in database
    const user = await authService.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    // Attach user info to request
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    next();
  } catch (error: any) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};
