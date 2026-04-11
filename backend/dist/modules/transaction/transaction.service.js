"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const database_1 = require("../../config/database");
const fraud_ml_client_1 = require("../../integrations/fraud-ml.client");
const decision_engine_1 = require("../../services/decision-engine");
const server_1 = require("../../server");
// backend/src/modules/transaction/transaction.service.ts
class TransactionService {
    static async create(input, tenantId) {
        // 1. Ensure Account exists (Production-ready Account tracking)
        let account = await database_1.prisma.account.findFirst({
            where: { accountNumber: input.accountNumber, tenantId },
        });
        if (!account) {
            account = await database_1.prisma.account.create({
                data: {
                    accountNumber: input.accountNumber,
                    tenantId,
                },
            });
        }
        // 2. Store initial transaction
        const transaction = await database_1.prisma.transaction.create({
            data: {
                transactionRef: input.transactionRef || `TX-${Date.now()}`,
                amount: input.amount,
                currency: input.currency || 'USD',
                senderCountry: input.senderCountry,
                receiverCountry: input.receiverCountry,
                identifier: input.identifier,
                status: 'PENDING',
                tenantId,
                accountId: account.id,
            },
        });
        // 3. Call ML service
        const fraudResult = await fraud_ml_client_1.FraudMLClient.checkTransaction({
            amount: transaction.amount,
            currency: transaction.currency,
            sender_country: transaction.senderCountry,
            receiver_country: transaction.receiverCountry,
            identifier: transaction.identifier,
        });
        // 4. Persistence: Risk Score
        const riskResult = await database_1.prisma.riskResult.create({
            data: {
                transactionId: transaction.id,
                anomalyScore: fraudResult?.anomaly_score || 0,
                supervisedProb: fraudResult?.supervised_prob || 0,
                graphFlag: fraudResult?.graph_flag || false,
                finalRiskScore: fraudResult?.final_risk_score || 0,
                riskLevel: fraudResult?.risk_level || 'LOW',
                explanation: fraudResult?.explanation || {},
                modelVersionId: input.modelVersionId || 'v-baseline-1.0', // Default fallback
            },
        });
        // 5. Decision Engine
        const decision = await decision_engine_1.DecisionEngine.evaluate(riskResult, tenantId);
        // 6. Update Transaction Status / Create Escalation
        const updatedStatus = decision.decision === decision_engine_1.RiskDecision.BLOCK ? 'BLOCKED' :
            decision.decision === decision_engine_1.RiskDecision.FLAG ? 'FLAGGED' : 'APPROVED';
        // Simulation: Generate Post-Quantum Signature for the approved/flagged transaction
        let pqcSignature = null;
        if (updatedStatus !== 'BLOCKED') {
            const { quantumService } = await Promise.resolve().then(() => __importStar(require('../../services/quantumService')));
            pqcSignature = quantumService.simulateDilithiumSignature(JSON.stringify({
                id: transaction.id,
                amount: transaction.amount,
                sender: transaction.identifier
            }));
        }
        const updated = await database_1.prisma.transaction.update({
            where: { id: transaction.id },
            data: { status: updatedStatus },
            include: { riskResult: true },
        });
        // 7. Emit WebSocket events
        server_1.io.emit('transaction-created', { ...updated, pqcSignature });
        if (updated.status !== 'APPROVED') {
            server_1.io.emit('risk-alert', {
                type: updated.status,
                transactionId: updated.id,
                riskScore: riskResult.finalRiskScore,
                tenantId,
            });
        }
        return { ...updated, pqcSignature };
    }
    static async list(tenantId, filters = {}) {
        return database_1.prisma.transaction.findMany({
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
    static async getById(id, tenantId) {
        return database_1.prisma.transaction.findFirst({
            where: { id, tenantId },
            include: {
                riskResult: true,
                account: true,
                escalation: true,
            },
        });
    }
}
exports.TransactionService = TransactionService;
