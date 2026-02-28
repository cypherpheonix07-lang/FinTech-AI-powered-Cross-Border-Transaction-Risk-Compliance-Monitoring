"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../../config/database");
const auth_service_1 = require("./auth.service");
const logger_1 = require("../../config/logger");
class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await database_1.prisma.user.findUnique({
                where: { email },
                include: { tenant: true }
            });
            if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
                return res.status(401).json({ success: false, error: 'Invalid credentials' });
            }
            const tokens = await auth_service_1.AuthService.createTokenPair(user.id, user.role, user.tenantId);
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
        }
        catch (error) {
            logger_1.logger.error('Login error:', error);
            res.status(500).json({ success: false, error: 'Authentication failed' });
        }
    }
    static async refresh(req, res) {
        const { refreshToken } = req.body;
        try {
            const userId = await auth_service_1.AuthService.verifyRefreshToken(refreshToken);
            const user = await database_1.prisma.user.findUnique({ where: { id: userId } });
            if (!user)
                throw new Error('User not found');
            const tokens = await auth_service_1.AuthService.createTokenPair(user.id, user.role, user.tenantId);
            res.status(200).json({ success: true, data: tokens });
        }
        catch {
            res.status(401).json({ success: false, error: 'Invalid refresh token' });
        }
    }
}
exports.AuthController = AuthController;
