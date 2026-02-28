import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { IngestionService } from './ingestion.service';

export class IngestionController {
  static async ingestSWIFT(req: AuthRequest, res: Response) {
    try {
      const { rawMessage } = req.body;
      if (!rawMessage) {
        return res.status(400).json({ success: false, error: 'rawMessage is required' });
      }

      const result = await IngestionService.ingestSWIFT(rawMessage, req.user!.tenantId);
      res.status(201).json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to ingest SWIFT message' });
    }
  }

  static async ingestISO20022(req: AuthRequest, res: Response) {
    try {
      const { rawMessage } = req.body;
      if (!rawMessage) {
        return res.status(400).json({ success: false, error: 'rawMessage is required' });
      }

      const result = await IngestionService.ingestISO20022(rawMessage, req.user!.tenantId);
      res.status(201).json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to ingest ISO20022 message' });
    }
  }
}
