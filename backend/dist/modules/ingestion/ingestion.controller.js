"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionController = void 0;
const ingestion_service_1 = require("./ingestion.service");
class IngestionController {
    static async ingestSWIFT(req, res) {
        try {
            const { rawMessage } = req.body;
            if (!rawMessage) {
                return res.status(400).json({ success: false, error: 'rawMessage is required' });
            }
            const result = await ingestion_service_1.IngestionService.ingestSWIFT(rawMessage, req.user.tenantId);
            res.status(201).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to ingest SWIFT message' });
        }
    }
    static async ingestISO20022(req, res) {
        try {
            const { rawMessage } = req.body;
            if (!rawMessage) {
                return res.status(400).json({ success: false, error: 'rawMessage is required' });
            }
            const result = await ingestion_service_1.IngestionService.ingestISO20022(rawMessage, req.user.tenantId);
            res.status(201).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to ingest ISO20022 message' });
        }
    }
}
exports.IngestionController = IngestionController;
