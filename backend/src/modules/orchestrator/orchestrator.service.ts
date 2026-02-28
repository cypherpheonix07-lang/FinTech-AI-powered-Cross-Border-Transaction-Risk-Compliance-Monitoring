import { prisma } from '../../config/database';
import { logger } from '../../config/logger';
import { AdminService } from '../admin/admin.service';
import * as fs from 'fs';
import * as path from 'path';

export class OrchestratorService {
  private static forensicDir = path.join(process.cwd(), 'forensics');

  static async triggerDefense(transactionId: string) {
    try {
      logger.warn(`Autonomous Defense Triggered for Transaction: ${transactionId}`);

      // 1. Fetch transaction details with relations
      const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
        include: {
          account: true,
          riskResult: true,
        },
      });

      if (!transaction) {
        logger.error(`Transaction ${transactionId} not found for defense trigger`);
        return;
      }

      // 2. Automate account freeze
      if (transaction.accountId) {
        await AdminService.freezeAccount(transaction.accountId);
        logger.info(`Account ${transaction.accountId} automatically frozen due to critical fraud risk`);
      }

      // 3. Generate Forensic Snapshot
      await this.generateSnapshot(transaction);

      return {
        action: 'ACCOUNT_FROZEN',
        snapshotGenerated: true,
      };
    } catch (error) {
      logger.error('Orchestrator defense trigger failed', { error, transactionId });
      throw error;
    }
  }

  private static async generateSnapshot(transaction: Record<string, unknown>) {
    if (!fs.existsSync(this.forensicDir)) {
      fs.mkdirSync(this.forensicDir, { recursive: true });
    }

    const snapshot = {
      timestamp: new Date().toISOString(),
      transactionId: transaction.id as string,
      transactionRef: transaction.transactionRef as string,
      accountNumber: (transaction.account as Record<string, unknown>)?.accountNumber as string,
      riskHistory: transaction.riskResults,
      rawIdentifier: transaction.identifier as string,
      securityStatus: 'CRITICAL_DEFENSE_TRIGGERED',
    };

    const fileName = `snapshot_${transaction.id}_${Date.now()}.json`;
    const filePath = path.join(this.forensicDir, fileName);

    fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2));
    logger.info(`Forensic snapshot saved to ${filePath}`);
  }
}
