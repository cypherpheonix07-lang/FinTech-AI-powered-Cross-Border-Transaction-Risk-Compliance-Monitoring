import Redis from 'ioredis';
import { env } from './env';
import { logger } from './logger';

const redisUrl = env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    if (times > 3) {
      logger.warn('⚠️ Redis connection failed after 3 attempts. Continuing without Redis caching.');
      return null; // stop retrying
    }
    const delay = Math.min(times * 1000, 3000);
    return delay;
  },
});

redis.on('connect', () => {
  logger.info('🚀 Redis connected successfully');
});

redis.on('error', (error) => {
  if (error.code === 'ECONNREFUSED') {
    // Log only once if connection refused
    return;
  }
  logger.error('❌ Redis error:', error);
});
