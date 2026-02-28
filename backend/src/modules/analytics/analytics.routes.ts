// backend/src/modules/analytics/analytics.routes.ts
import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
router.use(authMiddleware);

router.get('/', AnalyticsController.getFraudTrends);
router.get('/corridors', AnalyticsController.getCorridorRisk);
router.get('/models', AnalyticsController.getModelPerformance);
router.get('/distribution', AnalyticsController.getRiskDistribution);

export default router;
