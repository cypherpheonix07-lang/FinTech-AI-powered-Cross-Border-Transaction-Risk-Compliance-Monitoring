// backend/src/middleware/rate-limiter.middleware.ts
// Redis-backed rate limiting per tenant/IP
import { AuthRequest } from './auth.middleware';
import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis';
import { logger } from '../config/logger';

interface RateLimitConfig {
  windowMs: number;     // Time window in ms
  maxRequests: number;  // Max requests per window
  keyPrefix?: string;   // Redis key prefix
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000,   // 1 minute
  maxRequests: 100,       // 100 requests per minute
  keyPrefix: 'rl',
};

export function rateLimiter(config: Partial<RateLimitConfig> = {}) {
  const { windowMs, maxRequests, keyPrefix } = { ...DEFAULT_CONFIG, ...config };
  const windowSec = Math.ceil(windowMs / 1000);

  return async (req: Request, res: Response, next: NextFunction) => {
    if (!redis) {
      // Redis not available — skip rate limiting
      return next();
    }

    try {
      // Key: tenant + IP + path
      const tenantId = (req as AuthRequest).user?.tenantId || 'anonymous';
      const ip = req.ip || req.socket.remoteAddress || 'unknown';
      const key = `${keyPrefix}:${tenantId}:${ip}:${req.path}`;

      const current = await redis.incr(key);
      
      if (current === 1) {
        await redis.expire(key, windowSec);
      }

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - current));

      if (current > maxRequests) {
        const ttl = await redis.ttl(key);
        res.setHeader('Retry-After', ttl > 0 ? ttl : windowSec);
        
        logger.warn(`Rate limit exceeded: ${key} (${current}/${maxRequests})`);
        return res.status(429).json({
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: ttl > 0 ? ttl : windowSec,
        });
      }

      next();
    } catch (error) {
      // On Redis error, allow the request through
      logger.error('Rate limiter error:', error);
      next();
    }
  };
}

// Pre-configured limiters for different endpoints
export const apiLimiter = rateLimiter({ maxRequests: 100, windowMs: 60000 });
export const authLimiter = rateLimiter({ maxRequests: 10, windowMs: 60000, keyPrefix: 'rl:auth' });
export const batchLimiter = rateLimiter({ maxRequests: 5, windowMs: 60000, keyPrefix: 'rl:batch' });
