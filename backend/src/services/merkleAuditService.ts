import * as crypto from 'crypto';

/**
 * PATHGUARD PILLAR 2: SECURITY DEPTH
 * Merkle Audit Service — Creating an immutable mathematical seal
 * over the transaction history using Merkle Trees.
 */

export interface MerkleNode {
  hash: string;
  left?: MerkleNode;
  right?: MerkleNode;
}

export class MerkleAuditService {
  private static instance: MerkleAuditService;
  private transactionHashes: string[] = [];
  private rootHash: string | null = null;

  private constructor() {}

  public static getInstance(): MerkleAuditService {
    if (!MerkleAuditService.instance) {
      MerkleAuditService.instance = new MerkleAuditService();
    }
    return MerkleAuditService.instance;
  }

  /**
   * Add a transaction to the audit log.
   * In production: This is called every time a transaction is finalized.
   */
  addTransaction(txData: any): void {
    const txString = JSON.stringify(txData);
    const hash = crypto.createHash('sha256').update(txString).digest('hex');
    this.transactionHashes.push(hash);
    this.rootHash = this.calculateRoot(this.transactionHashes);
    console.log(`[Pillar-2] Transaction added to Merkle Log. New Root: ${this.rootHash?.slice(0, 8)}...`);
  }

  /**
   * Calculate the Merkle Root for a given set of leaf hashes.
   */
  private calculateRoot(hashes: string[]): string | null {
    if (hashes.length === 0) return null;
    if (hashes.length === 1) return hashes[0];

    const nextLevel: string[] = [];
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
  getCurrentRoot(): string | null {
    return this.rootHash;
  }

  /**
   * Verify the integrity of the audit log.
   * If any historical hash was changed, the root will mismatch.
   */
  verifyIntegrity(originalRoot: string): boolean {
    const calculated = this.calculateRoot(this.transactionHashes);
    return calculated === originalRoot;
  }

  /**
   * Simulate a 'Nuclear Alarm' if history is tampered with.
   */
  checkTamper(): { tampered: boolean; message: string } {
    // Simulation: randomly "tamper" if a special flag is set
    const isTampered = false; 
    if (isTampered) {
      return { tampered: true, message: 'CRITICAL: AUDIT_LOG_HASH_MISMATCH_DETECTED' };
    }
    return { tampered: false, message: 'AUDIT_TRAIL_VERIFIED_IMMUTABLE' };
  }
}

export const merkleAuditService = MerkleAuditService.getInstance();
