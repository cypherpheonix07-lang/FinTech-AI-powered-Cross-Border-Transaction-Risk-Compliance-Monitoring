"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const transaction_service_1 = require("./transaction.service");
class TransactionController {
    static async create(req, res) {
        try {
            const transaction = await transaction_service_1.TransactionService.create(req.body, req.user.tenantId);
            res.status(201).json({ success: true, data: transaction });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to process transaction' });
        }
    }
    static async list(req, res) {
        try {
            const filters = req.query; // Expand with zod validation
            const transactions = await transaction_service_1.TransactionService.list(req.user.tenantId, filters);
            res.status(200).json({ success: true, data: transactions });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch transactions' });
        }
    }
    static async getById(req, res) {
        try {
            const transaction = await transaction_service_1.TransactionService.getById(req.params.id, req.user.tenantId);
            if (!transaction)
                return res.status(404).json({ success: false, error: 'Transaction not found' });
            res.status(200).json({ success: true, data: transaction });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to fetch transaction' });
        }
    }
}
exports.TransactionController = TransactionController;
