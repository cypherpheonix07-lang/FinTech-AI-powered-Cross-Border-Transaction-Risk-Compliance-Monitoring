import * as crypto from 'crypto';

/**
 * PATHGUARD PILLAR 2: SECURITY DEPTH
 * Secret Rotation Service — Automated, HSM-backed rotation of
 * encryption keys and API secrets.
 */

export interface KeySecret {
  id: string;
  value: string;
  version: number;
  createdAt: string;
  expiresAt: string;
}

export class SecretRotationService {
  private static instance: SecretRotationService;
  private keyVault: Map<string, KeySecret[]> = new Map();
  private rotationIntervalMs: number = 24 * 60 * 60 * 1000; // 24 Hours

  private constructor() {
    this.initializeBaseKeys();
  }

  public static getInstance(): SecretRotationService {
    if (!SecretRotationService.instance) {
      SecretRotationService.instance = new SecretRotationService();
    }
    return SecretRotationService.instance;
  }

  /**
   * Initialize core system keys.
   */
  private initializeBaseKeys(): void {
    this.rotateKey('SYSTEM_ENCRYPTION_KEY');
    this.rotateKey('BANK_API_SECRET');
  }

  /**
   * Rotate a specific key, archiving the old version.
   * In production: This interacts with a Cloud KMS or Physical HSM.
   */
  rotateKey(keyId: string): KeySecret {
    const newValue = crypto.randomBytes(32).toString('hex');
    const version = (this.keyVault.get(keyId)?.length || 0) + 1;
    
    const newKey: KeySecret = {
      id: keyId,
      value: newValue,
      version,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + this.rotationIntervalMs).toISOString(),
    };

    const history = this.keyVault.get(keyId) || [];
    history.push(newKey);
    this.keyVault.set(keyId, history);

    console.log(`[Pillar-2] Secret Rotated: ${keyId} (v${version}). Next rotation: ${newKey.expiresAt}`);
    return newKey;
  }

  /**
   * Get the current active version of a secret.
   */
  getActiveSecret(keyId: string): KeySecret | undefined {
    const history = this.keyVault.get(keyId);
    if (!history || history.length === 0) return undefined;
    return history[history.length - 1];
  }

  /**
   * Get a specific historical version of a secret (for decrypting older data).
   */
  getSecretByVersion(keyId: string, version: number): KeySecret | undefined {
    return this.keyVault.get(keyId)?.find(k => k.version === version);
  }

  /**
   * Check for due rotations and execute them.
   */
  auditRotationStatus(): string[] {
    const alerts: string[] = [];
    this.keyVault.forEach((history, id) => {
      const active = history[history.length - 1];
      if (new Date(active.expiresAt).getTime() < Date.now()) {
        alerts.push(`EXPIRED_SECRET_DETECTED: ${id}`);
        this.rotateKey(id);
      }
    });
    return alerts;
  }
}

export const secretRotationService = SecretRotationService.getInstance();
