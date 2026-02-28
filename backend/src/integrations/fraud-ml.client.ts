import axios from 'axios';
import { env } from '../config/env';
import { logger } from '../config/logger';

export interface FraudCheckResponse {
  anomaly_score: number;
  supervised_prob: number;
  final_risk_score: number;
  risk_level: string;
  explanation: Record<string, unknown>;
  graph_flag?: boolean;
}

export class FraudMLClient {
  private static client = axios.create({
    baseURL: env.ML_SERVICE_URL,
    timeout: 5000,
  });

  static async checkTransaction(data: Record<string, unknown>): Promise<FraudCheckResponse | null> {
    try {
      const response = await this.client.post<FraudCheckResponse>('/api/fraud/check', data);
      return response.data;
    } catch (error) {
      logger.error('Failed to communicate with Fraud ML Service:', error);
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
