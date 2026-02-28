"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantMiddleware = void 0;
const tenantMiddleware = (req, res, next) => {
    if (!req.user?.tenantId) {
        return res.status(401).json({ success: false, error: 'Tenant context missing' });
    }
    // Inject tenantId into query or body if needed for forced filtering
    // For most services, we'll use req.user.tenantId directly inprisma calls
    next();
};
exports.tenantMiddleware = tenantMiddleware;
