import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { redis } from '../../config/redis';

export class AuthService {
  static async createTokenPair(userId: string, role: string, tenantId: string) {
    const accessToken = jwt.sign(
      { sub: userId, role, tenantId },
      env.JWT_ACCESS_SECRET,
      { expiresIn: env.JWT_ACCESS_EXPIRY as jwt.SignOptions['expiresIn'] }
    );

    const refreshToken = jwt.sign(
      { sub: userId },
      env.JWT_REFRESH_SECRET,
      { expiresIn: env.JWT_REFRESH_EXPIRY as jwt.SignOptions['expiresIn'] }
    );

    // Store refresh token in Redis for rotation/revocation
    await redis.set(`refresh_token:${userId}`, refreshToken, 'EX', 7 * 24 * 60 * 60);

    return { accessToken, refreshToken };
  }

  static async verifyRefreshToken(token: string) {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as jwt.JwtPayload;
    const storedToken = await redis.get(`refresh_token:${decoded.sub}`);
    
    if (storedToken !== token) {
      throw new Error('Refresh token revoked');
    }

    return decoded.sub;
  }
}
