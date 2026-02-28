import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const tenantMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user?.tenantId) {
    return res.status(401).json({ success: false, error: 'Tenant context missing' });
  }
  
  // Inject tenantId into query or body if needed for forced filtering
  // For most services, we'll use req.user.tenantId directly inprisma calls
  
  next();
};
