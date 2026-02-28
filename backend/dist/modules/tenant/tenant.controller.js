"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantController = void 0;
const tenant_service_1 = require("./tenant.service");
class TenantController {
    static async getAll(req, res) {
        try {
            const tenants = await tenant_service_1.TenantService.getAllTenants();
            res.status(200).json({ success: true, data: tenants });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch tenants' });
        }
    }
    static async getById(req, res) {
        try {
            const tenant = await tenant_service_1.TenantService.getTenantById(req.params.id);
            if (!tenant)
                return res.status(404).json({ success: false, error: 'Tenant not found' });
            res.status(200).json({ success: true, data: tenant });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch tenant' });
        }
    }
}
exports.TenantController = TenantController;
