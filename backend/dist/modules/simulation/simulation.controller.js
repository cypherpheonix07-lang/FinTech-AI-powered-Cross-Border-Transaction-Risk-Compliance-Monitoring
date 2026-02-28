"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationController = void 0;
const simulation_service_1 = require("./simulation.service");
class SimulationController {
    static async start(req, res) {
        try {
            const { interval } = req.body;
            await simulation_service_1.SimulationService.start(req.user.tenantId, interval);
            res.status(200).json({ success: true, message: 'Simulation started' });
        }
        catch (error) {
            const msg = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json({ success: false, error: msg });
        }
    }
    static async stop(req, res) {
        try {
            simulation_service_1.SimulationService.stop(req.user.tenantId);
            res.status(200).json({ success: true, message: 'Simulation stopped' });
        }
        catch {
            res.status(500).json({ success: false, error: 'Failed to stop simulation' });
        }
    }
    static async getStatus(req, res) {
        const status = simulation_service_1.SimulationService.getStatus(req.user.tenantId);
        res.status(200).json({ success: true, data: status });
    }
}
exports.SimulationController = SimulationController;
