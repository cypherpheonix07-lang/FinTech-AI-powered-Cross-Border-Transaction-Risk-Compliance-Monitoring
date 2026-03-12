/**
 * PATHGUARD PILLAR 4: SCALABILITY
 * Bank Integration Service — Foundation for ISO 20022/SWIFT connectivity
 * and traditional banking account linkage.
 */

export type BankConnectionStatus = 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'PENDING_MFA';

export interface BankAccount {
  id: string;
  institutionName: string;
  accountType: 'CHECKING' | 'SAVINGS' | 'TREASURY';
  currency: string;
  balance: number;
  lastSync: string;
}

export interface ISO20022Message {
  msgId: string;
  creDtTm: string;
  status: 'ACCP' | 'RJCT' | 'PDNG';
  reason?: string;
}

export class BankIntegrationService {
  private static instance: BankIntegrationService;
  private linkedAccounts: Map<string, BankAccount[]> = new Map();

  private constructor() {}

  public static getInstance(): BankIntegrationService {
    if (!BankIntegrationService.instance) {
      BankIntegrationService.instance = new BankIntegrationService();
    }
    return BankIntegrationService.instance;
  }

  /**
   * Simulate linking a bank account (Plaid/Finicity style).
   */
  async linkAccount(userId: string, institutionId: string): Promise<BankAccount> {
    const newAccount: BankAccount = {
      id: `acc-${Math.random().toString(36).substr(2, 9)}`,
      institutionName: institutionId === 'BANK_001' ? 'Global Trust Corp' : 'Sentinel Bank',
      accountType: 'TREASURY',
      currency: 'USD',
      balance: 1000000.00,
      lastSync: new Date().toISOString()
    };

    const userAccounts = this.linkedAccounts.get(userId) || [];
    userAccounts.push(newAccount);
    this.linkedAccounts.set(userId, userAccounts);

    console.log(`[Pillar-4] Bank account linked for user ${userId}: ${newAccount.institutionName}`);
    return newAccount;
  }

  /**
   * Process a transaction via traditional banking rails (Simulated ISO 20022).
   */
  async submitToRails(amount: number, currency: string, recipientIban: string): Promise<ISO20022Message> {
    console.log(`[Pillar-4] Formatting ISO 20022 pacs.008 message for ${amount} ${currency}`);
    
    // Simulation: Random success/failure logic
    const success = Math.random() > 0.05;

    return {
      msgId: `ISO-${Date.now()}`,
      creDtTm: new Date().toISOString(),
      status: success ? 'ACCP' : 'RJCT',
      reason: success ? undefined : 'INSUFFICIENT_LIQUIDITY_ON_RAILS'
    };
  }

  /**
   * Generate a SWIFT gpi tracking UETR for a transaction.
   */
  generateUETR(): string {
    return crypto.randomUUID();
  }
}

export const bankIntegrationService = BankIntegrationService.getInstance();
