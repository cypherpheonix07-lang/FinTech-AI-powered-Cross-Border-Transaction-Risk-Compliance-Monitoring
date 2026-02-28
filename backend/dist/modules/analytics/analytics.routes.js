"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/modules/analytics/analytics.routes.ts
const express_1 = require("express");
const analytics_controller_1 = require("./analytics.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get('/', analytics_controller_1.AnalyticsController.getFraudTrends);
router.get('/corridors', analytics_controller_1.AnalyticsController.getCorridorRisk);
router.get('/models', analytics_controller_1.AnalyticsController.getModelPerformance);
router.get('/distribution', analytics_controller_1.AnalyticsController.getRiskDistribution);
exports.default = router;
