// backend/src/modules/escalation/escalation.routes.ts
import { Router } from 'express';
import { EscalationController } from './escalation.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
router.use(authMiddleware);

router.get('/', EscalationController.list);
router.get('/stats', EscalationController.getStats);
router.get('/:id', EscalationController.getById);
router.post('/:id/resolve', EscalationController.resolve);
router.post('/:id/assign', EscalationController.assign);

export default router;
