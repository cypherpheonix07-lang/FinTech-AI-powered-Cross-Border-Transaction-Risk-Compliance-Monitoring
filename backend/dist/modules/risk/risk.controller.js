"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskController = void 0;
const risk_service_1 = require("./risk.service");
class RiskController {
    static async getSummary(req, res) {
        try {
            const summary = await risk_service_1.RiskService.getSummary(req.user.tenantId);
            res.status(200).json({ success: true, data: summary });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch risk summary' });
        }
    }
    static async getCorridors(req, res) {
        try {
            const corridors = await risk_service_1.RiskService.getCorridors(req.user.tenantId);
            res.status(200).json({ success: true, data: corridors });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch corridors' });
        }
    }
}
exports.RiskController = RiskController;
