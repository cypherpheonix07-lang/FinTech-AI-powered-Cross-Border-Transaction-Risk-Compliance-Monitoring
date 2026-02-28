import { Router } from 'express';
import { IngestionController } from './ingestion.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

router.post('/swift', authMiddleware, IngestionController.ingestSWIFT);
router.post('/iso20022', authMiddleware, IngestionController.ingestISO20022);

export default router;
