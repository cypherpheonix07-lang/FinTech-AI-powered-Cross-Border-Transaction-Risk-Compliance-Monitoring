// backend/src/modules/escalation/escalation.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { EscalationService } from './escalation.service';

export class EscalationController {
  static async list(req: AuthRequest, res: Response) {
    try {
      const { status, priority, page = '1', limit = '20' } = req.query;
      const escalations = await EscalationService.list({
        tenantId: req.user!.tenantId,
        status: status as string,
        priority: priority as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      });
      res.json({ success: true, data: escalations });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch escalations' });
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const escalation = await EscalationService.getById(req.params.id, req.user!.tenantId);
      if (!escalation) {
        return res.status(404).json({ success: false, error: 'Escalation not found' });
      }
      res.json({ success: true, data: escalation });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch escalation' });
    }
  }

  static async resolve(req: AuthRequest, res: Response) {
    try {
      const { resolution, notes } = req.body;
      const escalation = await EscalationService.resolve(
        req.params.id,
        req.user!.id,
        resolution,
        notes
      );
      res.json({ success: true, data: escalation });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to resolve escalation' });
    }
  }

  static async assign(req: AuthRequest, res: Response) {
    try {
      const { assigneeId } = req.body;
      const escalation = await EscalationService.assign(req.params.id, assigneeId);
      res.json({ success: true, data: escalation });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to assign escalation' });
    }
  }

  static async getStats(req: AuthRequest, res: Response) {
    try {
      const stats = await EscalationService.getStats(req.user!.tenantId);
      res.json({ success: true, data: stats });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch stats' });
    }
  }
}
