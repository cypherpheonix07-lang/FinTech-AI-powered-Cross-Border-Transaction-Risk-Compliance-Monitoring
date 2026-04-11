"use strict";
/**
 * PATHGUARD PILLAR 3: USER EXPERIENCE
 * Path Visualizer Service — Mapping the transaction journey through
 * various nodes (Intermediaries, Compliance, Settlement).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathVisualizerService = exports.PathVisualizerService = void 0;
class PathVisualizerService {
    static instance;
    constructor() { }
    static getInstance() {
        if (!PathVisualizerService.instance) {
            PathVisualizerService.instance = new PathVisualizerService();
        }
        return PathVisualizerService.instance;
    }
    /**
     * Mock a transaction path based on transaction details.
     */
    generatePath(transactionId, amount, recipient) {
        const nodes = [
            { id: 'node-origin', name: 'User Wallet', type: 'SENDER', status: 'COMPLETED', timestamp: new Date().toISOString() },
            { id: 'node-comp-1', name: 'AML Check (Local)', type: 'COMPLIANCE', status: 'COMPLETED' },
            { id: 'node-int-1', name: 'Liquidity Bridge', type: 'INTERMEDIARY', status: 'IN_PROGRESS' },
            { id: 'node-set-1', name: 'Atomic Settlement', type: 'SETTLEMENT', status: 'PENDING' },
            { id: 'node-dest', name: recipient, type: 'RECIPIENT', status: 'PENDING' }
        ];
        const edges = [
            { from: 'node-origin', to: 'node-comp-1' },
            { from: 'node-comp-1', to: 'node-int-1' },
            { from: 'node-int-1', to: 'node-set-1' },
            { from: 'node-set-1', to: 'node-dest' }
        ];
        return { transactionId, nodes, edges };
    }
    /**
     * Update the status of a specific node in the journey.
     */
    updateNodeStatus(path, nodeId, status) {
        const node = path.nodes.find(n => n.id === nodeId);
        if (node) {
            node.status = status;
            if (status === 'COMPLETED')
                node.timestamp = new Date().toISOString();
        }
        return path;
    }
}
exports.PathVisualizerService = PathVisualizerService;
exports.pathVisualizerService = PathVisualizerService.getInstance();
