// backend/src/modules/compliance/compliance.routes.ts
import { Router } from 'express';
import { ComplianceController } from './compliance.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { requireRole } from '../../middleware/rbac.middleware';

const router = Router();
router.use(authMiddleware);

router.post('/sar', requireRole('ADMIN', 'ANALYST'), ComplianceController.generateSAR);
router.post('/str', requireRole('ADMIN', 'ANALYST'), ComplianceController.generateSTR);
router.get('/reports', ComplianceController.listReports);
router.get('/reports/:id', ComplianceController.getReport);
router.post('/reports/:id/submit', requireRole('ADMIN'), ComplianceController.submitReport);
router.get('/reports/:id/export', ComplianceController.exportReport);

export default router;
