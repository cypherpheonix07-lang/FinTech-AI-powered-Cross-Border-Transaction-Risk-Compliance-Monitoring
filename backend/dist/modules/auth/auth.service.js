"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const redis_1 = require("../../config/redis");
class AuthService {
    static async createTokenPair(userId, role, tenantId) {
        const accessToken = jsonwebtoken_1.default.sign({ sub: userId, role, tenantId }, env_1.env.JWT_ACCESS_SECRET, { expiresIn: env_1.env.JWT_ACCESS_EXPIRY });
        const refreshToken = jsonwebtoken_1.default.sign({ sub: userId }, env_1.env.JWT_REFRESH_SECRET, { expiresIn: env_1.env.JWT_REFRESH_EXPIRY });
        // Store refresh token in Redis for rotation/revocation
        await redis_1.redis.set(`refresh_token:${userId}`, refreshToken, 'EX', 7 * 24 * 60 * 60);
        return { accessToken, refreshToken };
    }
    static async verifyRefreshToken(token) {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_REFRESH_SECRET);
        const storedToken = await redis_1.redis.get(`refresh_token:${decoded.sub}`);
        if (storedToken !== token) {
            throw new Error('Refresh token revoked');
        }
        return decoded.sub;
    }
}
exports.AuthService = AuthService;
