import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { errorMiddleware } from './middleware/error.middleware';
import { prisma } from './config/database';
import { redis } from './config/redis';
import { apiLimiter, authLimiter } from './middleware/rate-limiter.middleware';
import authRoutes from './modules/auth/auth.routes';
import tenantRoutes from './modules/tenant/tenant.routes';
import transactionRoutes from './modules/transaction/transaction.routes';
import riskRoutes from './modules/risk/risk.routes';
import adminRoutes from './modules/admin/admin.routes';
import auditRoutes from './modules/audit/audit.routes';
import simulationRoutes from './modules/simulation/simulation.routes';
import escalationRoutes from './modules/escalation/escalation.routes';
import complianceRoutes from './modules/compliance/compliance.routes';
import analyticsRoutes from './modules/analytics/analytics.routes';
import ingestionRoutes from './modules/ingestion/ingestion.routes';
import web3BridgeRoutes from './modules/web3bridge/web3bridge.routes';
import vanguardRoutes from './modules/vanguard/vanguard.routes';

const app = express();

// Standard Middleware
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Rate Limiting
app.use('/api/', apiLimiter);
app.use('/api/auth', authLimiter);

// Routes — Core
app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/simulation', simulationRoutes);

// Routes — New Modules
app.use('/api/escalations', escalationRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/ingest', ingestionRoutes);
app.use('/api/web3-bridge', web3BridgeRoutes);
app.use('/api/vanguard', vanguardRoutes);

// Health Endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbStatus = await prisma.$queryRaw`SELECT 1`.then(() => 'UP').catch(() => 'DOWN');
    const redisStatus = redis.status === 'ready' ? 'UP' : 'DOWN';
    
    res.status(200).json({
      success: true,
      data: {
        status: 'UP',
        environment: env.NODE_ENV,
        database: dbStatus,
        redis: redisStatus,
        timestamp: new Date().toISOString(),
      },
    });
  } catch {
    res.status(500).json({ success: false, error: 'Health check failed' });
  }
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
