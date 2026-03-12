/**
 * P5 SECTIONS 123, 124, 125: SUPERCONDUCTING QUBIT ARCHITECTURES
 * Ultimate Nuclear Spec (P5 Singularity Stack) — Cooper Pair Box,
 * Transmon Qubits, Fluxonium Qubits, charge-noise insensitivity,
 * superinductance (JJ arrays), dispersive readout, anharmonicity tracking,
 * and flux-bias control.
 */

export type QubitArchitecture = 'COOPER_PAIR_BOX' | 'TRANSMON' | 'FLUXONIUM' | 'FLUX_QUBIT';
export type QubitState = 'GROUND' | 'EXCITED' | 'SUPERPOSITION' | 'DECOHERED';

export interface SuperconductingQubit {
  qubitId: string;
  architecture: QubitArchitecture;
  ejMev: number;                    // Josephson Energy
  ecMev: number;                    // Charging Energy
  elMev?: number;                   // Inductive Energy (for Fluxonium)
  anharmonicityMhz: number;         // (ω12 - ω01)
  transitionFreqGhz: number;        // ω01
  chargeOffset: number;             // n_g (offset charge)
  fidelity: number;
}

export interface QubitReadout {
  readoutId: string;
  qubitId: string;
  method: 'DISPERSIVE_RESONATOR' | 'SQUID_SWITCHING' | 'JPA_AMPLIFIED';
  measuredValue: 0 | 1;
  assignmentFidelity: number;
  readoutTimeNs: number;
}

export interface FluxBiasControl {
  controlId: string;
  qubitId: string;
  externalFluxPh0: number;
  sweetSpotReached: boolean;
  frequencyShiftMhz: number;
}

export interface DecoherenceAudit {
  qubitId: string;
  t1_Us: number;                    // Relaxation time
  t2_Us: number;                    // Dephasing time
  predominantNoise: 'CHARGE_NOISE' | 'FLUX_NOISE' | 'QUASIPARTICLE';
  lastAuditAt: string;
}

// ======================================================================
// SUPERCONDUCTING QUBITS SERVICE
// ======================================================================

export class SuperconductingQubitsService {
  private qubits: Map<string, SuperconductingQubit> = new Map();
  private audits: Map<string, DecoherenceAudit> = new Map();

  // ---- QUBIT INITIALIZATION --------------------------------------------

  initializeQubit(arch: QubitArchitecture): SuperconductingQubit {
    const id = `sq-${arch.toLowerCase()}-${Date.now()}`;
    
    // Archetypal values for each architecture
    let ej = 10.0, ec = 5.0, el = 0.0;
    let anharmonicity = -200.0; // Typical transmon anharmonicity in MHz

    if (arch === 'TRANSMON') {
      ej = 50.0; ec = 0.5; // Ej/Ec >> 1 for Transmon
      anharmonicity = -250.0;
    } else if (arch === 'FLUXONIUM') {
      ej = 5.0; ec = 1.0; 
      el = 0.5; // Superinductance energy 
      anharmonicity = 2500.0; // Positive and large for fluxonium
    } else if (arch === 'COOPER_PAIR_BOX') {
      ej = 1.0; ec = 1.0; // Ej ~ Ec
      anharmonicity = -5000.0;
    }

    const qubit: SuperconductingQubit = {
      qubitId: id,
      architecture: arch,
      ejMev: ej,
      ecMev: ec,
      elMev: el > 0 ? el : undefined,
      anharmonicityMhz: anharmonicity,
      transitionFreqGhz: 5.0 + Math.random(),
      chargeOffset: Math.random() * 0.5,
      fidelity: 0.99,
    };

    this.qubits.set(id, qubit);
    this._performInitialAudit(id);
    return qubit;
  }

  // ---- DISPERSIVE READOUT ----------------------------------------------

  /**
   * Dispersive readout via a coupled microwave resonator.
   * Measures the state-dependent shift in resonator frequency.
   */
  readQubitState(qubitId: string): QubitReadout {
    const q = this.qubits.get(qubitId);
    if (!q) throw new Error('Qubit not found');

    const outcome = Math.random() > 0.5 ? 1 : 0;
    
    return {
      readoutId: `read-${Date.now()}`,
      qubitId,
      method: 'DISPERSIVE_RESONATOR',
      measuredValue: outcome,
      assignmentFidelity: q.architecture === 'TRANSMON' ? 0.999 : 0.95,
      readoutTimeNs: 200.0,
    };
  }

  // ---- FLUX BIAS & SWEET SPOT TUNING -----------------------------------

  /**
   * Adjusts the external magnetic flux to reach the "Sweet Spot" (df/dΦ = 0).
   * This provides first-order immunity to flux noise.
   */
  tuneFluxBias(qubitId: string, flux: number): FluxBiasControl {
    const q = this.qubits.get(qubitId);
    if (!q) throw new Error('Qubit not found');

    const isSweetSpot = Math.abs(flux % 1.0) < 0.01 || Math.abs(flux % 1.0 - 0.5) < 0.01;

    return {
      controlId: `tune-${Date.now()}`,
      qubitId,
      externalFluxPh0: flux,
      sweetSpotReached: isSweetSpot,
      frequencyShiftMhz: 100 * Math.cos(2 * Math.PI * flux),
    };
  }

  // ---- DECOHERENCE AUDITING --------------------------------------------

  private _performInitialAudit(qubitId: string): void {
    const q = this.qubits.get(qubitId);
    if (!q) return;

    let t1 = 50.0, t2 = 30.0;
    let noise: DecoherenceAudit['predominantNoise'] = 'FLUX_NOISE';

    if (q.architecture === 'TRANSMON') {
      t1 = 100.0; t2 = 80.0; // High coherence due to charge-noise immunity
      noise = 'QUASIPARTICLE';
    } else if (q.architecture === 'COOPER_PAIR_BOX') {
      t1 = 10.0; t2 = 0.5;   // Poor T2 due to charge noise sensitivity
      noise = 'CHARGE_NOISE';
    } else if (q.architecture === 'FLUXONIUM') {
      t1 = 500.0; t2 = 400.0; // Potential for sub-ms coherence
      noise = 'FLUX_NOISE';
    }

    this.audits.set(qubitId, {
      qubitId,
      t1_Us: t1,
      t2_Us: t2,
      predominantNoise: noise,
      lastAuditAt: new Date().toISOString(),
    });
  }

  // ---- CHIP-LEVEL ANALYTICS --------------------------------------------

  getQuantumProcessorHeath(): { qubitCount: number; avgT1: number; avgT2: number; fidelityP99: number } {
    const audits = Array.from(this.audits.values());
    const count = audits.length;
    return {
      qubitCount: count,
      avgT1: count ? audits.reduce((a, b) => a + b.t1_Us, 0) / count : 0,
      avgT2: count ? audits.reduce((a, b) => a + b.t2_Us, 0) / count : 0,
      fidelityP99: 0.9999,
    };
  }
}
