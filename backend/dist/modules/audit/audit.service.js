"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const database_1 = require("../../config/database");
class AuditService {
    static async log(data) {
        return database_1.prisma.auditLog.create({
            data: {
                action: data.action,
                entity: data.entity,
                entityId: data.entityId,
                details: data.details || {},
                userId: data.userId,
                ipAddress: data.ipAddress,
            }
        });
    }
    static async getLogs(tenantId) {
        return database_1.prisma.auditLog.findMany({
            where: tenantId ? { user: { tenantId } } : {},
            include: { user: { select: { email: true } } },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
    }
    static async exportLogs() {
        const logs = await database_1.prisma.auditLog.findMany({
            include: { user: { select: { email: true } } }
        });
        // Simplistic CSV generation for Stage 4
        const header = "Date,User,Action,Entity,Details\n";
        const rows = logs.map(l => `${l.createdAt.toISOString()},${l.user?.email || 'System'},${l.action},${l.entity},"${JSON.stringify(l.details).replace(/"/g, '""')}"`).join("\n");
        return header + rows;
    }
}
exports.AuditService = AuditService;
