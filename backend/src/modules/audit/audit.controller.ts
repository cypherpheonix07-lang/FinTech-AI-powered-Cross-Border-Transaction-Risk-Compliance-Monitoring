import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { AuditService } from './audit.service';

export class AuditController {
  static async getLogs(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.role === 'ADMIN' ? undefined : req.user!.tenantId;
      const logs = await AuditService.getLogs(tenantId);
      res.status(200).json({ success: true, data: logs });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch audit logs' });
    }
  }

  static async export(req: AuthRequest, res: Response) {
    try {
      const csv = await AuditService.exportLogs();
      res.header('Content-Type', 'text/csv');
      res.attachment('audit_logs.csv');
      res.send(csv);
    } catch {
      res.status(500).json({ success: false, error: 'Failed to export logs' });
    }
  }
}
