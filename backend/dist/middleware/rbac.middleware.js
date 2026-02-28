"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.restrictTo = void 0;
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Forbidden: Insufficient permissions',
            });
        }
        next();
    };
};
exports.restrictTo = restrictTo;
exports.requireRole = exports.restrictTo;
