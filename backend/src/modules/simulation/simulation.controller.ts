import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { SimulationService } from './simulation.service';

export class SimulationController {
  static async start(req: AuthRequest, res: Response) {
    try {
      const { interval } = req.body;
      await SimulationService.start(req.user!.tenantId, interval);
      res.status(200).json({ success: true, message: 'Simulation started' });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({ success: false, error: msg });
    }
  }

  static async stop(req: AuthRequest, res: Response) {
    try {
      SimulationService.stop(req.user!.tenantId);
      res.status(200).json({ success: true, message: 'Simulation stopped' });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to stop simulation' });
    }
  }

  static async getStatus(req: AuthRequest, res: Response) {
    const status = SimulationService.getStatus(req.user!.tenantId);
    res.status(200).json({ success: true, data: status });
  }
}
