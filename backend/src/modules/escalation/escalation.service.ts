// backend/src/modules/escalation/escalation.service.ts
import { prisma } from '../../config/database';
import { logger } from '../../config/logger';

interface ListParams {
  tenantId: string;
  status?: string;
  priority?: string;
  page: number;
  limit: number;
}

export class EscalationService {
  static async list(params: ListParams) {
    const { tenantId, status, priority, page, limit } = params;
    const where: Record<string, unknown> = { tenantId };
    if (status) where.status = status;
    if (priority) where.priority = priority;

    const [escalations, total] = await Promise.all([
      prisma.escalation.findMany({
        where,
        include: {
          transaction: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.escalation.count({ where }),
    ]);

    return {
      escalations,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getById(id: string, tenantId: string) {
    return prisma.escalation.findFirst({
      where: { id, tenantId },
      include: {
        transaction: true,
      },
    });
  }

  static async resolve(id: string, resolvedBy: string, resolution: string, notes?: string) {
    const escalation = await prisma.escalation.update({
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
      await prisma.transaction.update({
        where: { id: escalation.transactionId },
        data: {
          status: resolution === 'APPROVE' ? 'APPROVED' : 'BLOCKED',
        },
      });
    }

    logger.info(`Escalation ${id} resolved: ${resolution} by ${resolvedBy}`);
    return escalation;
  }

  static async assign(id: string, assigneeId: string) {
    return prisma.escalation.update({
      where: { id },
      data: {
        assignedToId: assigneeId,
        status: 'IN_REVIEW',
      },
    });
  }

  static async getStats(tenantId: string) {
    const [pending, inReview, resolved, rejected] = await Promise.all([
      prisma.escalation.count({ where: { tenantId, status: 'PENDING' } }),
      prisma.escalation.count({ where: { tenantId, status: 'IN_REVIEW' } }),
      prisma.escalation.count({ where: { tenantId, status: 'RESOLVED' } }),
      prisma.escalation.count({ where: { tenantId, status: 'REJECTED' } }),
    ]);

    const criticalPending = await prisma.escalation.count({
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
