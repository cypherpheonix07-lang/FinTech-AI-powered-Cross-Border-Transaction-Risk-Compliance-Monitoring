import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { TransactionService } from './transaction.service';

export class TransactionController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const transaction = await TransactionService.create(req.body, req.user!.tenantId);
      res.status(201).json({ success: true, data: transaction });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to process transaction' });
    }
  }

  static async list(req: AuthRequest, res: Response) {
    try {
      const filters = req.query; // Expand with zod validation
      const transactions = await TransactionService.list(req.user!.tenantId, filters);
      res.status(200).json({ success: true, data: transactions });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch transactions' });
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const transaction = await TransactionService.getById(req.params.id, req.user!.tenantId);
      if (!transaction) return res.status(404).json({ success: false, error: 'Transaction not found' });
      res.status(200).json({ success: true, data: transaction });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch transaction' });
    }
  }
}
