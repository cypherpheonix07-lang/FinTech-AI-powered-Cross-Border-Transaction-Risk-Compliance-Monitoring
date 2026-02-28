"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/modules/compliance/compliance.routes.ts
const express_1 = require("express");
const compliance_controller_1 = require("./compliance.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post('/sar', (0, rbac_middleware_1.requireRole)('ADMIN', 'ANALYST'), compliance_controller_1.ComplianceController.generateSAR);
router.post('/str', (0, rbac_middleware_1.requireRole)('ADMIN', 'ANALYST'), compliance_controller_1.ComplianceController.generateSTR);
router.get('/reports', compliance_controller_1.ComplianceController.listReports);
router.get('/reports/:id', compliance_controller_1.ComplianceController.getReport);
router.post('/reports/:id/submit', (0, rbac_middleware_1.requireRole)('ADMIN'), compliance_controller_1.ComplianceController.submitReport);
router.get('/reports/:id/export', compliance_controller_1.ComplianceController.exportReport);
exports.default = router;
