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
exports.EncryptionService = void 0;
const crypto = __importStar(require("crypto"));
const logger_1 = require("../config/logger");
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // Standard for GCM
const MASTER_KEY = process.env.ENCRYPTION_MASTER_KEY || 'dev-master-key-must-be-32-bytes-long-!!';
class EncryptionService {
    /**
     * Encrypts a string using a derivation of the master key and a tenant-specific salt
     * Uses AES-256-GCM for authenticated encryption
     */
    static encrypt(text, tenantId) {
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
        }
        catch (error) {
            logger_1.logger.error('Encryption failed', { error, tenantId });
            throw new Error('Encryption operation failed');
        }
    }
    /**
     * Decrypts a string formatted as iv:authTag:encryptedData
     */
    static decrypt(encryptedText, tenantId) {
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
        }
        catch (error) {
            logger_1.logger.error('Decryption failed', { error, tenantId });
            throw new Error('Decryption operation failed. Data may be tampered or key is invalid.');
        }
    }
    /**
     * Helper to encrypt sensitive fields in an object
     */
    static encryptObject(obj, fields, tenantId) {
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
    static decryptObject(obj, fields, tenantId) {
        const result = { ...obj };
        for (const field of fields) {
            if (result[field]) {
                result[field] = this.decrypt(String(result[field]), tenantId);
            }
        }
        return result;
    }
}
exports.EncryptionService = EncryptionService;
