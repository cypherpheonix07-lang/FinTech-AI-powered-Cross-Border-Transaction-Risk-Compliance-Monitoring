"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscalationService = void 0;
// backend/src/modules/escalation/escalation.service.ts
const database_1 = require("../../config/database");
const logger_1 = require("../../config/logger");
class EscalationService {
    static async list(params) {
        const { tenantId, status, priority, page, limit } = params;
        const where = { tenantId };
        if (status)
            where.status = status;
        if (priority)
            where.priority = priority;
        const [escalations, total] = await Promise.all([
            database_1.prisma.escalation.findMany({
                where,
                include: {
                    transaction: true,
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            database_1.prisma.escalation.count({ where }),
        ]);
        return {
            escalations,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    static async getById(id, tenantId) {
        return database_1.prisma.escalation.findFirst({
            where: { id, tenantId },
            include: {
                transaction: true,
            },
        });
    }
    static async resolve(id, resolvedBy, resolution, notes) {
        const escalation = await database_1.prisma.escalation.update({
            where: { id },
            data: {
                status: resolution === 'APPROVE' ? 'RESOLVED' : 'REJECTED',
                resolution,
                resolvedBy,
                resolvedAt: new Date(),
                notes,
            },
        });
        // Update transaction status based on resolution
        if (escalation.transactionId) {
            await database_1.prisma.transaction.update({
                where: { id: escalation.transactionId },
                data: {
                    status: resolution === 'APPROVE' ? 'APPROVED' : 'BLOCKED',
                },
            });
        }
        logger_1.logger.info(`Escalation ${id} resolved: ${resolution} by ${resolvedBy}`);
        return escalation;
    }
    static async assign(id, assigneeId) {
        return database_1.prisma.escalation.update({
            where: { id },
            data: {
                assignedToId: assigneeId,
                status: 'IN_REVIEW',
            },
        });
    }
    static async getStats(tenantId) {
        const [pending, inReview, resolved, rejected] = await Promise.all([
            database_1.prisma.escalation.count({ where: { tenantId, status: 'PENDING' } }),
            database_1.prisma.escalation.count({ where: { tenantId, status: 'IN_REVIEW' } }),
            database_1.prisma.escalation.count({ where: { tenantId, status: 'RESOLVED' } }),
            database_1.prisma.escalation.count({ where: { tenantId, status: 'REJECTED' } }),
        ]);
        const criticalPending = await database_1.prisma.escalation.count({
            where: { tenantId, status: 'PENDING', priority: 'CRITICAL' },
        });
        return {
            pending,
            inReview,
            resolved,
            rejected,
            total: pending + inReview + resolved + rejected,
            criticalPending,
        };
    }
}
exports.EscalationService = EscalationService;
