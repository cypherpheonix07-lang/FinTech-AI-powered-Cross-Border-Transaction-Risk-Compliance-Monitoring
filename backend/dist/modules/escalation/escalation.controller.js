"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscalationController = void 0;
const escalation_service_1 = require("./escalation.service");
class EscalationController {
    static async list(req, res) {
        try {
            const { status, priority, page = '1', limit = '20' } = req.query;
            const escalations = await escalation_service_1.EscalationService.list({
                tenantId: req.user.tenantId,
                status: status,
                priority: priority,
                page: parseInt(page),
                limit: parseInt(limit),
            });
            res.json({ success: true, data: escalations });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch escalations' });
        }
    }
    static async getById(req, res) {
        try {
            const escalation = await escalation_service_1.EscalationService.getById(req.params.id, req.user.tenantId);
            if (!escalation) {
                return res.status(404).json({ success: false, error: 'Escalation not found' });
            }
            res.json({ success: true, data: escalation });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch escalation' });
        }
    }
    static async resolve(req, res) {
        try {
            const { resolution, notes } = req.body;
            const escalation = await escalation_service_1.EscalationService.resolve(req.params.id, req.user.id, resolution, notes);
            res.json({ success: true, data: escalation });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to resolve escalation' });
        }
    }
    static async assign(req, res) {
        try {
            const { assigneeId } = req.body;
            const escalation = await escalation_service_1.EscalationService.assign(req.params.id, assigneeId);
            res.json({ success: true, data: escalation });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to assign escalation' });
        }
    }
    static async getStats(req, res) {
        try {
            const stats = await escalation_service_1.EscalationService.getStats(req.user.tenantId);
            res.json({ success: true, data: stats });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch stats' });
        }
    }
}
exports.EscalationController = EscalationController;
