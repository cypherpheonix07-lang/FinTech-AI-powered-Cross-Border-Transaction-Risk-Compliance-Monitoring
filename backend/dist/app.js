"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const env_1 = require("./config/env");
const error_middleware_1 = require("./middleware/error.middleware");
const database_1 = require("./config/database");
const redis_1 = require("./config/redis");
const rate_limiter_middleware_1 = require("./middleware/rate-limiter.middleware");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const tenant_routes_1 = __importDefault(require("./modules/tenant/tenant.routes"));
const transaction_routes_1 = __importDefault(require("./modules/transaction/transaction.routes"));
const risk_routes_1 = __importDefault(require("./modules/risk/risk.routes"));
const admin_routes_1 = __importDefault(require("./modules/admin/admin.routes"));
const audit_routes_1 = __importDefault(require("./modules/audit/audit.routes"));
const simulation_routes_1 = __importDefault(require("./modules/simulation/simulation.routes"));
const escalation_routes_1 = __importDefault(require("./modules/escalation/escalation.routes"));
const compliance_routes_1 = __importDefault(require("./modules/compliance/compliance.routes"));
const analytics_routes_1 = __importDefault(require("./modules/analytics/analytics.routes"));
const ingestion_routes_1 = __importDefault(require("./modules/ingestion/ingestion.routes"));
const web3bridge_routes_1 = __importDefault(require("./modules/web3bridge/web3bridge.routes"));
const vanguard_routes_1 = __importDefault(require("./modules/vanguard/vanguard.routes"));
const app = (0, express_1.default)();
// Standard Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: env_1.env.FRONTEND_URL, credentials: true }));
app.use(express_1.default.json({ limit: '10mb' }));
// Rate Limiting
app.use('/api/', rate_limiter_middleware_1.apiLimiter);
app.use('/api/auth', rate_limiter_middleware_1.authLimiter);
// Routes — Core
app.use('/api/auth', auth_routes_1.default);
app.use('/api/tenants', tenant_routes_1.default);
app.use('/api/transactions', transaction_routes_1.default);
app.use('/api/risk', risk_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use('/api/audit', audit_routes_1.default);
app.use('/api/simulation', simulation_routes_1.default);
// Routes — New Modules
app.use('/api/escalations', escalation_routes_1.default);
app.use('/api/compliance', compliance_routes_1.default);
app.use('/api/v1/analytics', analytics_routes_1.default);
app.use('/api/ingest', ingestion_routes_1.default);
app.use('/api/web3-bridge', web3bridge_routes_1.default);
app.use('/api/vanguard', vanguard_routes_1.default);
// Health Endpoint
app.get('/api/health', async (req, res) => {
    try {
        const dbStatus = await database_1.prisma.$queryRaw `SELECT 1`.then(() => 'UP').catch(() => 'DOWN');
        const redisStatus = redis_1.redis.status === 'ready' ? 'UP' : 'DOWN';
        res.status(200).json({
            success: true,
            data: {
                status: 'UP',
                environment: env_1.env.NODE_ENV,
                database: dbStatus,
                redis: redisStatus,
                timestamp: new Date().toISOString(),
            },
        });
    }
    catch {
        res.status(500).json({ success: false, error: 'Health check failed' });
    }
});
// Global Error Handler
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
