"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationService = void 0;
const transaction_service_1 = require("../transaction/transaction.service");
const logger_1 = require("../../config/logger");
class SimulationService {
    static activeSimulations = new Map();
    static async start(tenantId, intervalMs = 5000) {
        if (this.activeSimulations.has(tenantId)) {
            throw new Error('Simulation already running for this tenant');
        }
        logger_1.logger.info(`STARTING SIMULATION for tenant: ${tenantId}`);
        const interval = setInterval(async () => {
            try {
                const isHighRisk = Math.random() > 0.8;
                const amount = Math.floor(Math.random() * 5000) + 100;
                const mockData = {
                    amount,
                    currency: 'USD',
                    senderName: 'Simulated Sender',
                    receiverName: 'Simulated Receiver',
                    senderCountry: 'USA',
                    receiverCountry: isHighRisk ? 'HighRiskRegion' : 'SafeRegion',
                };
                await transaction_service_1.TransactionService.create(mockData, tenantId);
            }
            catch (error) {
                logger_1.logger.error('Simulation step failed:', error);
            }
        }, intervalMs);
        this.activeSimulations.set(tenantId, interval);
    }
    static stop(tenantId) {
        const interval = this.activeSimulations.get(tenantId);
        if (interval) {
            clearInterval(interval);
            this.activeSimulations.delete(tenantId);
            logger_1.logger.info(`STOPPED SIMULATION for tenant: ${tenantId}`);
        }
    }
    static getStatus(tenantId) {
        return {
            running: this.activeSimulations.has(tenantId),
        };
    }
}
exports.SimulationService = SimulationService;
