"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
class AnalyticsController {
    static async getFraudTrends(req, res) {
        try {
            const { period = '30d' } = req.query;
            const trends = await analytics_service_1.AnalyticsService.getFraudTrends(req.user.tenantId, period);
            res.json({ success: true, data: trends });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch fraud trends' });
        }
    }
    static async getCorridorRisk(req, res) {
        try {
            const corridors = await analytics_service_1.AnalyticsService.getCorridorRisk(req.user.tenantId);
            res.json({ success: true, data: corridors });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch corridor risk' });
        }
    }
    static async getModelPerformance(req, res) {
        try {
            const performance = await analytics_service_1.AnalyticsService.getModelPerformance();
            res.json({ success: true, data: performance });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch model performance' });
        }
    }
    static async getRiskDistribution(req, res) {
        try {
            const distribution = await analytics_service_1.AnalyticsService.getRiskDistribution(req.user.tenantId);
            res.json({ success: true, data: distribution });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch risk distribution' });
        }
    }
}
exports.AnalyticsController = AnalyticsController;
