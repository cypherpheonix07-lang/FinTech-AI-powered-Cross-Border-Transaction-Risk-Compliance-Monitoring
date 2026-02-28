"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceController = void 0;
const compliance_service_1 = require("./compliance.service");
class ComplianceController {
    static async generateSAR(req, res) {
        try {
            const { transactionIds, narrativeDescription, suspiciousActivity } = req.body;
            const report = await compliance_service_1.ComplianceService.generateSAR({
                transactionIds,
                narrativeDescription,
                suspiciousActivity,
                generatedBy: req.user.id,
                tenantId: req.user.tenantId,
            });
            res.status(201).json({ success: true, data: report });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message || 'Failed to generate SAR' });
            }
            else {
                res.status(500).json({ success: false, error: 'Failed to generate SAR' });
            }
        }
    }
    static async generateSTR(req, res) {
        try {
            const { transactionIds, reasonForSuspicion, regulatoryBody } = req.body;
            const report = await compliance_service_1.ComplianceService.generateSTR({
                transactionIds,
                reasonForSuspicion,
                regulatoryBody: regulatoryBody || 'FinCEN',
                generatedBy: req.user.id,
                tenantId: req.user.tenantId,
            });
            res.status(201).json({ success: true, data: report });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message || 'Failed to generate STR' });
            }
            else {
                res.status(500).json({ success: false, error: 'Failed to generate STR' });
            }
        }
    }
    static async listReports(req, res) {
        try {
            const { type, status, page = '1', limit = '20' } = req.query;
            const reports = await compliance_service_1.ComplianceService.listReports({
                tenantId: req.user.tenantId,
                type: type,
                status: status,
                page: parseInt(page),
                limit: parseInt(limit),
            });
            res.json({ success: true, data: reports });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch reports' });
        }
    }
    static async getReport(req, res) {
        try {
            const report = await compliance_service_1.ComplianceService.getReport(req.params.id, req.user.tenantId);
            if (!report)
                return res.status(404).json({ success: false, error: 'Report not found' });
            res.json({ success: true, data: report });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch report' });
        }
    }
    static async submitReport(req, res) {
        try {
            const report = await compliance_service_1.ComplianceService.submitReport(req.params.id, req.user.id);
            res.json({ success: true, data: report });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to submit report' });
        }
    }
    static async exportReport(req, res) {
        try {
            const { format = 'json' } = req.query;
            const data = await compliance_service_1.ComplianceService.exportReport(req.params.id, req.user.tenantId, format);
            if (format === 'csv') {
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename="report-${req.params.id}.csv"`);
            }
            res.json({ success: true, data });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to export report' });
        }
    }
}
exports.ComplianceController = ComplianceController;
