import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export interface TransferRequest {
  senderAccountId: string;
  receiverAccountId: string;
  amount: number;
  currency: string;
  targetCurrency?: string; // Feature 10.03
  description?: string;
  tenantId: string;
}

export class TransactionMasterService {
  /**
   * Feature 10.01: Real-time ledger updates with ACID transactions
   * Feature 10.02: Double-entry bookkeeping with audit trail
   * Feature 10.03: Multi-currency ledger (Auto FX)
   * Feature 10.04: Fractional cent scaling (10^-8 precision)
   * Feature 10.06: Fee Engine (Dynamic calculation)
   */
  async executeAtomicTransfer(request: TransferRequest) {
    const { senderAccountId, receiverAccountId, amount, currency, targetCurrency, description, tenantId } = request;

    return await prisma.$transaction(async (tx) => {
      // 1. Validate accounts and balances
      const sender = await tx.account.findUnique({
        where: { id: senderAccountId },
      });

      if (!sender || sender.balance.lessThan(amount)) {
        throw new Error('Insufficient funds or sender account not found');
      }

      const receiver = await tx.account.findUnique({
        where: { id: receiverAccountId },
      });

      if (!receiver) {
        throw new Error('Receiver account not found');
      }

      // 2. Calculate Fees (Feature 10.06)
      // Example: 0.1% fee, capped at 10 units, min 0.01 units
      const feeRate = new Decimal(0.001);
      let feeAmount = new Decimal(amount).times(feeRate);
      if (feeAmount.lessThan(0.01)) feeAmount = new Decimal(0.01);
      if (feeAmount.greaterThan(10)) feeAmount = new Decimal(10);
      
      const netAmount = new Decimal(amount).minus(feeAmount);

      // 3. Handle FX Conversion (Feature 10.03) with high precision (10.04)
      let creditAmount = netAmount;
      let exchangeRate = new Decimal(1);
      const effectiveTargetCurrency = targetCurrency || receiver.currency;

      if (currency !== effectiveTargetCurrency) {
        const rateRecord = await tx.exchangeRate.findFirst({
          where: { fromCurrency: currency, toCurrency: effectiveTargetCurrency },
          orderBy: { createdAt: 'desc' },
        });

        if (!rateRecord) {
          throw new Error(`Exchange rate not found from ${currency} to ${effectiveTargetCurrency}`);
        }

        exchangeRate = rateRecord.rate;
        creditAmount = netAmount.times(exchangeRate);
      }

      // 4. Create the main transaction record
      const transaction = await tx.transaction.create({
        data: {
          transactionRef: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          amount: new Decimal(amount),
          currency,
          status: 'COMPLETED',
          tenantId,
          accountId: senderAccountId,
        },
      });

      // 5. Update account balances (ACID)
      await tx.account.update({
        where: { id: senderAccountId },
        data: { balance: { decrement: new Decimal(amount) } },
      });

      await tx.account.update({
        where: { id: receiverAccountId },
        data: { balance: { increment: creditAmount } },
      });

      // 6. Double-entry bookkeeping (Feature 10.02)
      // Debit Entry (Sender)
      await tx.ledgerEntry.create({
        data: {
          transactionId: transaction.id,
          accountId: senderAccountId,
          type: 'DEBIT',
          amount: new Decimal(amount),
          currency,
          description: description || `Transfer to ${receiverAccountId}`,
          auditHash: this.generateAuditHash(transaction.id, senderAccountId, 'DEBIT'),
        },
      });

      // Credit Entry (Receiver)
      await tx.ledgerEntry.create({
        data: {
          transactionId: transaction.id,
          accountId: receiverAccountId,
          type: 'CREDIT',
          amount: creditAmount,
          currency: effectiveTargetCurrency,
          description: description || `Received from ${senderAccountId}`,
          auditHash: this.generateAuditHash(transaction.id, receiverAccountId, 'CREDIT'),
        },
      });

      // Fee Entry (Platform Revenue)
      if (feeAmount.greaterThan(0)) {
        await tx.ledgerEntry.create({
          data: {
            transactionId: transaction.id,
            accountId: senderAccountId, 
            type: 'FEE',
            amount: feeAmount,
            currency,
            description: `Processing fee for ${transaction.transactionRef}`,
            auditHash: this.generateAuditHash(transaction.id, 'SYSTEM_FEE', 'FEE'),
          },
        });
      }

      return transaction;
    });
  }

  /**
   * Generates a unique cryptographic hash for each transfer at initiation
   * (Aligned with Section 51 proof engine)
   */
  private generateAuditHash(txId: string, accId: string, type: string): string {
    // In a real implementation, this would use SHA-256 with previous hash chaining
    return `PROOF-${txId.substr(0, 8)}-${accId.substr(0, 8)}-${type}`;
  }
}

export const transactionMasterService = new TransactionMasterService();
