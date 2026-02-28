"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantService = void 0;
const database_1 = require("../../config/database");
class TenantService {
    static async getAllTenants() {
        return database_1.prisma.tenant.findMany();
    }
    static async getTenantById(id) {
        return database_1.prisma.tenant.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { users: true, transactions: true }
                }
            }
        });
    }
}
exports.TenantService = TenantService;
