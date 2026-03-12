/**
 * P5 SECTION 122: JOSEPHSON JUNCTION (JJ) PROCESSOR ARRAYS
 * Ultimate Nuclear Spec (P5 Singularity Stack) — JJ processor arrays,
 * Rapid Single Flux Quantum (RSFQ) logic, non-dissipative switching,
 * supercurrent monitoring, Josephson energy (Ej) vs Charging energy (Ec),
 * and SFQ pulse propagation management.
 */

export type JJType = 'SIS' | 'SNS' | 'SFS' | 'Doped_Semiconductor';
export type RSFQComponent = 'JLT' | 'SFQ_GATE' | 'PULSE_SPLITTER' | 'V_F_CONVERTER';

export interface JosephsonJunction {
  jjId: string;
  type: JJType;
  criticalCurrentIcMa: number;
  normalResistanceOhm: number;
  capacitancePf: number;
  currentPhaseDelta: number;
  energyEjMev: number;              // Josephson Energy
  energyEcMev: number;              // Charging Energy
}

export interface RSFQGate {
  gateId: string;
  type: 'AND' | 'OR' | 'XOR' | 'NOT' | 'D_FLIP_FLOP';
  jjIds: string[];
  pulseThresholdMv: number;
  switchingSpeedPs: number;         // Pico-seconds
  isNonDissipative: boolean;
}

export interface SFQPulsePacket {
  packetId: string;
  fluxQuantaPh0: number;            // Usually 1 for RSFQ
  amplitudeMv: number;
  widthPs: number;
  velocityFractionOfC: number;
  dataBit: 0 | 1;
}

export interface ArrayThermalMonitor {
  arrayId: string;
  jjCount: number;
  powerDissipationUw: number;       // Ultra-low for JJs
  criticalTempReached: boolean;
  quasiparticleLevel: number;
}

// ======================================================================
// JOSEPHSON JUNCTION SERVICE
// ======================================================================

export class JosephsonJunctionService {
  private junctions: Map<string, JosephsonJunction> = new Map();
  private gates: Map<string, RSFQGate> = new Map();
  private pulses: SFQPulsePacket[] = [];

  // ---- JUNCTION INITIALIZATION -----------------------------------------

  createJunction(type: JJType = 'SIS'): JosephsonJunction {
    const ic = 1.5;
    const hBar = 1.054e-34;
    const e = 1.602e-19;
    
    // Ej = (hBar * Ic) / (2e)
    const ej = (hBar * ic * 1e-3) / (2 * e);

    const jj: JosephsonJunction = {
      jjId: `jj-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      type,
      criticalCurrentIcMa: ic,
      normalResistanceOhm: 10.0,
      capacitancePf: 0.1,
      currentPhaseDelta: 0,
      energyEjMev: ej * 6.242e21, // converted to meV approx
      energyEcMev: 0.15,
    };

    this.junctions.set(jj.jjId, jj);
    return jj;
  }

  // ---- RSFQ LOGIC GATING -----------------------------------------------

  /**
   * Rapid Single Flux Quantum (RSFQ) logic gate.
   * Switches state by moving a single flux quantum through a junction.
   */
  executeRSFQOperation(gateType: 'AND' | 'OR' | 'NOT'): RSFQGate {
    const jjs = [this.createJunction().jjId, this.createJunction().jjId];
    
    const gate: RSFQGate = {
      gateId: `rsfq-${Date.now()}`,
      type: gateType,
      jjIds: jjs,
      pulseThresholdMv: 0.5,
      switchingSpeedPs: 1.0, // 1ps switching is typical for RSFQ
      isNonDissipative: true,
    };

    this.gates.set(gate.gateId, gate);
    return gate;
  }

  // ---- SFQ PULSE PROPAGATION -------------------------------------------

  /**
   * Injects an SFQ pulse into the Josephson transmission line (JLT).
   * Pulse width is typically ~2ps, height ~0.5mV.
   */
  injectSFQPulse(bit: 0 | 1): SFQPulsePacket {
    const pulse: SFQPulsePacket = {
      packetId: `sfq-${Date.now()}`,
      fluxQuantaPh0: 1,
      amplitudeMv: 0.6,
      widthPs: 2.5,
      velocityFractionOfC: 0.05, // JLT propagation speed
      dataBit: bit,
    };
    
    this.pulses.push(pulse);
    return pulse;
  }

  // ---- SUPERCURRENT MONITORING -----------------------------------------

  monitorSupercurrent(jjId: string): { i: number; sinkDelta: number; isSuperconducting: boolean } {
    const jj = this.junctions.get(jjId);
    if (!jj) throw new Error('JJ not found');

    // DC Josephson Effect: I = Ic * sin(δ)
    const i = jj.criticalCurrentIcMa * Math.sin(jj.currentPhaseDelta);
    
    return {
      i,
      sinkDelta: Math.sin(jj.currentPhaseDelta),
      isSuperconducting: Math.abs(i) <= jj.criticalCurrentIcMa,
    };
  }

  // ---- RATIO TRACKING (Ej/Ec) ------------------------------------------

  /**
   * Charging energy Ec vs Josephson energy Ej.
   * High Ej/Ec (>50) is required for Transmons to avoid charge noise.
   */
  getEnergyRatio(jjId: string): { ratio: number; regime: 'PHASE' | 'CHARGE' | 'TRANSMON' } {
    const jj = this.junctions.get(jjId);
    if (!jj) return { ratio: 0, regime: 'PHASE' };

    const ratio = jj.energyEjMev / jj.energyEcMev;
    const regime = ratio > 50 ? 'TRANSMON' : ratio > 1 ? 'PHASE' : 'CHARGE';

    return { ratio, regime };
  }

  // ---- ANALYTICS -------------------------------------------------------

  getArrayMetrics(): ArrayThermalMonitor {
    return {
      arrayId: `jj-array-global`,
      jjCount: this.junctions.size,
      powerDissipationUw: this.junctions.size * 1e-6, // Non-dissipative except for bias resistors
      criticalTempReached: false,
      quasiparticleLevel: 0.0001,
    };
  }
}
