"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3BridgeController = void 0;
const crossChainService_1 = require("../../services/crossChainService");
const identityService_1 = require("../../services/identityService");
class Web3BridgeController {
    static async getCrossChainTransfers(req, res, next) {
        try {
            const transfers = await crossChainService_1.crossChainService.getRecentTransfers();
            res.status(200).json({ success: true, data: transfers });
        }
        catch (error) {
            next(error);
        }
    }
    static async getBridgeHealth(req, res, next) {
        try {
            const health = await crossChainService_1.crossChainService.monitorBridgeHealth();
            res.status(200).json({ success: true, data: health });
        }
        catch (error) {
            next(error);
        }
    }
    static async getCredentials(req, res, next) {
        try {
            const { did } = req.params;
            const credentials = await identityService_1.identityService.getCredentials(did);
            res.status(200).json({ success: true, data: credentials });
        }
        catch (error) {
            next(error);
        }
    }
    static async generateProof(req, res, next) {
        try {
            const { credentialId, attribute } = req.body;
            const proof = await identityService_1.identityService.generateZKProof(credentialId, attribute);
            res.status(200).json({ success: true, data: { proof } });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.Web3BridgeController = Web3BridgeController;
