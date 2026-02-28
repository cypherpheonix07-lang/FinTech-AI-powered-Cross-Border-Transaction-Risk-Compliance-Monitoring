"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionService = void 0;
const swift_parser_1 = require("../../services/parsers/swift-parser");
const iso20022_parser_1 = require("../../services/parsers/iso20022-parser");
const encryption_service_1 = require("../../services/encryption-service");
const transaction_service_1 = require("../transaction/transaction.service");
const logger_1 = require("../../config/logger");
class IngestionService {
    static async ingestSWIFT(rawMessage, tenantId) {
        try {
            const parsed = (0, swift_parser_1.parseSWIFTMessage)(rawMessage, tenantId);
            return this.processCanonical(parsed, tenantId);
        }
        catch (error) {
            logger_1.logger.error('SWIFT Ingestion failed', { error, tenantId });
            throw error;
        }
    }
    static async ingestISO20022(rawMessage, tenantId) {
        try {
            const parsedArray = (0, iso20022_parser_1.parseISO20022)(rawMessage, tenantId);
            // For single ingestion endpoints, we take the first transaction if available
            if (parsedArray.length === 0)
                throw new Error('No transactions found in ISO20022 message');
            return this.processCanonical(parsedArray[0], tenantId);
        }
        catch (error) {
            logger_1.logger.error('ISO20022 Ingestion failed', { error, tenantId });
            throw error;
        }
    }
    static async processCanonical(canonicalData, tenantId) {
        const canonical = canonicalData;
        // 1. Encrypt PII fields
        const piiFields = ['senderName', 'senderAccount', 'receiverName', 'receiverAccount'];
        const encrypted = encryption_service_1.EncryptionService.encryptObject(canonical, piiFields, tenantId);
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
        return transaction_service_1.TransactionService.create(transactionInput, tenantId);
    }
}
exports.IngestionService = IngestionService;
