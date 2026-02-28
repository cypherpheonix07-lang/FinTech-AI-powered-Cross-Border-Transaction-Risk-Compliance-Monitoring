"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
class AdminController {
    static async getOverview(req, res) {
        try {
            const overview = await admin_service_1.AdminService.getOverview();
            res.status(200).json({ success: true, data: overview });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch admin overview' });
        }
    }
    static async listUsers(req, res) {
        try {
            const users = await admin_service_1.AdminService.listUsers();
            res.status(200).json({ success: true, data: users });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch users' });
        }
    }
    static async updateUserRole(req, res) {
        try {
            const { userId, role } = req.body;
            const user = await admin_service_1.AdminService.updateUserRole(userId, role);
            res.json({ success: true, data: user });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to update user role' });
        }
    }
    static async freezeAccount(req, res) {
        try {
            const { accountId } = req.body;
            const account = await admin_service_1.AdminService.freezeAccount(accountId);
            res.json({ success: true, data: account });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to freeze account' });
        }
    }
    static async rotateKeys(req, res) {
        try {
            const { tenantId } = req.body;
            const result = await admin_service_1.AdminService.rotateKeys(tenantId);
            res.json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to rotate keys' });
        }
    }
}
exports.AdminController = AdminController;
