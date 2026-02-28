import { prisma } from '../../config/database';

export class TenantService {
  static async getAllTenants() {
    return prisma.tenant.findMany();
  }

  static async getTenantById(id: string) {
    return prisma.tenant.findUnique({
      where: { id },
      include: {
        _count: {
          select: { users: true, transactions: true }
        }
      }
    });
  }
}
