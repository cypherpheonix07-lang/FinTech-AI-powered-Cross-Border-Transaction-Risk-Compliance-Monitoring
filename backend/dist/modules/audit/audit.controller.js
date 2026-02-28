"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditController = void 0;
const audit_service_1 = require("./audit.service");
class AuditController {
    static async getLogs(req, res) {
        try {
            const tenantId = req.user.role === 'ADMIN' ? undefined : req.user.tenantId;
            const logs = await audit_service_1.AuditService.getLogs(tenantId);
            res.status(200).json({ success: true, data: logs });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch audit logs' });
        }
    }
    static async export(req, res) {
        try {
            const csv = await audit_service_1.AuditService.exportLogs();
            res.header('Content-Type', 'text/csv');
            res.attachment('audit_logs.csv');
            res.send(csv);
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to export logs' });
        }
    }
}
exports.AuditController = AuditController;
