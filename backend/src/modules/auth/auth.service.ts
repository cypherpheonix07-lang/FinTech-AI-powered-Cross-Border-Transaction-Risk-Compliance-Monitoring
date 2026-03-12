import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { redis } from '../../config/redis';
import { v4 as uuidv4 } from 'uuid';

export class AuthService {
  static async createTokenPair(userId: string, role: string, tenantId: string) {
    const jti = uuidv4();
    
    const accessToken = jwt.sign(
      { sub: userId, role, tenantId },
      env.JWT_ACCESS_SECRET,
      { expiresIn: env.JWT_ACCESS_EXPIRY as jwt.SignOptions['expiresIn'] }
    );

    const refreshToken = jwt.sign(
      { sub: userId, jti },
      env.JWT_REFRESH_SECRET,
      { expiresIn: env.JWT_REFRESH_EXPIRY as jwt.SignOptions['expiresIn'] }
    );

    // Store refresh token JTI in Redis for rotation/revocation per session
    // Key format: refresh_token:{userId}:{jti}
    await redis.set(`refresh_token:${userId}:${jti}`, 'active', 'EX', 7 * 24 * 60 * 60);

    return { accessToken, refreshToken };
  }

  static async verifyRefreshToken(token: string) {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as jwt.JwtPayload;
    const jti = decoded.jti;
    
    // Check if this specific session/JTI is still active
    const status = await redis.get(`refresh_token:${decoded.sub}:${jti}`);
    
    if (!status || status !== 'active') {
      throw new Error('Refresh token revoked');
    }

    return { userId: decoded.sub as string, jti: jti as string };
  }

  static async revokeSession(userId: string, jti: string) {
    await redis.del(`refresh_token:${userId}:${jti}`);
  }
}
