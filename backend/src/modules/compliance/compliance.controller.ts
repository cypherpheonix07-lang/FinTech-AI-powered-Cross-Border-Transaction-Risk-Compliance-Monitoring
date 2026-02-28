// backend/src/modules/compliance/compliance.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { ComplianceService } from './compliance.service';

export class ComplianceController {
  static async generateSAR(req: AuthRequest, res: Response) {
    try {
      const { transactionIds, narrativeDescription, suspiciousActivity } = req.body;
      const report = await ComplianceService.generateSAR({
        transactionIds,
        narrativeDescription,
        suspiciousActivity,
        generatedBy: req.user!.id,
        tenantId: req.user!.tenantId,
      });
      res.status(201).json({ success: true, data: report });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message || 'Failed to generate SAR' });
      } else {
        res.status(500).json({ success: false, error: 'Failed to generate SAR' });
      }
    }
  }

  static async generateSTR(req: AuthRequest, res: Response) {
    try {
      const { transactionIds, reasonForSuspicion, regulatoryBody } = req.body;
      const report = await ComplianceService.generateSTR({
        transactionIds,
        reasonForSuspicion,
        regulatoryBody: regulatoryBody || 'FinCEN',
        generatedBy: req.user!.id,
        tenantId: req.user!.tenantId,
      });
      res.status(201).json({ success: true, data: report });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message || 'Failed to generate STR' });
      } else {
        res.status(500).json({ success: false, error: 'Failed to generate STR' });
      }
    }
  }

  static async listReports(req: AuthRequest, res: Response) {
    try {
      const { type, status, page = '1', limit = '20' } = req.query;
      const reports = await ComplianceService.listReports({
        tenantId: req.user!.tenantId,
        type: type as string,
        status: status as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      });
      res.json({ success: true, data: reports });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch reports' });
    }
  }

  static async getReport(req: AuthRequest, res: Response) {
    try {
      const report = await ComplianceService.getReport(req.params.id, req.user!.tenantId);
      if (!report) return res.status(404).json({ success: false, error: 'Report not found' });
      res.json({ success: true, data: report });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch report' });
    }
  }

  static async submitReport(req: AuthRequest, res: Response) {
    try {
      const report = await ComplianceService.submitReport(req.params.id, req.user!.id);
      res.json({ success: true, data: report });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to submit report' });
    }
  }

  static async exportReport(req: AuthRequest, res: Response) {
    try {
      const { format = 'json' } = req.query;
      const data = await ComplianceService.exportReport(req.params.id, req.user!.tenantId, format as string);
      if (format === 'csv') {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="report-${req.params.id}.csv"`);
      }
      res.json({ success: true, data });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to export report' });
    }
  }
}
