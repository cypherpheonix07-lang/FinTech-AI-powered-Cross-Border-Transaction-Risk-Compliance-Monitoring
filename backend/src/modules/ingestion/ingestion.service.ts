import { parseSWIFTMessage } from '../../services/parsers/swift-parser';
import { parseISO20022 } from '../../services/parsers/iso20022-parser';
import { EncryptionService } from '../../services/encryption-service';
import { TransactionService } from '../transaction/transaction.service';
import { logger } from '../../config/logger';

export class IngestionService {
  static async ingestSWIFT(rawMessage: string, tenantId: string) {
    try {
      const parsed = parseSWIFTMessage(rawMessage, tenantId);
      return this.processCanonical(parsed, tenantId);
    } catch (error) {
      logger.error('SWIFT Ingestion failed', { error, tenantId });
      throw error;
    }
  }

  static async ingestISO20022(rawMessage: string, tenantId: string) {
    try {
      const parsedArray = parseISO20022(rawMessage, tenantId);
      // For single ingestion endpoints, we take the first transaction if available
      if (parsedArray.length === 0) throw new Error('No transactions found in ISO20022 message');
      return this.processCanonical(parsedArray[0], tenantId);
    } catch (error) {
      logger.error('ISO20022 Ingestion failed', { error, tenantId });
      throw error;
    }
  }

  private static async processCanonical(canonicalData: unknown, tenantId: string) {
    const canonical = canonicalData as Record<string, unknown>;
    // 1. Encrypt PII fields
    const piiFields = ['senderName', 'senderAccount', 'receiverName', 'receiverAccount'];
    const encrypted = EncryptionService.encryptObject(canonical, piiFields, tenantId);

    // 2. Prepare input for TransactionService
    // We store the encrypted PII in an 'identifier' blob if specific fields don't exist in Prisma
    const transactionInput = {
      transactionRef: canonical.originalReference,
      amount: canonical.amount,
      currency: canonical.currency,
      senderCountry: canonical.senderCountry,
      receiverCountry: canonical.receiverCountry,
      accountNumber: canonical.senderAccount, // This is used to link to Account model
      identifier: JSON.stringify({
        senderName: encrypted.senderName,
        senderAccount: encrypted.senderAccount,
        receiverName: encrypted.receiverName,
        receiverAccount: encrypted.receiverAccount,
        messageType: canonical.messageType,
      }),
      senderName: encrypted.senderName, // Transaction model has senderName
    };

    // 3. Create transaction via TransactionService
    return TransactionService.create(transactionInput, tenantId);
  }
}
