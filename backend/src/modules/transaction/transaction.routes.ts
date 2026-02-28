import { Router } from 'express';
import { TransactionController } from './transaction.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', TransactionController.create);
router.get('/', TransactionController.list);
router.get('/:id', TransactionController.getById);

export default router;
