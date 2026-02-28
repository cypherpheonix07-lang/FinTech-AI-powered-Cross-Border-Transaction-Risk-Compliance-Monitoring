import { prisma } from '../../config/database';
import { FraudMLClient } from '../../integrations/fraud-ml.client';
import { DecisionEngine, RiskDecision } from '../../services/decision-engine';
import { OrchestratorService } from '../orchestrator/orchestrator.service'; // Added import
import { io } from '../../server';
// backend/src/modules/transaction/transaction.service.ts

export class TransactionService {
  static async create(input: Record<string, unknown>, tenantId: string) {
    // 1. Ensure Account exists (Production-ready Account tracking)
    let account = await prisma.account.findFirst({
      where: { accountNumber: input.accountNumber as string, tenantId },
    });

    if (!account) {
      account = await prisma.account.create({
        data: {
          accountNumber: input.accountNumber as string,
          tenantId,
        },
      });
    }

    // 2. Store initial transaction
    const transaction = await prisma.transaction.create({
      data: {
        transactionRef: (input.transactionRef as string) || `TX-${Date.now()}`,
        amount: input.amount as number,
        currency: (input.currency as string) || 'USD',
        senderCountry: input.senderCountry as string,
        receiverCountry: input.receiverCountry as string,
        identifier: input.identifier as string,
        status: 'PENDING',
        tenantId,
        accountId: account.id,
      },
    });

    // 3. Call ML service
    const fraudResult = await FraudMLClient.checkTransaction({
      amount: transaction.amount,
      currency: transaction.currency,
      sender_country: transaction.senderCountry,
      receiver_country: transaction.receiverCountry,
      identifier: transaction.identifier,
    });

    // 4. Persistence: Risk Score
    const riskResult = await prisma.riskResult.create({
      data: {
        transactionId: transaction.id,
        anomalyScore: fraudResult?.anomaly_score || 0,
        supervisedProb: fraudResult?.supervised_prob || 0,
        graphFlag: fraudResult?.graph_flag || false,
        finalRiskScore: fraudResult?.final_risk_score || 0,
        riskLevel: (fraudResult?.risk_level as any) || 'LOW',
        explanation: (fraudResult?.explanation as any) || {},
        modelVersionId: (input.modelVersionId as string) || 'v-baseline-1.0', // Default fallback
      },
    });

    // 5. Decision Engine
    const decision = await DecisionEngine.evaluate(riskResult as any, tenantId);

    // 6. Update Transaction Status / Create Escalation
    const updatedStatus = decision.decision === RiskDecision.BLOCK ? 'BLOCKED' : 
                          decision.decision === RiskDecision.FLAG ? 'FLAGGED' : 'APPROVED';

    const updated = await prisma.transaction.update({
      where: { id: transaction.id },
      data: { status: updatedStatus },
      include: { riskResult: true },
    });

    // Trigger Autonomous Defense for CRITICAL risks
    if (riskResult.riskLevel === 'CRITICAL' as any) {
      await OrchestratorService.triggerDefense(transaction.id);
    }

    if (decision.decision !== RiskDecision.APPROVE) {
      await prisma.escalation.create({
        data: {
          transactionId: transaction.id,
          tenantId,
          status: 'PENDING',
          notes: decision.reason,
        },
      });
    }

    // 7. Emit WebSocket events
    io.emit('transaction-created', updated);
    
    if (updated.status !== 'APPROVED') {
      io.emit('risk-alert', {
        type: updated.status,
        transactionId: updated.id,
        riskScore: riskResult.finalRiskScore,
        tenantId,
      });
    }

    return updated;
  }

  static async list(tenantId: string, filters: Record<string, unknown> = {}) {
    return prisma.transaction.findMany({
      where: {
        tenantId,
        ...filters,
      },
      include: {
        riskResult: true,
        account: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getById(id: string, tenantId: string) {
    return prisma.transaction.findFirst({
      where: { id, tenantId },
      include: {
        riskResult: true,
        account: true,
        escalation: true,
      },
    });
  }
}
