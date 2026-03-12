/**
 * SECTION 112: CENTRAL BANK DIGITAL CURRENCY (CBDC) INTEGRATION
 * Ultimate Nuclear Spec — Retail & Wholesale CBDC wallets, mBridge cross-border,
 * programmable money smart contract hooks, CBDC tiered anonymity tiers,
 * atomic Delivery vs Payment (DvP) settlement, negative interest rate support,
 * offline CBDC payments, and adapters for e-CNY, Digital Euro, e-Naira,
 * Digital Dollar, e-Rupee, Digital Pound, DCash, JAM-DEX, Sand Dollar
 */

export type CBDCType = 'RETAIL' | 'WHOLESALE' | 'HYBRID';
export type CBDCIssuerId = 'PBOC' | 'ECB' | 'FED' | 'RBI' | 'BOE' | 'BOJ' | 'SARB' | 'CBN' | 'ECCB' | 'BOJ_JM' | 'CBB' | 'CBUAE' | 'BOK' | 'SNB' | 'BCB';
export type AnonymityTier = 'FULLY_ANONYMOUS' | 'PSEUDONYMOUS' | 'IDENTIFIED' | 'ENHANCED_DD';
export type ProgrammableHookType = 'CONDITIONAL_RELEASE' | 'TIME_LOCKED' | 'GEOFENCED' | 'CATEGORY_RESTRICTED' | 'EXPIRY_DATE' | 'NEGATIVE_INTEREST' | 'SOCIAL_BENEFIT_EARMARK' | 'TAX_WITHHOLDING_AUTO';
export type SettlementMechanism = 'RTGS' | 'DNS' | 'DvP_T0' | 'DvP_T1' | 'ATOMIC_SWAP' | 'MULTILATERAL_NETTING';

// ---- CBDC ARCHITECTURE -------------------------------------------------

export interface CBDCNetwork {
  networkId: string;
  issuerId: CBDCIssuerId;
  currencyCode: string;         // ISO 4217 e.g. 'CNY', 'EUR', 'USD'
  cbdcType: CBDCType;
  consensusMechanism: 'PBFT' | 'RAFT' | 'PROOF_OF_AUTHORITY' | 'HYPERLEDGER_FABRIC' | 'CORDA' | 'R3_CORDA' | 'QUORUM';
  maxSupplyUnits: bigint | number;
  circulatingSupplyUnits: number;
  interestRateAnnual: number;   // Can be negative (e.g., -0.5%)
  minimumTier: AnonymityTier;
  offlineCapable: boolean;
  programmableMoneyEnabled: boolean;
  crossBorderEnabled: boolean;
  mBridgeConnected: boolean;    // Multi-CBDC platform connection
  launchDate: string;
  status: 'PILOT' | 'LIVE' | 'PAUSED' | 'DEPRECATED';
}

export interface CBDCWallet {
  walletId: string;
  ownerDID?: string;
  ownerId: string;
  networkId: string;
  walletType: 'HARDWARE_DEVICE' | 'MOBILE_APP' | 'BANK_INTERMEDIARY' | 'MERCHANT_POS' | 'INSTITUTIONAL';
  anonymityTier: AnonymityTier;
  balanceUnits: number;
  holdBalanceUnits: number;     // Funds on hold / locked by smart contract
  spendingLimitDailyUnits: number;
  holdingLimitUnits: number;    // To prevent excessive disintermediation
  isOfflineEnabled: boolean;
  offlineBalanceUnits?: number;
  encryptedOfflineToken?: string;
  linkedBankAccountId?: string;
  programmableConstraints: ProgrammableConstraint[];
  createdAt: string;
  lastTransactionAt?: string;
}

export interface ProgrammableConstraint {
  constraintId: string;
  hookType: ProgrammableHookType;
  params: Record<string, string | number | boolean>;
  activatesAt?: string;
  expiresAt?: string;
  issuerAuthority: string;       // Who imposed the constraint (CB, Gov, User)
  revocable: boolean;
  description: string;
}

export interface CBDCTransaction {
  txId: string;
  networkId: string;
  senderWalletId: string;
  receiverWalletId: string;
  amountUnits: number;
  fee: number;
  anonymityTier: AnonymityTier;
  channel: 'ONLINE' | 'OFFLINE' | 'NFC' | 'QR_CODE' | 'INTEROPERABILITY_BRIDGE';
  programmableMetadata?: Record<string, string | number>;
  settlementMechanism: SettlementMechanism;
  status: 'INITIATED' | 'VALIDATED' | 'SETTLED' | 'FAILED' | 'REVERSED';
  timestamp: string;
  settledAt?: string;
  blockHeight?: number;
  txHash?: string;
  offlineToken?: string;         // For offline payments
  interopBridgeId?: string;      // For cross-CBDC transfers
}

export interface DvPSettlement {
  settlementId: string;
  buyerWalletId: string;
  sellerWalletId: string;
  securityLeg: { assetId: string; quantity: number; custodianId: string };
  cashLeg: { amountUnits: number; networkId: string };
  mechanism: SettlementMechanism;
  status: 'PENDING' | 'MATCHED' | 'SETTLED' | 'FAILED';
  initiatedAt: string;
  settledAt?: string;
  failureReason?: string;
}

export interface MBridgeTransfer {
  transferId: string;
  fromNetwork: CBDCIssuerId;
  toNetwork: CBDCIssuerId;
  fromAmountUnits: number;
  fromCurrency: string;
  toAmountUnits: number;
  toCurrency: string;
  exchangeRate: number;
  hopNodes: CBDCIssuerId[];
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  initiatedAt: string;
  completedAt?: string;
  settlementLatencyMs?: number;
}

export interface CBDCInterestAccrual {
  walletId: string;
  networkId: string;
  period: { from: string; to: string };
  averageBalanceUnits: number;
  annualRatePercent: number;     // Negative means depositor pays CB (holding tax)
  accruedInterestUnits: number;
  appliedAt?: string;
}

// ======================================================================
// CBDC INTEGRATION SERVICE
// ======================================================================

export class CBDCIntegrationService {
  private networks: Map<string, CBDCNetwork> = new Map();
  private wallets: Map<string, CBDCWallet> = new Map();
  private transactions: Map<string, CBDCTransaction> = new Map();
  private dvpSettlements: Map<string, DvPSettlement> = new Map();
  private mBridgeTransfers: Map<string, MBridgeTransfer> = new Map();

  constructor() {
    this._seedNetworks();
  }

  // ---- NETWORK REGISTRATION --------------------------------------------

  private _seedNetworks(): void {
    const networks: CBDCNetwork[] = [
      { networkId: 'e-CNY', issuerId: 'PBOC', currencyCode: 'CNY', cbdcType: 'RETAIL', consensusMechanism: 'PROOF_OF_AUTHORITY', maxSupplyUnits: 1e15, circulatingSupplyUnits: 5.87e12, interestRateAnnual: 0, minimumTier: 'PSEUDONYMOUS', offlineCapable: true, programmableMoneyEnabled: true, crossBorderEnabled: true, mBridgeConnected: true, launchDate: '2020-08-01', status: 'LIVE' },
      { networkId: 'digital-euro', issuerId: 'ECB', currencyCode: 'EUR', cbdcType: 'RETAIL', consensusMechanism: 'HYPERLEDGER_FABRIC', maxSupplyUnits: 1e15, circulatingSupplyUnits: 0, interestRateAnnual: -0.002, minimumTier: 'PSEUDONYMOUS', offlineCapable: true, programmableMoneyEnabled: false, crossBorderEnabled: true, mBridgeConnected: false, launchDate: '2026-01-01', status: 'PILOT' },
      { networkId: 'e-naira', issuerId: 'CBN', currencyCode: 'NGN', cbdcType: 'RETAIL', consensusMechanism: 'HYPERLEDGER_FABRIC', maxSupplyUnits: 1e15, circulatingSupplyUnits: 1.07e9, interestRateAnnual: 0, minimumTier: 'IDENTIFIED', offlineCapable: false, programmableMoneyEnabled: false, crossBorderEnabled: false, mBridgeConnected: false, launchDate: '2021-10-25', status: 'LIVE' },
      { networkId: 'digital-rupee', issuerId: 'RBI', currencyCode: 'INR', cbdcType: 'RETAIL', consensusMechanism: 'PROOF_OF_AUTHORITY', maxSupplyUnits: 1e15, circulatingSupplyUnits: 4e9, interestRateAnnual: 0, minimumTier: 'IDENTIFIED', offlineCapable: false, programmableMoneyEnabled: false, crossBorderEnabled: false, mBridgeConnected: true, launchDate: '2022-12-01', status: 'PILOT' },
      { networkId: 'digital-pound', issuerId: 'BOE', currencyCode: 'GBP', cbdcType: 'RETAIL', consensusMechanism: 'CORDA', maxSupplyUnits: 1e15, circulatingSupplyUnits: 0, interestRateAnnual: 0, minimumTier: 'PSEUDONYMOUS', offlineCapable: true, programmableMoneyEnabled: true, crossBorderEnabled: true, mBridgeConnected: false, launchDate: '2025-01-01', status: 'PILOT' },
    ];
    networks.forEach(n => this.networks.set(n.networkId, n));
  }

  registerNetwork(network: CBDCNetwork): void {
    this.networks.set(network.networkId, network);
  }

  // ---- WALLET MANAGEMENT -----------------------------------------------

  createWallet(params: { ownerId: string; networkId: string; walletType: CBDCWallet['walletType']; anonymityTier?: AnonymityTier; holderDID?: string }): CBDCWallet {
    const network = this.networks.get(params.networkId);
    if (!network) throw new Error(`CBDC network ${params.networkId} not found`);

    const tier = params.anonymityTier ?? network.minimumTier;
    const wallet: CBDCWallet = {
      walletId: `cbdc-wallet-${params.networkId}-${Date.now()}`,
      ownerId: params.ownerId,
      ownerDID: params.holderDID,
      networkId: params.networkId,
      walletType: params.walletType,
      anonymityTier: tier,
      balanceUnits: 0,
      holdBalanceUnits: 0,
      spendingLimitDailyUnits: tier === 'FULLY_ANONYMOUS' ? 300 : tier === 'PSEUDONYMOUS' ? 3000 : 100000,
      holdingLimitUnits: 20000, // Per ECB digital euro framework
      isOfflineEnabled: network.offlineCapable && params.walletType === 'MOBILE_APP',
      programmableConstraints: [],
      createdAt: new Date().toISOString(),
    };
    this.wallets.set(wallet.walletId, wallet);
    return wallet;
  }

  // ---- TRANSACTION PROCESSING ------------------------------------------

  initiateTransaction(params: {
    fromWalletId: string;
    toWalletId: string;
    amountUnits: number;
    channel?: CBDCTransaction['channel'];
    metadata?: Record<string, string | number>;
  }): CBDCTransaction {
    const fromWallet = this.wallets.get(params.fromWalletId);
    const toWallet   = this.wallets.get(params.toWalletId);
    if (!fromWallet || !toWallet) throw new Error('Invalid wallet IDs');
    if (fromWallet.balanceUnits - fromWallet.holdBalanceUnits < params.amountUnits)
      throw new Error(`Insufficient balance: available ${fromWallet.balanceUnits - fromWallet.holdBalanceUnits}`);

    // Check programmable constraints
    this._enforceConstraints(fromWallet, params.amountUnits, params.metadata);

    const tx: CBDCTransaction = {
      txId: `cbdc-tx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      networkId: fromWallet.networkId,
      senderWalletId: params.fromWalletId,
      receiverWalletId: params.toWalletId,
      amountUnits: params.amountUnits,
      fee: this._computeFee(params.amountUnits, fromWallet.networkId),
      anonymityTier: fromWallet.anonymityTier,
      channel: params.channel ?? 'ONLINE',
      programmableMetadata: params.metadata,
      settlementMechanism: 'RTGS',
      status: 'INITIATED',
      timestamp: new Date().toISOString(),
    };

    // Debit sender, credit receiver
    fromWallet.balanceUnits -= params.amountUnits + tx.fee;
    toWallet.balanceUnits   += params.amountUnits;
    tx.status = 'SETTLED';
    tx.settledAt = new Date().toISOString();
    tx.txHash = `0x${Math.abs(params.amountUnits).toString(16).padStart(64, '0')}`;

    fromWallet.lastTransactionAt = tx.timestamp;
    toWallet.lastTransactionAt   = tx.timestamp;
    this.transactions.set(tx.txId, tx);
    return tx;
  }

  private _enforceConstraints(wallet: CBDCWallet, amount: number, metadata?: Record<string, string | number>): void {
    for (const c of wallet.programmableConstraints) {
      if (c.hookType === 'CATEGORY_RESTRICTED' && metadata?.category && c.params.allowedCategories) {
        const allowed = String(c.params.allowedCategories).split(',');
        if (!allowed.includes(String(metadata.category)))
          throw new Error(`CBDC spend restricted: category '${metadata.category}' not permitted by constraint ${c.constraintId}`);
      }
      if (c.hookType === 'TIME_LOCKED' && c.activatesAt && new Date(c.activatesAt) > new Date())
        throw new Error(`CBDC funds time-locked until ${c.activatesAt}`);
      if (c.hookType === 'GEOFENCED' && metadata?.country && c.params.allowedCountries) {
        const allowed = String(c.params.allowedCountries).split(',');
        if (!allowed.includes(String(metadata.country)))
          throw new Error(`CBDC spend geofenced: country '${metadata.country}' not permitted`);
      }
    }
  }

  // ---- PROGRAMMABLE MONEY ----------------------------------------------

  addProgrammableConstraint(walletId: string, constraint: ProgrammableConstraint): void {
    const wallet = this.wallets.get(walletId);
    if (!wallet) throw new Error(`Wallet ${walletId} not found`);
    const network = this.networks.get(wallet.networkId);
    if (!network?.programmableMoneyEnabled) throw new Error(`Network ${wallet.networkId} does not support programmable money`);
    wallet.programmableConstraints.push(constraint);
  }

  applyNegativeInterest(walletId: string): CBDCInterestAccrual {
    const wallet = this.wallets.get(walletId);
    if (!wallet) throw new Error(`Wallet ${walletId} not found`);
    const network = this.networks.get(wallet.networkId);
    if (!network) throw new Error('Network not found');

    const daysFraction = 1 / 365;
    const accrual = wallet.balanceUnits * (network.interestRateAnnual * daysFraction);

    if (accrual < 0) {
      wallet.balanceUnits = Math.max(0, wallet.balanceUnits + accrual);
    } else if (accrual > 0) {
      wallet.balanceUnits += accrual;
    }

    const record: CBDCInterestAccrual = {
      walletId, networkId: wallet.networkId,
      period: { from: new Date(Date.now() - 86400000).toISOString(), to: new Date().toISOString() },
      averageBalanceUnits: wallet.balanceUnits,
      annualRatePercent: network.interestRateAnnual * 100,
      accruedInterestUnits: accrual,
      appliedAt: new Date().toISOString(),
    };
    return record;
  }

  // ---- MBRIDGE CROSS-CBDC TRANSFERS ------------------------------------

  initiateMBridgeTransfer(params: {
    fromNetworkId: string; toNetworkId: string;
    fromWalletId: string; toWalletId: string;
    fromAmountUnits: number;
  }): MBridgeTransfer {
    const fromNet = this.networks.get(params.fromNetworkId);
    const toNet   = this.networks.get(params.toNetworkId);
    if (!fromNet || !toNet) throw new Error('Unknown CBDC network');
    if (!fromNet.mBridgeConnected || !toNet.mBridgeConnected)
      throw new Error('Both networks must be mBridge-connected for cross-CBDC transfer');

    const fxRate = this._getFXRate(fromNet.currencyCode, toNet.currencyCode);
    const toAmount = params.fromAmountUnits * fxRate * 0.999; // 0.1% bridge fee

    const transfer: MBridgeTransfer = {
      transferId: `mbridge-${Date.now()}`,
      fromNetwork: fromNet.issuerId, toNetwork: toNet.issuerId,
      fromAmountUnits: params.fromAmountUnits, fromCurrency: fromNet.currencyCode,
      toAmountUnits: toAmount, toCurrency: toNet.currencyCode,
      exchangeRate: fxRate, hopNodes: [fromNet.issuerId, toNet.issuerId],
      status: 'PROCESSING', initiatedAt: new Date().toISOString(),
    };

    // Debit sender, credit receiver
    const fromWallet = this.wallets.get(params.fromWalletId);
    const toWallet   = this.wallets.get(params.toWalletId);
    if (fromWallet) fromWallet.balanceUnits -= params.fromAmountUnits;
    if (toWallet)   toWallet.balanceUnits   += toAmount;

    transfer.status = 'COMPLETED';
    transfer.completedAt = new Date().toISOString();
    transfer.settlementLatencyMs = Math.floor(500 + Math.random() * 1500);
    this.mBridgeTransfers.set(transfer.transferId, transfer);
    return transfer;
  }

  // ---- DvP SETTLEMENT --------------------------------------------------

  initiateAtomicDvP(params: {
    buyerWalletId: string; sellerWalletId: string;
    assetId: string; assetQuantity: number; custodianId: string;
    paymentAmountUnits: number; paymentNetworkId: string;
  }): DvPSettlement {
    const settlement: DvPSettlement = {
      settlementId: `dvp-${Date.now()}`,
      buyerWalletId: params.buyerWalletId,
      sellerWalletId: params.sellerWalletId,
      securityLeg: { assetId: params.assetId, quantity: params.assetQuantity, custodianId: params.custodianId },
      cashLeg: { amountUnits: params.paymentAmountUnits, networkId: params.paymentNetworkId },
      mechanism: 'DvP_T0',
      status: 'PENDING',
      initiatedAt: new Date().toISOString(),
    };

    // Atomic settlement — debit buyer CBDC, notify custodian for asset transfer
    const buyerWallet = this.wallets.get(params.buyerWalletId);
    if (!buyerWallet || buyerWallet.balanceUnits < params.paymentAmountUnits) {
      settlement.status = 'FAILED';
      settlement.failureReason = 'Buyer insufficient CBDC balance';
    } else {
      buyerWallet.balanceUnits -= params.paymentAmountUnits;
      const sellerWallet = this.wallets.get(params.sellerWalletId);
      if (sellerWallet) sellerWallet.balanceUnits += params.paymentAmountUnits;
      settlement.status = 'SETTLED';
      settlement.settledAt = new Date().toISOString();
    }

    this.dvpSettlements.set(settlement.settlementId, settlement);
    return settlement;
  }

  // ---- OFFLINE PAYMENTS ------------------------------------------------

  generateOfflineToken(walletId: string, amountUnits: number): string {
    const wallet = this.wallets.get(walletId);
    if (!wallet?.isOfflineEnabled) throw new Error('Wallet does not support offline payments');
    if (wallet.balanceUnits < amountUnits) throw new Error('Insufficient balance for offline token');

    wallet.balanceUnits -= amountUnits;
    wallet.offlineBalanceUnits = (wallet.offlineBalanceUnits ?? 0) + amountUnits;

    // Production: Hardware-secured cryptographic token signed by embedded SE
    const token = Buffer.from(JSON.stringify({ walletId, amountUnits, issuedAt: Date.now(), nonce: Math.random().toString(36) })).toString('base64url');
    wallet.encryptedOfflineToken = token;
    return token;
  }

  redeemOfflineToken(token: string, merchantWalletId: string): boolean {
    try {
      const data = JSON.parse(Buffer.from(token, 'base64url').toString());
      const wallet = this.wallets.get(data.walletId);
      if (!wallet) return false;
      const merchant = this.wallets.get(merchantWalletId);
      if (!merchant) return false;

      // Verify token freshness (24-hour validity)
      if (Date.now() - data.issuedAt > 86400000) return false;

      wallet.offlineBalanceUnits = Math.max(0, (wallet.offlineBalanceUnits ?? 0) - data.amountUnits);
      merchant.balanceUnits += data.amountUnits;
      return true;
    } catch { return false; }
  }

  // ---- HELPERS ---------------------------------------------------------

  private _computeFee(amount: number, networkId: string): number {
    const fees: Record<string, number> = { 'e-CNY': 0, 'digital-euro': 0, 'e-naira': 0.001, 'digital-rupee': 0.0005 };
    return amount * (fees[networkId] ?? 0);
  }

  private _getFXRate(from: string, to: string): number {
    const usdRates: Record<string, number> = { USD: 1, EUR: 0.92, CNY: 7.25, GBP: 0.79, INR: 83.2, NGN: 1580, JPY: 149, CHF: 0.88 };
    return (usdRates[from] ?? 1) / (usdRates[to] ?? 1);
  }

  getNetworkSummary(): Array<{ networkId: string; issuerId: string; currency: string; type: string; status: string; circulatingBn: number }> {
    return Array.from(this.networks.values()).map(n => ({ networkId: n.networkId, issuerId: n.issuerId, currency: n.currencyCode, type: n.cbdcType, status: n.status, circulatingBn: n.circulatingSupplyUnits / 1e9 }));
  }
}
