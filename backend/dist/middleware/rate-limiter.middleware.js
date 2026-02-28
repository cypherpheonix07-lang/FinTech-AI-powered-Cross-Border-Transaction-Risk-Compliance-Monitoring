"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchLimiter = exports.authLimiter = exports.apiLimiter = void 0;
exports.rateLimiter = rateLimiter;
const redis_1 = require("../config/redis");
const logger_1 = require("../config/logger");
const DEFAULT_CONFIG = {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute
    keyPrefix: 'rl',
};
function rateLimiter(config = {}) {
    const { windowMs, maxRequests, keyPrefix } = { ...DEFAULT_CONFIG, ...config };
    const windowSec = Math.ceil(windowMs / 1000);
    return async (req, res, next) => {
        if (!redis_1.redis) {
            // Redis not available — skip rate limiting
            return next();
        }
        try {
            // Key: tenant + IP + path
            const tenantId = req.user?.tenantId || 'anonymous';
            const ip = req.ip || req.socket.remoteAddress || 'unknown';
            const key = `${keyPrefix}:${tenantId}:${ip}:${req.path}`;
            const current = await redis_1.redis.incr(key);
            if (current === 1) {
                await redis_1.redis.expire(key, windowSec);
            }
            // Set rate limit headers
            res.setHeader('X-RateLimit-Limit', maxRequests);
            res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - current));
            if (current > maxRequests) {
                const ttl = await redis_1.redis.ttl(key);
                res.setHeader('Retry-After', ttl > 0 ? ttl : windowSec);
                logger_1.logger.warn(`Rate limit exceeded: ${key} (${current}/${maxRequests})`);
                return res.status(429).json({
                    success: false,
                    error: 'Too many requests. Please try again later.',
                    retryAfter: ttl > 0 ? ttl : windowSec,
                });
            }
            next();
        }
        catch (error) {
            // On Redis error, allow the request through
            logger_1.logger.error('Rate limiter error:', error);
            next();
        }
    };
}
// Pre-configured limiters for different endpoints
exports.apiLimiter = rateLimiter({ maxRequests: 100, windowMs: 60000 });
exports.authLimiter = rateLimiter({ maxRequests: 10, windowMs: 60000, keyPrefix: 'rl:auth' });
exports.batchLimiter = rateLimiter({ maxRequests: 5, windowMs: 60000, keyPrefix: 'rl:batch' });
