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
const orchestrator_service_1 = require("../orchestrator.service");
const database_1 = require("../../../config/database");
const admin_service_1 = require("../../admin/admin.service");
const fs = __importStar(require("fs"));
jest.mock('../../../config/env', () => ({
    env: {
        PORT: '5000',
        NODE_ENV: 'test',
        DATABASE_URL: 'postgresql://test',
        JWT_ACCESS_SECRET: 'test',
        JWT_REFRESH_SECRET: 'test',
        ML_SERVICE_URL: 'http://ml:8000',
        FRONTEND_URL: 'http://fe:3000',
    }
}));
jest.mock('../../../config/database', () => ({
    prisma: {
        transaction: {
            findUnique: jest.fn(),
        },
    },
}));
jest.mock('../../admin/admin.service');
jest.mock('fs');
jest.mock('../../../config/logger');
describe('OrchestratorService', () => {
    const mockTransaction = {
        id: 'tx-123',
        transactionRef: 'REF-123',
        accountId: 'acc-456',
        account: { accountNumber: '123456' },
        riskResult: [{ riskLevel: 'CRITICAL' }],
    };
    beforeEach(() => {
        jest.clearAllMocks();
        database_1.prisma.transaction.findUnique.mockResolvedValue(mockTransaction);
        fs.existsSync.mockReturnValue(true);
    });
    it('should trigger defense and freeze account', async () => {
        await orchestrator_service_1.OrchestratorService.triggerDefense('tx-123');
        expect(database_1.prisma.transaction.findUnique).toHaveBeenCalledWith({
            where: { id: 'tx-123' },
            include: { account: true, riskResult: true },
        });
        expect(admin_service_1.AdminService.freezeAccount).toHaveBeenCalledWith('acc-456');
        expect(fs.writeFileSync).toHaveBeenCalled();
    });
    it('should not freeze if accountId is missing', async () => {
        database_1.prisma.transaction.findUnique.mockResolvedValue({ ...mockTransaction, accountId: null });
        await orchestrator_service_1.OrchestratorService.triggerDefense('tx-123');
        expect(admin_service_1.AdminService.freezeAccount).not.toHaveBeenCalled();
        expect(fs.writeFileSync).toHaveBeenCalled();
    });
});
