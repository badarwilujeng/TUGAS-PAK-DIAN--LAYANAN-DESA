import { Request, Response, NextFunction } from 'express';

export const validateRequest = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];
    requiredFields.forEach(field => {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        errors.push(`${field} is required`);
      }
    });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, error: errors.join(', ') });
    }
    next();
  };
};
