import { Router } from 'express';
import { TenantController } from './tenant.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { restrictTo } from '../../middleware/rbac.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', restrictTo('ADMIN'), TenantController.getAll);
router.get('/:id', restrictTo('ADMIN', 'ANALYST'), TenantController.getById);

export default router;
