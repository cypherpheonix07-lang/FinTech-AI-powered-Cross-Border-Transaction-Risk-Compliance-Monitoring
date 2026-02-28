import { Router } from 'express';
import { RiskController } from './risk.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

import { requireRole } from '../../middleware/rbac.middleware';
import { triggerRetrain } from './train.controller';

const router = Router();

router.use(authMiddleware);

router.get('/summary', RiskController.getSummary);
router.get('/corridors', RiskController.getCorridors);
router.post('/train', requireRole('ADMIN'), triggerRetrain);

export default router;
