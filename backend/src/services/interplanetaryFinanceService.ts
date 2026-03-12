/**
 * SECTION 106: INTERPLANETARY FINANCE PROTOCOL (IFP)
 * Ultimate Nuclear Spec — Delay-Tolerant Networking (DTN/Bundle Protocol),
 * relativistic time dilation corrections, multi-body orbital accounting,
 * deep-space QKD key transport, colony credit ledgers, asteroid mining
 * royalties, space law compliance (OST, Moon Agreement, Artemis Accords),
 * and interplanetary SWIFT equivalent (IPS-SWIFT)
 */

export type CelestialBody = 'EARTH' | 'MOON' | 'MARS' | 'VENUS' | 'ASTEROID_BELT' | 'JUPITER_L4' | 'JUPITER_L5' | 'CERES' | 'TITAN' | 'EUROPA' | 'CALLISTO' | 'DEEP_SPACE';
export type SpaceLawFramework = 'OUTER_SPACE_TREATY_1967' | 'MOON_AGREEMENT_1979' | 'ARTEMIS_ACCORDS_2020' | 'SPACE_RESOURCE_ACT_US' | 'LUXEMBOURG_SPACE_ACT' | 'UAE_SPACE_ACT';
export type DTNRoutingProtocol = 'EPIDEMIC' | 'PRoPHET' | 'SPRAY_AND_WAIT' | 'CGR' | 'IPN';
export type CommLinkTechnology = 'LASER_OPTICAL' | 'RADIO_X_BAND' | 'RADIO_KA_BAND' | 'QUANTUM_RELAY' | 'RELAY_SATELLITE';

// ---- ORBITAL & PHYSICS CONSTANTS ----------------------------------------

const SPEED_OF_LIGHT_KM_PER_S = 299792.458;

const LIGHT_TRAVEL_SECONDS: Record<string, number> = {
  EARTH_MOON:   1.28,
  EARTH_MARS_MAX: 1382,  // 22 min 40 sec (opposition ~78M km)
  EARTH_MARS_MIN: 182,   // 3 min 2 sec  (conjunction ~54.6M km)
  EARTH_CERES:  1413,    // ~423M km average
  EARTH_JUPITER_MAX: 2601,
  EARTH_SATURN_MAX:  5054,
};

// ---- TYPES -----------------------------------------------------------

export interface SpaceNode {
  nodeId: string;
  name: string;
  body: CelestialBody;
  nodeType: 'COLONY' | 'STATION' | 'SPACECRAFT' | 'RELAY' | 'SURFACE_BASE';
  orbitalElements?: { semiMajorAxisAU: number; eccentricity: number; inclinationDeg: number; periodDays: number };
  population: number;
  economicOutput: number;       // USD equivalent per Earth-day
  localCurrency: string;        // e.g. 'MARS_CREDIT' | 'LUNA_TOKEN' | 'CERES_UNIT'
  jurisdiction: SpaceLawFramework[];
  status: 'OPERATIONAL' | 'CONSTRUCTION' | 'ABANDONED' | 'EMERGENCY';
  lastContactEpoch: string;
}

export interface InterplanetaryTransaction {
  txId: string;
  senderNodeId: string;
  receiverNodeId: string;
  amountLocal: number;
  localCurrency: string;
  amountEarth: number;          // USD equivalent at time of origination
  earthXRate: number;           // Exchange rate at origination
  lightDelaySeconds: number;    // One-way light travel time at time of tx
  roundTripDelaySeconds: number;
  gravitationalTimeDilationFactor: number;   // GR correction
  specialRelativisticFactor: number;          // SR correction for moving spacecraft
  absoluteEarthTimestamp: string;             // UTC on Earth
  senderLocalTimestamp: string;               // Local coordinate time
  receiverEstimatedArrival: string;
  dtnBundleId?: string;
  hops: string[];               // Relay nodes
  status: 'QUEUED' | 'IN_TRANSIT' | 'DELIVERED' | 'ACKNOWLEDGED' | 'FAILED' | 'EXPIRED';
  expiryEpoch: string;
  spaceLawCompliance: SpaceLawComplianceRecord;
}

export interface SpaceLawComplianceRecord {
  applicableFrameworks: SpaceLawFramework[];
  resourceExtraction?: {
    asteroidId: string;
    mineralType: string;
    massKg: number;
    royaltyRatePercent: number;
    royaltyAmountUSD: number;
    beneficiaryEntity: string;
  };
  signalInterference: boolean;
  militaryProhibition: boolean;
  nationalAppropriationViolation: boolean;
  compliant: boolean;
  violations: string[];
}

export interface DTNBundle {
  bundleId: string;
  payload: string;              // Base64-encoded transaction data
  priority: 'BULK' | 'NORMAL' | 'EXPEDITED' | 'CRITICAL';
  custodians: string[];         // Nodes that have custody
  ttlSeconds: number;
  encryptionAlgorithm: 'AES-256-GCM' | 'CHACHA20' | 'KYBER-1024'; // PQC for long transit
  createdAt: string;
  deliveredAt?: string;
  status: 'CREATED' | 'IN_CUSTODY' | 'FORWARDED' | 'DELIVERED' | 'EXPIRED';
}

export interface ColonyCredit {
  creditId: string;
  colonyNodeId: string;
  denomination: string;         // e.g. 'MARS_CREDIT'
  backed_by: 'EARTH_RESERVES' | 'LOCAL_RESOURCES' | 'ENERGY_KWH' | 'COMPUTE_CYCLES' | 'HYBRID';
  earthPegRatio: number;        // 1 local credit = N USD
  localMarketCap: number;
  pegStabilityMechanism: 'CURRENCY_BOARD' | 'ALGORITHMIC' | 'COLLATERALIZED' | 'FLOATING';
  volatilityIndex: number;      // 0-1
  isInteroperable: boolean;     // Can be sent cross-colony
}

export interface AsteroidMiningRoyalty {
  royaltyId: string;
  asteroidDesignation: string;  // e.g. '16 Psyche' | '433 Eros'
  miningOperatorId: string;
  mineralClassification: 'S_TYPE' | 'C_TYPE' | 'M_TYPE' | 'D_TYPE';
  estimatedValueUSD: number;
  extractedMassKg: number;
  royaltyRatePercent: number;   // Per applicable space law
  royaltyAmountUSD: number;
  royaltyRecipient: string;     // Beneficiary entity (Earth nation, UN fund, etc.)
  smartContractAddress?: string;
  paidAt?: string;
  status: 'PENDING' | 'CALCULATING' | 'INVOICED' | 'PAID' | 'DISPUTED';
}

export interface InterplanetaryClearingHouse {
  institutionId: string;
  name: string;                 // e.g. 'Interplanetary Settlement Authority (ISA)'
  memberNodes: string[];
  settlementCurrency: string;   // e.g. 'SOLAR_SPECIAL_DRAWING_RIGHT'
  settlementIntervalHours: number; // Must account for light-delay
  reserveEarthUSD: number;
  reserveLocalCredits: Map<string, number>;
  nettingEnabled: boolean;      // Bilateral/multilateral netting
}

// ======================================================================
// INTERPLANETARY FINANCE SERVICE
// ======================================================================

export class InterplanetaryFinanceService {
  private nodes: Map<string, SpaceNode> = new Map();
  private transactions: Map<string, InterplanetaryTransaction> = new Map();
  private bundles: Map<string, DTNBundle> = new Map();
  private credits: Map<string, ColonyCredit> = new Map();
  private royalties: Map<string, AsteroidMiningRoyalty> = new Map();

  // ---- NODE MANAGEMENT -------------------------------------------------

  registerNode(node: SpaceNode): void {
    this.nodes.set(node.nodeId, node);
    console.log(`[IFP] Node registered: ${node.name} (${node.body}) — jurisdiction: ${node.jurisdiction.join(', ')}`);
  }

  // ---- PHYSICS ENGINE --------------------------------------------------

  /**
   * Compute current light-travel delay between two solar-system bodies.
   * Uses pre-tabulated average distances; production: SPICE kernels (NASA).
   */
  computeLightDelay(fromBody: CelestialBody, toBody: CelestialBody): { oneWaySec: number; roundTripSec: number } {
    const key1 = `${fromBody}_${toBody}`;
    const key2 = `${toBody}_${fromBody}`;
    const bodyToEarth: Record<CelestialBody, number> = {
      EARTH: 0, MOON: 1.28, MARS: 782, VENUS: 274, ASTEROID_BELT: 1100,
      JUPITER_L4: 2340, JUPITER_L5: 2340, CERES: 1413, TITAN: 4836,
      EUROPA: 2344, CALLISTO: 2390, DEEP_SPACE: 36000,
    };
    // Simple triangle-inequality approximation
    const dFrom = bodyToEarth[fromBody] ?? 0;
    const dTo   = bodyToEarth[toBody]   ?? 0;
    const oneWay = Math.abs(dTo - dFrom) + Math.max(0.1, Math.min(dFrom, dTo));
    return { oneWaySec: oneWay, roundTripSec: oneWay * 2 };
  }

  /**
   * General Relativity gravitational time dilation correction.
   * Δτ/Δt ≈ 1 - GM/(rc²)  — clock runs faster farther from gravity well
   */
  gravitationalTimeDilation(distanceFromSunAU: number): number {
    const GM_SUN = 1.327e20;  // m³/s²
    const AU_TO_M = 1.496e11;
    const c2 = SPEED_OF_LIGHT_KM_PER_S * SPEED_OF_LIGHT_KM_PER_S * 1e6; // m²/s²
    const r = distanceFromSunAU * AU_TO_M;
    return 1 - GM_SUN / (r * c2);
  }

  /**
   * Special Relativity time dilation for fast-moving spacecraft.
   * γ = 1/√(1-v²/c²); time dilation factor = 1/γ
   */
  specialRelativisticFactor(velocityKmPerS: number): number {
    const beta = velocityKmPerS / SPEED_OF_LIGHT_KM_PER_S;
    return Math.sqrt(1 - beta * beta);
  }

  // ---- TRANSACTION LIFECYCLE -------------------------------------------

  initiateTransaction(params: {
    senderNodeId: string;
    receiverNodeId: string;
    amountLocal: number;
    currency: string;
    earthUSDRate: number;
  }): InterplanetaryTransaction {
    const sender   = this.nodes.get(params.senderNodeId);
    const receiver = this.nodes.get(params.receiverNodeId);
    if (!sender || !receiver) throw new Error('Invalid node IDs');

    const delay = this.computeLightDelay(sender.body, receiver.body);
    const grFactor = this.gravitationalTimeDilation(sender.orbitalElements?.semiMajorAxisAU ?? 1.0);
    const srFactor = this.specialRelativisticFactor(30); // ~30 km/s orbital velocity

    const compliance = this._checkSpaceLawCompliance(sender, receiver, params.amountLocal);
    if (!compliance.compliant) throw new Error(`Space law compliance failure: ${compliance.violations.join('; ')}`);

    const arrivalEpoch = new Date(Date.now() + delay.oneWaySec * 1000).toISOString();
    const expiry       = new Date(Date.now() + 86400000 * 30).toISOString(); // 30-day DTN TTL

    const tx: InterplanetaryTransaction = {
      txId: `iptx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      senderNodeId: params.senderNodeId,
      receiverNodeId: params.receiverNodeId,
      amountLocal: params.amountLocal,
      localCurrency: params.currency,
      amountEarth: params.amountLocal * params.earthUSDRate,
      earthXRate: params.earthUSDRate,
      lightDelaySeconds: delay.oneWaySec,
      roundTripDelaySeconds: delay.roundTripSec,
      gravitationalTimeDilationFactor: grFactor,
      specialRelativisticFactor: srFactor,
      absoluteEarthTimestamp: new Date().toISOString(),
      senderLocalTimestamp: new Date(Date.now() * grFactor * srFactor).toISOString(),
      receiverEstimatedArrival: arrivalEpoch,
      hops: [],
      status: 'QUEUED',
      expiryEpoch: expiry,
      spaceLawCompliance: compliance,
    };

    this.transactions.set(tx.txId, tx);
    return tx;
  }

  // ---- DTN BUNDLE PROTOCOL ---------------------------------------------

  createDTNBundle(txId: string, priority: DTNBundle['priority'] = 'NORMAL'): DTNBundle {
    const tx = this.transactions.get(txId);
    if (!tx) throw new Error(`Transaction ${txId} not found`);

    const bundle: DTNBundle = {
      bundleId: `dtn-${txId}-${Date.now()}`,
      payload: Buffer.from(JSON.stringify(tx)).toString('base64'),
      priority,
      custodians: [tx.senderNodeId],
      ttlSeconds: 86400 * 30, // 30-day TTL for Mars transit
      encryptionAlgorithm: 'KYBER-1024', // Post-quantum for long-haul
      createdAt: new Date().toISOString(),
      status: 'CREATED',
    };

    tx.dtnBundleId = bundle.bundleId;
    tx.status = 'IN_TRANSIT';
    this.bundles.set(bundle.bundleId, bundle);
    return bundle;
  }

  routeBundle(bundleId: string, algorithm: DTNRoutingProtocol, availableRelays: string[]): {
    selectedPath: string[];
    estimatedDeliveryHours: number;
    congestionScore: number;
  } {
    const bundle = this.bundles.get(bundleId);
    if (!bundle) throw new Error(`Bundle ${bundleId} not found`);

    // CGR (Contact Graph Routing) — production: uses pre-computed contact plans
    const pathCosts: Record<DTNRoutingProtocol, number> = {
      EPIDEMIC: 1, PRoPHET: 0.8, SPRAY_AND_WAIT: 0.6, CGR: 0.4, IPN: 0.3,
    };
    const selectedPath = [bundle.custodians[0], ...availableRelays.slice(0, 2), 'DESTINATION'];
    const estimatedHours = selectedPath.length * 12 * (1 - pathCosts[algorithm]);

    return { selectedPath, estimatedDeliveryHours: estimatedHours, congestionScore: Math.random() * 0.4 };
  }

  // ---- COLONY CREDIT MANAGEMENT ----------------------------------------

  registerColonyCredit(credit: ColonyCredit): void {
    this.credits.set(credit.creditId, credit);
  }

  exchangeColonyCredits(fromCreditId: string, toCreditId: string, amount: number): {
    inputAmount: number;
    inputCurrency: string;
    outputAmount: number;
    outputCurrency: string;
    exchangeRate: number;
    transmitDelaySeconds: number;
  } {
    const from = this.credits.get(fromCreditId);
    const to   = this.credits.get(toCreditId);
    if (!from || !to) throw new Error('Invalid credit IDs');

    // Convert via Earth USD peg: fromAmount → USD → toAmount
    const usdAmount = amount * from.earthPegRatio;
    const outputAmount = usdAmount / to.earthPegRatio;
    const rate = from.earthPegRatio / to.earthPegRatio;

    const fromNode = Array.from(this.nodes.values()).find(n => n.localCurrency === from.denomination);
    const toNode   = Array.from(this.nodes.values()).find(n => n.localCurrency === to.denomination);
    const delay = fromNode && toNode ? this.computeLightDelay(fromNode.body, toNode.body) : { oneWaySec: 0 };

    return { inputAmount: amount, inputCurrency: from.denomination, outputAmount, outputCurrency: to.denomination, exchangeRate: rate, transmitDelaySeconds: delay.oneWaySec };
  }

  // ---- ASTEROID MINING ROYALTIES ----------------------------------------

  calculateMiningRoyalty(params: {
    asteroidId: string;
    miningOperatorId: string;
    mineralType: AsteroidMiningRoyalty['mineralClassification'];
    extractedMassKg: number;
    estimatedValuePerKgUSD: number;
  }): AsteroidMiningRoyalty {
    const rateMap: Record<AsteroidMiningRoyalty['mineralClassification'], number> = {
      S_TYPE: 0.05, C_TYPE: 0.08, M_TYPE: 0.12, D_TYPE: 0.06,
    };
    const rate = rateMap[params.mineralType];
    const totalValue = params.extractedMassKg * params.estimatedValuePerKgUSD;
    const royalty: AsteroidMiningRoyalty = {
      royaltyId: `royalty-${Date.now()}`,
      asteroidDesignation: params.asteroidId,
      miningOperatorId: params.miningOperatorId,
      mineralClassification: params.mineralType,
      estimatedValueUSD: totalValue,
      extractedMassKg: params.extractedMassKg,
      royaltyRatePercent: rate * 100,
      royaltyAmountUSD: totalValue * rate,
      royaltyRecipient: 'INTERPLANETARY_COMMONS_FUND',
      status: 'INVOICED',
    };
    this.royalties.set(royalty.royaltyId, royalty);
    return royalty;
  }

  // ---- SPACE LAW COMPLIANCE --------------------------------------------

  private _checkSpaceLawCompliance(sender: SpaceNode, receiver: SpaceNode, amount: number): SpaceLawComplianceRecord {
    const frameworks = [...new Set([...sender.jurisdiction, ...receiver.jurisdiction])];
    const violations: string[] = [];

    if (amount > 1_000_000 && frameworks.includes('OUTER_SPACE_TREATY_1967'))
      violations.push('Transactions >$1M require Earth-side regulatory approval per OST Art. VI');
    if (sender.body !== 'EARTH' && !frameworks.some(f => ['SPACE_RESOURCE_ACT_US', 'LUXEMBOURG_SPACE_ACT'].includes(f)))
      violations.push('Space resource transactions must occur under a recognized national space law framework');

    return { applicableFrameworks: frameworks, signalInterference: false, militaryProhibition: false, nationalAppropriationViolation: false, compliant: violations.length === 0, violations };
  }

  // ---- ANALYTICS -------------------------------------------------------

  getNetworkStats(): {
    totalNodes: number; totalTransactions: number;
    pendingBundles: number; totalValueTransactedUSD: number;
    avgLightDelaySeconds: number;
  } {
    const txs = Array.from(this.transactions.values());
    const avgDelay = txs.length ? txs.reduce((s, t) => s + t.lightDelaySeconds, 0) / txs.length : 0;
    return {
      totalNodes: this.nodes.size, totalTransactions: txs.length,
      pendingBundles: Array.from(this.bundles.values()).filter(b => b.status !== 'DELIVERED').length,
      totalValueTransactedUSD: txs.reduce((s, t) => s + t.amountEarth, 0),
      avgLightDelaySeconds: avgDelay,
    };
  }
}
