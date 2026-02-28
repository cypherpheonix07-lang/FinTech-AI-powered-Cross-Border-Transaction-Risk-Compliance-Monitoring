import { Router } from 'express';
import { SimulationController } from './simulation.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/start', SimulationController.start);
router.post('/stop', SimulationController.stop);
router.get('/status', SimulationController.getStatus);

export default router;
