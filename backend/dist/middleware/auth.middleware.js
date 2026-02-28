"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Authorization token required' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_ACCESS_SECRET);
        if (!decoded.sub || !decoded.role || !decoded.tenantId) {
            throw new Error('Invalid token payload');
        }
        req.user = {
            id: decoded.sub,
            role: decoded.role,
            tenantId: decoded.tenantId,
        };
        next();
    }
    catch (error) {
        logger_1.logger.warn('Invalid token attempt:', error);
        res.status(401).json({ success: false, error: 'Invalid or expired token' });
    }
};
exports.authMiddleware = authMiddleware;
