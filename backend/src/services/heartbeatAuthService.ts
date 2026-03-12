/**
 * OMEGA PROTOCOL SECTION 148: HEARTBEAT RHYTHM VERIFICATION
 * Post-Human Financial OS — ECG Morphology, HRV Analysis, Cardiac Signatures,
 * and autonomic-state driven risk management.
 */

export interface CardiacSignature {
  userId: string;
  pqrstHash: string;            // Hash of the unique P-Q-R-S-T wave complex
  meanHRVBaseline: number;      // Mean Heart Rate Variability (ms)
  autonomicBalanceBaseline: number; // LF/HF Ratio (normalized)
  lastCalibrated: string;
}

export interface CardiovascularState {
  bpm: number;
  hrvRootMeanSquare: number;    // RMSSD (ms)
  stressIndex: number;          // Baevsky Stress Index (0-1000)
  isAnomaly: boolean;
  autonomicTone: 'RELAXED' | 'NORMAL' | 'SA_SYMPATHETIC' | 'EXTREME_STRESS';
}

export class HeartbeatAuthService {
  private static instance: HeartbeatAuthService;
  private registry: Map<string, CardiacSignature> = new Map();

  private constructor() {}

  public static getInstance(): HeartbeatAuthService {
    if (!HeartbeatAuthService.instance) {
      HeartbeatAuthService.instance = new HeartbeatAuthService();
    }
    return HeartbeatAuthService.instance;
  }

  /**
   * Register a user's unique ECG signature for cardiac-based authentication.
   */
  registerSignature(userId: string, data: Partial<CardiacSignature>): CardiacSignature {
    const signature: CardiacSignature = {
      userId,
      pqrstHash: data.pqrstHash || `ecg-${Math.random().toString(36).slice(2, 10)}`,
      meanHRVBaseline: data.meanHRVBaseline || 65.0,
      autonomicBalanceBaseline: data.autonomicBalanceBaseline || 1.2,
      lastCalibrated: new Date().toISOString(),
    };
    this.registry.set(userId, signature);
    console.log(`[Omega-148] Cardiac signature registered for user: ${userId}`);
    return signature;
  }

  /**
   * Assess the user's autonomic state via real-time cardiovascular monitoring.
   * In production: Interfaces with smartwatch PPG or high-fidelity ECG chest-straps.
   */
  async analyzeVitals(userId: string): Promise<CardiovascularState> {
    const baseline = this.registry.get(userId);
    if (!baseline) {
      return { bpm: 72, hrvRootMeanSquare: 40, stressIndex: 50, isAnomaly: true, autonomicTone: 'NORMAL' };
    }

    // Simulate cardiac vitals
    const bpm = 60 + Math.floor(Math.random() * 40);
    const rmssd = baseline.meanHRVBaseline + (Math.random() - 0.5) * 10;
    const stress = Math.floor(Math.random() * 200);

    let tone: CardiovascularState['autonomicTone'] = 'NORMAL';
    if (stress > 150) tone = 'SA_SYMPATHETIC';
    if (bpm > 110 && stress > 400) tone = 'EXTREME_STRESS';

    return {
      bpm,
      hrvRootMeanSquare: rmssd,
      stressIndex: stress,
      isAnomaly: Math.abs(rmssd - baseline.meanHRVBaseline) > 30,
      autonomicTone: tone,
    };
  }

  /**
   * Circuit breaker for transactions: block if the user is in an extreme autonomic state.
   */
  evaluateTransactionRisk(state: CardiovascularState): { allow: boolean; alertReason?: string } {
    if (state.autonomicTone === 'EXTREME_STRESS') {
      return { allow: false, alertReason: 'CRITICAL_AUTONOMIC_STRESS_DETECTED' };
    }
    if (state.isAnomaly) {
      return { allow: true, alertReason: 'MINOR_CARDIAC_ANOMALY - VERIFY_MANUALLY' };
    }
    return { allow: true };
  }
}

export const heartbeatAuthService = HeartbeatAuthService.getInstance();
