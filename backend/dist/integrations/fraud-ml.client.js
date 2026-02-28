"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FraudMLClient = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
class FraudMLClient {
    static client = axios_1.default.create({
        baseURL: env_1.env.ML_SERVICE_URL,
        timeout: 5000,
    });
    static async checkTransaction(data) {
        try {
            const response = await this.client.post('/api/fraud/check', data);
            return response.data;
        }
        catch (error) {
            logger_1.logger.error('Failed to communicate with Fraud ML Service:', error);
            // Return default "safe but low confidence" values if ML is down
            return {
                anomaly_score: 0.1,
                supervised_prob: 0.1,
                final_risk_score: 10,
                risk_level: 'LOW',
                explanation: { reason: 'ML Service Unreachable' },
                graph_flag: false,
            };
        }
    }
}
exports.FraudMLClient = FraudMLClient;
