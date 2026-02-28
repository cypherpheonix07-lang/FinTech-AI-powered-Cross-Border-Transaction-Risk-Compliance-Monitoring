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
exports.OrchestratorService = void 0;
const database_1 = require("../../config/database");
const logger_1 = require("../../config/logger");
const admin_service_1 = require("../admin/admin.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class OrchestratorService {
    static forensicDir = path.join(process.cwd(), 'forensics');
    static async triggerDefense(transactionId) {
        try {
            logger_1.logger.warn(`Autonomous Defense Triggered for Transaction: ${transactionId}`);
            // 1. Fetch transaction details with relations
            const transaction = await database_1.prisma.transaction.findUnique({
                where: { id: transactionId },
                include: {
                    account: true,
                    riskResult: true,
                },
            });
            if (!transaction) {
                logger_1.logger.error(`Transaction ${transactionId} not found for defense trigger`);
                return;
            }
            // 2. Automate account freeze
            if (transaction.accountId) {
                await admin_service_1.AdminService.freezeAccount(transaction.accountId);
                logger_1.logger.info(`Account ${transaction.accountId} automatically frozen due to critical fraud risk`);
            }
            // 3. Generate Forensic Snapshot
            await this.generateSnapshot(transaction);
            return {
                action: 'ACCOUNT_FROZEN',
                snapshotGenerated: true,
            };
        }
        catch (error) {
            logger_1.logger.error('Orchestrator defense trigger failed', { error, transactionId });
            throw error;
        }
    }
    static async generateSnapshot(transaction) {
        if (!fs.existsSync(this.forensicDir)) {
            fs.mkdirSync(this.forensicDir, { recursive: true });
        }
        const snapshot = {
            timestamp: new Date().toISOString(),
            transactionId: transaction.id,
            transactionRef: transaction.transactionRef,
            accountNumber: transaction.account?.accountNumber,
            riskHistory: transaction.riskResults,
            rawIdentifier: transaction.identifier,
            securityStatus: 'CRITICAL_DEFENSE_TRIGGERED',
        };
        const fileName = `snapshot_${transaction.id}_${Date.now()}.json`;
        const filePath = path.join(this.forensicDir, fileName);
        fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2));
        logger_1.logger.info(`Forensic snapshot saved to ${filePath}`);
    }
}
exports.OrchestratorService = OrchestratorService;
