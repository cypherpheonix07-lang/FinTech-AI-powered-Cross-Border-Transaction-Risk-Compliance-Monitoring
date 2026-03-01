import { OrchestratorService } from '../orchestrator.service';
import { prisma } from '../../../config/database';
import { AdminService } from '../../admin/admin.service';
import * as fs from 'fs';

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
    (prisma.transaction.findUnique as jest.Mock).mockResolvedValue(mockTransaction);
    (fs.existsSync as jest.Mock).mockReturnValue(true);
  });

  it('should trigger defense and freeze account', async () => {
    await OrchestratorService.triggerDefense('tx-123');

    expect(prisma.transaction.findUnique).toHaveBeenCalledWith({
      where: { id: 'tx-123' },
      include: { account: true, riskResult: true },
    });
    expect(AdminService.freezeAccount).toHaveBeenCalledWith('acc-456');
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should not freeze if accountId is missing', async () => {
    (prisma.transaction.findUnique as jest.Mock).mockResolvedValue({ ...mockTransaction, accountId: null });

    await OrchestratorService.triggerDefense('tx-123');

    expect(AdminService.freezeAccount).not.toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
