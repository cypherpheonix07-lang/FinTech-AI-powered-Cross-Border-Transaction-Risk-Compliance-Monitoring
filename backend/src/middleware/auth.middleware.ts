import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { logger } from '../config/logger';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    tenantId: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as jwt.JwtPayload;
    if (!decoded.sub || !decoded.role || !decoded.tenantId) {
      throw new Error('Invalid token payload');
    }
    req.user = {
      id: decoded.sub as string,
      role: decoded.role as string,
      tenantId: decoded.tenantId as string,
    };
    next();
  } catch (error) {
    logger.warn('Invalid token attempt:', error);
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
};
