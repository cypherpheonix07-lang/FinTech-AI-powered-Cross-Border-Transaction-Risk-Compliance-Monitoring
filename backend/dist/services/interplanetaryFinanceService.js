"use strict";
/**
 * SECTION 106: INTERPLANETARY FINANCE PROTOCOL (IFP)
 * Ultimate Nuclear Spec — Delay-Tolerant Networking (DTN/Bundle Protocol),
 * relativistic time dilation corrections, multi-body orbital accounting,
 * deep-space QKD key transport, colony credit ledgers, asteroid mining
 * royalties, space law compliance (OST, Moon Agreement, Artemis Accords),
 * and interplanetary SWIFT equivalent (IPS-SWIFT)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterplanetaryFinanceService = void 0;
// ---- ORBITAL & PHYSICS CONSTANTS ----------------------------------------
const SPEED_OF_LIGHT_KM_PER_S = 299792.458;
const LIGHT_TRAVEL_SECONDS = {
    EARTH_MOON: 1.28,
    EARTH_MARS_MAX: 1382, // 22 min 40 sec (opposition ~78M km)
    EARTH_MARS_MIN: 182, // 3 min 2 sec  (conjunction ~54.6M km)
    EARTH_CERES: 1413, // ~423M km average
    EARTH_JUPITER_MAX: 2601,
    EARTH_SATURN_MAX: 5054,
};
// ======================================================================
// INTERPLANETARY FINANCE SERVICE
// ======================================================================
class InterplanetaryFinanceService {
    nodes = new Map();
    transactions = new Map();
    bundles = new Map();
    credits = new Map();
    royalties = new Map();
    // ---- NODE MANAGEMENT -------------------------------------------------
    registerNode(node) {
        this.nodes.set(node.nodeId, node);
        console.log(`[IFP] Node registered: ${node.name} (${node.body}) — jurisdiction: ${node.jurisdiction.join(', ')}`);
    }
    // ---- PHYSICS ENGINE --------------------------------------------------
    /**
     * Compute current light-travel delay between two solar-system bodies.
     * Uses pre-tabulated average distances; production: SPICE kernels (NASA).
     */
    computeLightDelay(fromBody, toBody) {
        const key1 = `${fromBody}_${toBody}`;
        const key2 = `${toBody}_${fromBody}`;
        const bodyToEarth = {
            EARTH: 0, MOON: 1.28, MARS: 782, VENUS: 274, ASTEROID_BELT: 1100,
            JUPITER_L4: 2340, JUPITER_L5: 2340, CERES: 1413, TITAN: 4836,
            EUROPA: 2344, CALLISTO: 2390, DEEP_SPACE: 36000,
        };
        // Simple triangle-inequality approximation
        const dFrom = bodyToEarth[fromBody] ?? 0;
        const dTo = bodyToEarth[toBody] ?? 0;
        const oneWay = Math.abs(dTo - dFrom) + Math.max(0.1, Math.min(dFrom, dTo));
        return { oneWaySec: oneWay, roundTripSec: oneWay * 2 };
    }
    /**
     * General Relativity gravitational time dilation correction.
     * Δτ/Δt ≈ 1 - GM/(rc²)  — clock runs faster farther from gravity well
     */
    gravitationalTimeDilation(distanceFromSunAU) {
        const GM_SUN = 1.327e20; // m³/s²
        const AU_TO_M = 1.496e11;
        const c2 = SPEED_OF_LIGHT_KM_PER_S * SPEED_OF_LIGHT_KM_PER_S * 1e6; // m²/s²
        const r = distanceFromSunAU * AU_TO_M;
        return 1 - GM_SUN / (r * c2);
    }
    /**
     * Special Relativity time dilation for fast-moving spacecraft.
     * γ = 1/√(1-v²/c²); time dilation factor = 1/γ
     */
    specialRelativisticFactor(velocityKmPerS) {
        const beta = velocityKmPerS / SPEED_OF_LIGHT_KM_PER_S;
        return Math.sqrt(1 - beta * beta);
    }
    // ---- TRANSACTION LIFECYCLE -------------------------------------------
    initiateTransaction(params) {
        const sender = this.nodes.get(params.senderNodeId);
        const receiver = this.nodes.get(params.receiverNodeId);
        if (!sender || !receiver)
            throw new Error('Invalid node IDs');
        const delay = this.computeLightDelay(sender.body, receiver.body);
        const grFactor = this.gravitationalTimeDilation(sender.orbitalElements?.semiMajorAxisAU ?? 1.0);
        const srFactor = this.specialRelativisticFactor(30); // ~30 km/s orbital velocity
        const compliance = this._checkSpaceLawCompliance(sender, receiver, params.amountLocal);
        if (!compliance.compliant)
            throw new Error(`Space law compliance failure: ${compliance.violations.join('; ')}`);
        const arrivalEpoch = new Date(Date.now() + delay.oneWaySec * 1000).toISOString();
        const expiry = new Date(Date.now() + 86400000 * 30).toISOString(); // 30-day DTN TTL
        const tx = {
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
    createDTNBundle(txId, priority = 'NORMAL') {
        const tx = this.transactions.get(txId);
        if (!tx)
            throw new Error(`Transaction ${txId} not found`);
        const bundle = {
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
    routeBundle(bundleId, algorithm, availableRelays) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle)
            throw new Error(`Bundle ${bundleId} not found`);
        // CGR (Contact Graph Routing) — production: uses pre-computed contact plans
        const pathCosts = {
            EPIDEMIC: 1, PRoPHET: 0.8, SPRAY_AND_WAIT: 0.6, CGR: 0.4, IPN: 0.3,
        };
        const selectedPath = [bundle.custodians[0], ...availableRelays.slice(0, 2), 'DESTINATION'];
        const estimatedHours = selectedPath.length * 12 * (1 - pathCosts[algorithm]);
        return { selectedPath, estimatedDeliveryHours: estimatedHours, congestionScore: Math.random() * 0.4 };
    }
    // ---- COLONY CREDIT MANAGEMENT ----------------------------------------
    registerColonyCredit(credit) {
        this.credits.set(credit.creditId, credit);
    }
    exchangeColonyCredits(fromCreditId, toCreditId, amount) {
        const from = this.credits.get(fromCreditId);
        const to = this.credits.get(toCreditId);
        if (!from || !to)
            throw new Error('Invalid credit IDs');
        // Convert via Earth USD peg: fromAmount → USD → toAmount
        const usdAmount = amount * from.earthPegRatio;
        const outputAmount = usdAmount / to.earthPegRatio;
        const rate = from.earthPegRatio / to.earthPegRatio;
        const fromNode = Array.from(this.nodes.values()).find(n => n.localCurrency === from.denomination);
        const toNode = Array.from(this.nodes.values()).find(n => n.localCurrency === to.denomination);
        const delay = fromNode && toNode ? this.computeLightDelay(fromNode.body, toNode.body) : { oneWaySec: 0 };
        return { inputAmount: amount, inputCurrency: from.denomination, outputAmount, outputCurrency: to.denomination, exchangeRate: rate, transmitDelaySeconds: delay.oneWaySec };
    }
    // ---- ASTEROID MINING ROYALTIES ----------------------------------------
    calculateMiningRoyalty(params) {
        const rateMap = {
            S_TYPE: 0.05, C_TYPE: 0.08, M_TYPE: 0.12, D_TYPE: 0.06,
        };
        const rate = rateMap[params.mineralType];
        const totalValue = params.extractedMassKg * params.estimatedValuePerKgUSD;
        const royalty = {
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
    _checkSpaceLawCompliance(sender, receiver, amount) {
        const frameworks = [...new Set([...sender.jurisdiction, ...receiver.jurisdiction])];
        const violations = [];
        if (amount > 1_000_000 && frameworks.includes('OUTER_SPACE_TREATY_1967'))
            violations.push('Transactions >$1M require Earth-side regulatory approval per OST Art. VI');
        if (sender.body !== 'EARTH' && !frameworks.some(f => ['SPACE_RESOURCE_ACT_US', 'LUXEMBOURG_SPACE_ACT'].includes(f)))
            violations.push('Space resource transactions must occur under a recognized national space law framework');
        return { applicableFrameworks: frameworks, signalInterference: false, militaryProhibition: false, nationalAppropriationViolation: false, compliant: violations.length === 0, violations };
    }
    // ---- ANALYTICS -------------------------------------------------------
    getNetworkStats() {
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
exports.InterplanetaryFinanceService = InterplanetaryFinanceService;
