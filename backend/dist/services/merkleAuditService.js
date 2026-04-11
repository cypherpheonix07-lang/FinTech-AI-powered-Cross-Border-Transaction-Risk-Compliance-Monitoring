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
exports.merkleAuditService = exports.MerkleAuditService = void 0;
const crypto = __importStar(require("crypto"));
class MerkleAuditService {
    static instance;
    transactionHashes = [];
    rootHash = null;
    constructor() { }
    static getInstance() {
        if (!MerkleAuditService.instance) {
            MerkleAuditService.instance = new MerkleAuditService();
        }
        return MerkleAuditService.instance;
    }
    /**
     * Add a transaction to the audit log.
     * In production: This is called every time a transaction is finalized.
     */
    addTransaction(txData) {
        const txString = JSON.stringify(txData);
        const hash = crypto.createHash('sha256').update(txString).digest('hex');
        this.transactionHashes.push(hash);
        this.rootHash = this.calculateRoot(this.transactionHashes);
        console.log(`[Pillar-2] Transaction added to Merkle Log. New Root: ${this.rootHash?.slice(0, 8)}...`);
    }
    /**
     * Calculate the Merkle Root for a given set of leaf hashes.
     */
    calculateRoot(hashes) {
        if (hashes.length === 0)
            return null;
        if (hashes.length === 1)
            return hashes[0];
        const nextLevel = [];
        for (let i = 0; i < hashes.length; i += 2) {
            const left = hashes[i];
            const right = i + 1 < hashes.length ? hashes[i + 1] : left; // Duplicate last if odd
            const combined = crypto.createHash('sha256').update(left + right).digest('hex');
            nextLevel.push(combined);
        }
        return this.calculateRoot(nextLevel);
    }
    /**
     * Get the current Root Hash (The mathematical seal of the history).
     */
    getCurrentRoot() {
        return this.rootHash;
    }
    /**
     * Verify the integrity of the audit log.
     * If any historical hash was changed, the root will mismatch.
     */
    verifyIntegrity(originalRoot) {
        const calculated = this.calculateRoot(this.transactionHashes);
        return calculated === originalRoot;
    }
    /**
     * Simulate a 'Nuclear Alarm' if history is tampered with.
     */
    checkTamper() {
        // Simulation: randomly "tamper" if a special flag is set
        const isTampered = false;
        if (isTampered) {
            return { tampered: true, message: 'CRITICAL: AUDIT_LOG_HASH_MISMATCH_DETECTED' };
        }
        return { tampered: false, message: 'AUDIT_TRAIL_VERIFIED_IMMUTABLE' };
    }
}
exports.MerkleAuditService = MerkleAuditService;
exports.merkleAuditService = MerkleAuditService.getInstance();
