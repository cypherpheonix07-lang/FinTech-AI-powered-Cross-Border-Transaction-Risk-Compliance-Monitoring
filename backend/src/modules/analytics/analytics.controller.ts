// backend/src/modules/analytics/analytics.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { AnalyticsService } from './analytics.service';

export class AnalyticsController {
  static async getFraudTrends(req: AuthRequest, res: Response) {
    try {
      const { period = '30d' } = req.query;
      const trends = await AnalyticsService.getFraudTrends(req.user!.tenantId, period as string);
      res.json({ success: true, data: trends });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch fraud trends' });
    }
  }

  static async getCorridorRisk(req: AuthRequest, res: Response) {
    try {
      const corridors = await AnalyticsService.getCorridorRisk(req.user!.tenantId);
      res.json({ success: true, data: corridors });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch corridor risk' });
    }
  }

  static async getModelPerformance(req: AuthRequest, res: Response) {
    try {
      const performance = await AnalyticsService.getModelPerformance();
      res.json({ success: true, data: performance });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch model performance' });
    }
  }

  static async getRiskDistribution(req: AuthRequest, res: Response) {
    try {
      const distribution = await AnalyticsService.getRiskDistribution(req.user!.tenantId);
      res.json({ success: true, data: distribution });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch risk distribution' });
    }
  }
}
