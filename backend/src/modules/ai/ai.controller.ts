import { Request, Response, NextFunction } from 'express';
import { ollamaService } from '../../services/ollamaService';

export class AIController {
  
  /**
   * Health check for Ollama connection
   */
  async checkStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const isHealthy = await ollamaService.checkHealth();
      res.status(200).json({
        success: true,
        data: {
          status: isHealthy ? 'ONLINE' : 'OFFLINE',
          model: process.env.OLLAMA_MODEL || 'llama3.1'
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Run a security simulation
   */
  async simulate(req: Request, res: Response, next: NextFunction) {
    try {
      const { scenario } = req.body;
      if (!scenario) {
        return res.status(400).json({ success: false, error: 'Scenario prompt is required' });
      }

      const response = await ollamaService.runSecuritySimulation(scenario);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Explain transaction risk
   */
  async explainRisk(req: Request, res: Response, next: NextFunction) {
    try {
      const { transactionData } = req.body;
      if (!transactionData) {
        return res.status(400).json({ success: false, error: 'Transaction data is required' });
      }

      const response = await ollamaService.explainRisk(transactionData);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      next(error);
    }
  }
}

export const aiController = new AIController();
