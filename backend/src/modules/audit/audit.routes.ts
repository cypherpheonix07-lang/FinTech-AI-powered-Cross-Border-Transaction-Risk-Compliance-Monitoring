import { Router } from 'express';
import { AuditController } from './audit.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { restrictTo } from '../../middleware/rbac.middleware';

const router = Router();

router.use(authMiddleware, restrictTo('ADMIN', 'ANALYST'));

router.get('/', AuditController.getLogs);
router.get('/export', AuditController.export);

export default router;
