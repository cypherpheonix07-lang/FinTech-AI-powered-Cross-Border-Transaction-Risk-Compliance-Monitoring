/**
 * P5 SECTION 121: SUPERCONDUCTING QUANTUM INTERFERENCE DEVICES (SQUIDs)
 * Ultimate Nuclear Spec (P5 Singularity Stack) — Magnetic flux quantization,
 * Superconducting loops, Josephson phase interference (Δφ), 
 * ultra-sensitive magnetic field sensing for biometric fraud detection,
 * and flux-to-voltage transformation (V-Φ curves).
 */

export type SQUIDMode = 'DC_SQUID' | 'RF_SQUID' | 'NANO_SQUID' | 'SCANNING_SQUID';
export type FluxStatus = 'LOCKED' | 'TUNNELING' | 'TRANSITION' | 'CRITICAL';

export interface SQUIDSensor {
  sensorId: string;
  mode: SQUIDMode;
  superconductingMaterial: string;  // e.g. Niobium, YBCO
  loopAreaUm2: number;
  criticalCurrentIcMa: number;
  shuntResistanceOhm: number;
  noiseSensityFT: number;           // fT/√Hz (femtoTesla)
  operatingTempK: number;
}

export interface FluxQuantizationRecord {
  recordId: string;
  sensorId: string;
  fluxQuantaCount: number;         // n in Φ = n * Φ0
  excessFluxPh0: number;           // Fractional flux
  phaseInterference: number;       // Δφ
  isLocked: boolean;
}

export interface MagneticAnomalyDetection {
  detectionId: string;
  sensorId: string;
  fieldStrengthPT: number;         // picoTesla
  signatureType: 'CARDIAC' | 'NEURAL' | 'EXTERNAL_TAMPER' | 'FINGERPRINT_BONE';
  fraudRiskScore: number;
  timestamp: string;
}

export interface SQUIDBiasControl {
  controlId: string;
  sensorId: string;
  currentBiasMa: number;
  fluxBiasPh0: number;
  voltageOutputMv: number;         // V-Φ transfer function result
  linearityError: number;
}

// ======================================================================
// SQUID SERVICE
// ======================================================================

export class SquidService {
  private sensors: Map<string, SQUIDSensor> = new Map();
  private fluxRecords: Map<string, FluxQuantizationRecord> = new Map();
  private detections: MagneticAnomalyDetection[] = [];

  // ---- SENSOR INITIALIZATION -------------------------------------------

  registerSQUID(mode: SQUIDMode = 'DC_SQUID'): SQUIDSensor {
    const id = `squid-${Date.now()}`;
    const sensor: SQUIDSensor = {
      sensorId: id,
      mode,
      superconductingMaterial: 'Nb',
      loopAreaUm2: 100.0,
      criticalCurrentIcMa: 2.5,
      shuntResistanceOhm: 5.0,
      noiseSensityFT: 3.0, // 3 fT/√Hz
      operatingTempK: 4.2, // Liquid Helium
    };
    this.sensors.set(id, sensor);
    return sensor;
  }

  // ---- FLUX QUANTIZATION MONITORING ------------------------------------

  /**
   * Monitors the magnetic flux through the superconducting loop.
   * Flux is quantized in units of Φ0 = h/2e ≈ 2.067e-15 Wb.
   */
  trackFluxQuantization(sensorId: string, externalField: number): FluxQuantizationRecord {
    const sensor = this.sensors.get(sensorId);
    if (!sensor) throw new Error('Sensor not found');

    const ph0 = 2.067e-15;
    const flux = externalField * (sensor.loopAreaUm2 * 1e-12);
    const n = Math.round(flux / ph0);
    const delta = (flux % ph0) / ph0;

    const record: FluxQuantizationRecord = {
      recordId: `flux-${Date.now()}`,
      sensorId,
      fluxQuantaCount: n,
      excessFluxPh0: delta,
      phaseInterference: 2 * Math.PI * delta,
      isLocked: Math.abs(delta) < 0.01,
    };

    this.fluxRecords.set(sensorId, record);
    return record;
  }

  // ---- BIOMETRIC FRAUD DETECTION (MAG-PRINT) --------------------------

  /**
   * Uses ultra-sensitive SQUID sensing to detect minute magnetic signatures.
   * Can detect neural patterns or the specific magnetic "fingerprint" of bone structures.
   */
  performBiometricMagneticScan(sensorId: string): MagneticAnomalyDetection {
    const sensor = this.sensors.get(sensorId);
    if (!sensor) throw new Error('Sensor not found');

    // Simulate neural magnetic field (typically 10-100 fT)
    const field = 0.05 + Math.random() * 0.15; // 50-200 fT
    
    const detection: MagneticAnomalyDetection = {
      detectionId: `det-${Date.now()}`,
      sensorId,
      fieldStrengthPT: field,
      signatureType: Math.random() > 0.8 ? 'EXTERNAL_TAMPER' : 'NEURAL',
      fraudRiskScore: 0.1,
      timestamp: new Date().toISOString(),
    };

    if (detection.signatureType === 'EXTERNAL_TAMPER') detection.fraudRiskScore = 0.95;
    this.detections.push(detection);

    return detection;
  }

  // ---- VOLTAGE-FLUX (V-Φ) TRANSFER -------------------------------------

  getVoltageOutput(sensorId: string, fluxBias: number): SQUIDBiasControl {
    const sensor = this.sensors.get(sensorId);
    if (!sensor) throw new Error('Sensor not found');

    // Transfer function: V = (R/2) * sqrt(I_bias^2 - (2 * I_c * cos(π * Φ/Φ0))^2)
    const ic = sensor.criticalCurrentIcMa;
    const r = sensor.shuntResistanceOhm;
    const ibias = ic * 1.1; // Bias slightly above critical
    
    const v = (r / 2) * Math.sqrt(Math.pow(ibias, 2) - Math.pow(2 * ic * Math.cos(Math.PI * fluxBias), 2));

    return {
      controlId: `bias-${Date.now()}`,
      sensorId,
      currentBiasMa: ibias,
      fluxBiasPh0: fluxBias,
      voltageOutputMv: v,
      linearityError: 0.001,
    };
  }

  // ---- ANALYTICS -------------------------------------------------------

  getSquidMetrics(): { activeSensors: number; avgNoiseFT: number; tamperAlerts: number; totalFluxQuanta: number } {
    const ss = Array.from(this.sensors.values());
    const fr = Array.from(this.fluxRecords.values());
    return {
      activeSensors: ss.length,
      avgNoiseFT: ss.length ? ss.reduce((a, b) => a + b.noiseSensityFT, 0) / ss.length : 0,
      tamperAlerts: this.detections.filter(d => d.fraudRiskScore > 0.8).length,
      totalFluxQuanta: fr.reduce((a, b) => a + b.fluxQuantaCount, 0),
    };
  }
}
