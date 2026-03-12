"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const redis_1 = require("../../config/redis");
const uuid_1 = require("uuid");
class AuthService {
    static async createTokenPair(userId, role, tenantId) {
        const jti = (0, uuid_1.v4)();
        const accessToken = jsonwebtoken_1.default.sign({ sub: userId, role, tenantId }, env_1.env.JWT_ACCESS_SECRET, { expiresIn: env_1.env.JWT_ACCESS_EXPIRY });
        const refreshToken = jsonwebtoken_1.default.sign({ sub: userId, jti }, env_1.env.JWT_REFRESH_SECRET, { expiresIn: env_1.env.JWT_REFRESH_EXPIRY });
        // Store refresh token JTI in Redis for rotation/revocation per session
        // Key format: refresh_token:{userId}:{jti}
        await redis_1.redis.set(`refresh_token:${userId}:${jti}`, 'active', 'EX', 7 * 24 * 60 * 60);
        return { accessToken, refreshToken };
    }
    static async verifyRefreshToken(token) {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_REFRESH_SECRET);
        const jti = decoded.jti;
        // Check if this specific session/JTI is still active
        const status = await redis_1.redis.get(`refresh_token:${decoded.sub}:${jti}`);
        if (!status || status !== 'active') {
            throw new Error('Refresh token revoked');
        }
        return { userId: decoded.sub, jti: jti };
    }
    static async revokeSession(userId, jti) {
        await redis_1.redis.del(`refresh_token:${userId}:${jti}`);
    }
}
exports.AuthService = AuthService;
