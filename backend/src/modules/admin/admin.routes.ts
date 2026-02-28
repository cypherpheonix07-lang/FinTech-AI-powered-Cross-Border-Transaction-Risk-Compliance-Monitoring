import { Router } from 'express';
import { AdminController } from './admin.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { restrictTo } from '../../middleware/rbac.middleware';

const router = Router();

router.use(authMiddleware, restrictTo('ADMIN'));

router.get('/overview', AdminController.getOverview);
router.get('/users', AdminController.listUsers);
router.post('/users/role', AdminController.updateUserRole);
router.post('/freeze-account', AdminController.freezeAccount);
router.post('/rotate-keys', AdminController.rotateKeys);

export default router;
