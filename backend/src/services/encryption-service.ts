import * as crypto from 'crypto';
import { logger } from '../config/logger';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // Standard for GCM
const MASTER_KEY = process.env.ENCRYPTION_MASTER_KEY || 'dev-master-key-must-be-32-bytes-long-!!';

export class EncryptionService {
  /**
   * Encrypts a string using a derivation of the master key and a tenant-specific salt
   * Uses AES-256-GCM for authenticated encryption
   */
  static encrypt(text: string, tenantId: string): string {
    try {
      const iv = crypto.randomBytes(IV_LENGTH);
      // Derive a tenant-specific key from the master key
      const key = crypto.scryptSync(MASTER_KEY, tenantId, 32);
      
      const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
      
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const authTag = cipher.getAuthTag().toString('hex');
      
      // Format: iv:authTag:encryptedData
      return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    } catch (error) {
      logger.error('Encryption failed', { error, tenantId });
      throw new Error('Encryption operation failed');
    }
  }

  /**
   * Decrypts a string formatted as iv:authTag:encryptedData
   */
  static decrypt(encryptedText: string, tenantId: string): string {
    try {
      const [ivHex, authTagHex, dataHex] = encryptedText.split(':');
      if (!ivHex || !authTagHex || !dataHex) {
        throw new Error('Invalid encrypted format');
      }

      const iv = Buffer.from(ivHex, 'hex');
      const authTag = Buffer.from(authTagHex, 'hex');
      const key = crypto.scryptSync(MASTER_KEY, tenantId, 32);
      
      const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
      decipher.setAuthTag(authTag);
      
      let decrypted = decipher.update(dataHex, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      logger.error('Decryption failed', { error, tenantId });
      throw new Error('Decryption operation failed. Data may be tampered or key is invalid.');
    }
  }

  /**
   * Helper to encrypt sensitive fields in an object
   */
  static encryptObject(obj: Record<string, unknown>, fields: string[], tenantId: string): Record<string, unknown> {
    const result = { ...obj };
    for (const field of fields) {
      if (result[field]) {
        result[field] = this.encrypt(String(result[field]), tenantId);
      }
    }
    return result;
  }

  /**
   * Helper to decrypt sensitive fields in an object
   */
  static decryptObject(obj: Record<string, unknown>, fields: string[], tenantId: string): Record<string, unknown> {
    const result = { ...obj };
    for (const field of fields) {
      if (result[field]) {
        result[field] = this.decrypt(String(result[field]), tenantId);
      }
    }
    return result;
  }
}
