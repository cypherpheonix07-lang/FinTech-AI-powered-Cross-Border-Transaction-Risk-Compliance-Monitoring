import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../config/database';
import { AuthService } from './auth.service';
import { logger } from '../../config/logger';

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { tenant: true }
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const tokens = await AuthService.createTokenPair(user.id, user.role, user.tenantId);

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            tenant: user.tenant
          },
          ...tokens
        }
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({ success: false, error: 'Authentication failed' });
    }
  }

  static async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;

    try {
      const { userId } = await AuthService.verifyRefreshToken(refreshToken);
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) throw new Error('User not found');

      const tokens = await AuthService.createTokenPair(user.id, user.role, user.tenantId);

      res.status(200).json({ success: true, data: tokens });
    } catch {
      res.status(401).json({ success: false, error: 'Invalid refresh token' });
    }
  }
}
