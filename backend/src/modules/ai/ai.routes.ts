import { Router } from 'express';
import { aiController } from './ai.controller';

const router = Router();

router.get('/status', aiController.checkStatus);
router.post('/simulate', aiController.simulate);
router.post('/explain-risk', aiController.explainRisk);

export default router;
