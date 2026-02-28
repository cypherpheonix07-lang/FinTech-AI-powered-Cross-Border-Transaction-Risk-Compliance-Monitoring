import { prisma } from '../../config/database';
import { redis } from '../../config/redis';

export class AdminService {
  static async getOverview() {
    const [userCount, tenantCount, transactionCount, flaggedCount] = await Promise.all([
      prisma.user.count(),
      prisma.tenant.count(),
      prisma.transaction.count(),
      prisma.transaction.count({ where: { status: 'FLAGGED' } }),
    ]);

    return {
      stats: {
        users: userCount,
        tenants: tenantCount,
        transactions: transactionCount,
        flagged: flaggedCount,
      },
      system: {
        redis: redis.status,
        database: 'connected',
        uptime: process.uptime(),
      }
    };
  }

  static async listUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        tenant: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  static async updateUserRole(userId: string, role: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { role }
    });
  }

  static async freezeAccount(accountId: string) {
    return prisma.account.update({
      where: { id: accountId },
      data: { 
        status: 'FROZEN',
        metadata: {
          frozenAt: new Date().toISOString(),
          reason: 'Autonomous Defense Trigger'
        }
      }
    });
  }

  static async rotateKeys(tenantId: string) {
    // Simulation: In a real system, this would interact with a KMS
    // and update the EncryptionService state.
    const rotationId = `ROT-${Date.now()}`;
    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        updatedAt: new Date()
      }
    });
    return { success: true, rotationId, rotatedAt: new Date().toISOString() };
  }
}
