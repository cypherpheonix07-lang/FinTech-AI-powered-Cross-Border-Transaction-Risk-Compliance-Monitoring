"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.institutionalTreasuryService = exports.InstitutionalTreasuryService = void 0;
const governanceService_1 = require("./governanceService");
class InstitutionalTreasuryService {
    static instance;
    pendingTransactions = new Map();
    constructor() { }
    static getInstance() {
        if (!InstitutionalTreasuryService.instance) {
            InstitutionalTreasuryService.instance = new InstitutionalTreasuryService();
        }
        return InstitutionalTreasuryService.instance;
    }
    /**
     * Initiate a new institutional transaction requiring multi-sig.
     */
    async initiateTransaction(userId, amount, recipient) {
        if (!governanceService_1.governanceService.canPerformAction(userId, 'INITIATE_TRANSFER')) {
            return 'ERROR: USER_NOT_AUTHORIZED_TO_INITIATE';
        }
        const txId = `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        // Policy logic: Large amounts require higher quorum or challenges
        let requiredSigs = 2; // Default 2-of-3
        let challenge;
        if (amount >= 500000) {
            challenge = "Provide a detailed explanation of the purpose of this transaction, including all related legal and regulatory compliance requirements.";
        }
        const newTx = {
            id: txId,
            amount,
            currency: 'USD',
            recipient,
            initiatorId: userId,
            requiredSigs,
            currentSigs: [this.createShard(userId)], // First signature from initiator
            status: 'PENDING_QUORUM',
            institutionalChallenge: challenge
        };
        this.pendingTransactions.set(txId, newTx);
        console.log(`[Pillar-5] MPC Vault: Transaction ${txId} initiated. Awaiting quorum (1/${requiredSigs}).`);
        return newTx;
    }
    /**
     * Add a signature shard to a pending transaction.
     */
    async approveTransaction(txId, signerId, justification) {
        const tx = this.pendingTransactions.get(txId);
        if (!tx)
            return 'ERROR: TRANSACTION_NOT_FOUND';
        if (!governanceService_1.governanceService.canPerformAction(signerId, 'APPROVE_TRANSFER')) {
            return 'ERROR: USER_NOT_AUTHORIZED_TO_APPROVE';
        }
        // Check if user already signed
        if (tx.currentSigs.find(s => s.signerId === signerId)) {
            return 'ERROR: USER_ALREADY_SIGNED';
        }
        // If there's an institutional challenge, justification is REQUIRED
        if (tx.institutionalChallenge && !justification) {
            return `ERROR: INSTITUTIONAL_CHALLENGE_REQUIRED: ${tx.institutionalChallenge}`;
        }
        const shard = this.createShard(signerId, justification);
        tx.currentSigs.push(shard);
        if (tx.currentSigs.length >= tx.requiredSigs) {
            tx.status = 'EXECUTING';
            console.log(`[Pillar-5] MPC Vault: Quorum reached for ${txId}. Status -> EXECUTING.`);
            // Finalize logic would call atomicSettlementService here
        }
        else {
            console.log(`[Pillar-5] MPC Vault: Signature added to ${txId} (${tx.currentSigs.length}/${tx.requiredSigs}).`);
        }
        return 'SUCCESS: SIGNATURE_COLLECTED';
    }
    createShard(signerId, justification) {
        return {
            signerId,
            role: governanceService_1.governanceService.getUserRole(signerId) || governanceService_1.InstitutionalRole.VIEWER,
            timestamp: new Date().toISOString(),
            justification,
            signature: `SIG_SHARD_${Math.random().toString(36).substr(2, 10)}`
        };
    }
    getTransaction(txId) {
        return this.pendingTransactions.get(txId);
    }
}
exports.InstitutionalTreasuryService = InstitutionalTreasuryService;
exports.institutionalTreasuryService = InstitutionalTreasuryService.getInstance();
