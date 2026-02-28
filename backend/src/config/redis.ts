import Redis from 'ioredis';
import { env } from './env';
import { logger } from './logger';

const redisUrl = env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

redis.on('connect', () => {
  logger.info('🚀 Redis connected successfully');
});

redis.on('error', (error) => {
  logger.error('❌ Redis error:', error);
});
