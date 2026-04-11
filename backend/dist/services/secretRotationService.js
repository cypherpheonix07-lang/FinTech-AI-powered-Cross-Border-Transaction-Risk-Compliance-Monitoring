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
exports.secretRotationService = exports.SecretRotationService = void 0;
const crypto = __importStar(require("crypto"));
class SecretRotationService {
    static instance;
    keyVault = new Map();
    rotationIntervalMs = 24 * 60 * 60 * 1000; // 24 Hours
    constructor() {
        this.initializeBaseKeys();
    }
    static getInstance() {
        if (!SecretRotationService.instance) {
            SecretRotationService.instance = new SecretRotationService();
        }
        return SecretRotationService.instance;
    }
    /**
     * Initialize core system keys.
     */
    initializeBaseKeys() {
        this.rotateKey('SYSTEM_ENCRYPTION_KEY');
        this.rotateKey('BANK_API_SECRET');
    }
    /**
     * Rotate a specific key, archiving the old version.
     * In production: This interacts with a Cloud KMS or Physical HSM.
     */
    rotateKey(keyId) {
        const newValue = crypto.randomBytes(32).toString('hex');
        const version = (this.keyVault.get(keyId)?.length || 0) + 1;
        const newKey = {
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
    getActiveSecret(keyId) {
        const history = this.keyVault.get(keyId);
        if (!history || history.length === 0)
            return undefined;
        return history[history.length - 1];
    }
    /**
     * Get a specific historical version of a secret (for decrypting older data).
     */
    getSecretByVersion(keyId, version) {
        return this.keyVault.get(keyId)?.find(k => k.version === version);
    }
    /**
     * Check for due rotations and execute them.
     */
    auditRotationStatus() {
        const alerts = [];
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
exports.SecretRotationService = SecretRotationService;
exports.secretRotationService = SecretRotationService.getInstance();
