import { prisma } from '../../config/database';

export class AuditService {
  static async log(data: Record<string, unknown>) {
    return prisma.auditLog.create({
      data: {
        action: data.action as string,
        entity: data.entity as string,
        entityId: data.entityId as string,
        details: (data.details as any) || {},
        userId: data.userId as string,
        ipAddress: data.ipAddress as string,
      }
    });
  }

  static async getLogs(tenantId?: string) {
    return prisma.auditLog.findMany({
      where: tenantId ? { user: { tenantId } } : {},
      include: { user: { select: { email: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  static async exportLogs() {
    const logs = await prisma.auditLog.findMany({
      include: { user: { select: { email: true } } }
    });
    
    // Simplistic CSV generation for Stage 4
    const header = "Date,User,Action,Entity,Details\n";
    const rows = logs.map(l => 
      `${l.createdAt.toISOString()},${l.user?.email || 'System'},${l.action},${l.entity},"${JSON.stringify(l.details).replace(/"/g, '""')}"`
    ).join("\n");
    
    return header + rows;
  }
}
