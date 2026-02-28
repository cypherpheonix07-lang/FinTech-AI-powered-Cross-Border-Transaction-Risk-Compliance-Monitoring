import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { RiskService } from './risk.service';

export class RiskController {
  static async getSummary(req: AuthRequest, res: Response) {
    try {
      const summary = await RiskService.getSummary(req.user!.tenantId);
      res.status(200).json({ success: true, data: summary });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch risk summary' });
    }
  }

  static async getCorridors(req: AuthRequest, res: Response) {
    try {
      const corridors = await RiskService.getCorridors(req.user!.tenantId);
      res.status(200).json({ success: true, data: corridors });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch corridors' });
    }
  }
}
