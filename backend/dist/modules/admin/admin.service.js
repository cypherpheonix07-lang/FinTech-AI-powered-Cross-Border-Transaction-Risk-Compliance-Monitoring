"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const database_1 = require("../../config/database");
const redis_1 = require("../../config/redis");
class AdminService {
    static async getOverview() {
        const [userCount, tenantCount, transactionCount, flaggedCount] = await Promise.all([
            database_1.prisma.user.count(),
            database_1.prisma.tenant.count(),
            database_1.prisma.transaction.count(),
            database_1.prisma.transaction.count({ where: { status: 'FLAGGED' } }),
        ]);
        return {
            stats: {
                users: userCount,
                tenants: tenantCount,
                transactions: transactionCount,
                flagged: flaggedCount,
            },
            system: {
                redis: redis_1.redis.status,
                database: 'connected',
                uptime: process.uptime(),
            }
        };
    }
    static async listUsers() {
        return database_1.prisma.user.findMany({
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
    static async updateUserRole(userId, role) {
        return database_1.prisma.user.update({
            where: { id: userId },
            data: { role }
        });
    }
    static async freezeAccount(accountId) {
        return database_1.prisma.account.update({
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
    static async rotateKeys(tenantId) {
        // Simulation: In a real system, this would interact with a KMS
        // and update the EncryptionService state.
        const rotationId = `ROT-${Date.now()}`;
        await database_1.prisma.tenant.update({
            where: { id: tenantId },
            data: {
                updatedAt: new Date()
            }
        });
        return { success: true, rotationId, rotatedAt: new Date().toISOString() };
    }
}
exports.AdminService = AdminService;
