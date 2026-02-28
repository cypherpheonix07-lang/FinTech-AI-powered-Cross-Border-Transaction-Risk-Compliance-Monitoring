import { TransactionService } from '../transaction/transaction.service';
import { logger } from '../../config/logger';

export class SimulationService {
  private static activeSimulations = new Map<string, NodeJS.Timeout>();

  static async start(tenantId: string, intervalMs: number = 5000) {
    if (this.activeSimulations.has(tenantId)) {
      throw new Error('Simulation already running for this tenant');
    }

    logger.info(`STARTING SIMULATION for tenant: ${tenantId}`);

    const interval = setInterval(async () => {
      try {
        const isHighRisk = Math.random() > 0.8;
        const amount = Math.floor(Math.random() * 5000) + 100;
        
        const mockData = {
          amount,
          currency: 'USD',
          senderName: 'Simulated Sender',
          receiverName: 'Simulated Receiver',
          senderCountry: 'USA',
          receiverCountry: isHighRisk ? 'HighRiskRegion' : 'SafeRegion',
        };

        await TransactionService.create(mockData, tenantId);
      } catch (error) {
        logger.error('Simulation step failed:', error);
      }
    }, intervalMs);

    this.activeSimulations.set(tenantId, interval);
  }

  static stop(tenantId: string) {
    const interval = this.activeSimulations.get(tenantId);
    if (interval) {
      clearInterval(interval);
      this.activeSimulations.delete(tenantId);
      logger.info(`STOPPED SIMULATION for tenant: ${tenantId}`);
    }
  }

  static getStatus(tenantId: string) {
    return {
      running: this.activeSimulations.has(tenantId),
    };
  }
}
