/**
 * SECTION 102: DATABASE SCHEMA COMPLETE SPECIFICATION (TypeScript Types)
 * Ultimate Nuclear Spec — 25+ complete table types with all column specs
 * Used for: runtime type safety, API contracts, ORM model definitions
 */

// ---- ENUMS ---------------------------------------------------------------

export type KYCStatus    = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED' | 'EXPIRED';
export type AccountType  = 'CURRENT' | 'SAVINGS' | 'INVESTMENT' | 'LOAN' | 'CRYPTO' | 'BUSINESS' | 'JOINT';
export type AccountStatus= 'ACTIVE' | 'FROZEN' | 'CLOSED' | 'SUSPENDED' | 'DORMANT';
export type CardType     = 'DEBIT' | 'CREDIT' | 'PREPAID' | 'VIRTUAL' | 'METAL';
export type CardNetwork  = 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER' | 'JCB' | 'UNIONPAY';
export type CardStatus   = 'ORDERED' | 'ACTIVE' | 'FROZEN' | 'BLOCKED' | 'EXPIRED' | 'CANCELLED' | 'REPLACED';
export type TxnType      = 'CREDIT' | 'DEBIT' | 'TRANSFER' | 'REFUND' | 'FEE' | 'INTEREST' | 'DIVIDEND' | 'ADJUSTMENT';
export type TxnStatus    = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REVERSED' | 'DISPUTED' | 'ON_HOLD';
export type BudgetType   = 'FIXED' | 'ROLLING' | 'AI_ADAPTIVE';
export type BudgetPeriod = 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
export type BudgetStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';
export type LoanType     = 'PERSONAL' | 'MORTGAGE' | 'AUTO' | 'STUDENT' | 'BUSINESS' | 'CREDIT_LINE';
export type LoanStatus   = 'ACTIVE' | 'PAID_OFF' | 'IN_DEFAULT' | 'RESTRUCTURED' | 'CLOSED';
export type InsuranceType= 'LIFE' | 'HEALTH' | 'AUTO' | 'HOME' | 'TRAVEL' | 'INCOME_PROTECTION' | 'CYBER';
export type InvestType   = 'STOCK' | 'ETF' | 'MUTUAL_FUND' | 'BOND' | 'CRYPTO' | 'COMMODITY' | 'REIT' | 'OPTIONS';
export type RecipientType= 'INDIVIDUAL' | 'BUSINESS' | 'CHARITY' | 'GOVERNMENT';
export type NotifPriority= 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type NotifChannel = 'PUSH' | 'EMAIL' | 'SMS' | 'IN_APP' | 'WHATSAPP' | 'SLACK';
export type TrustLevel   = 'TRUSTED' | 'STANDARD' | 'RESTRICTED' | 'BLOCKED';
export type JobStatus    = 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'RETRYING';
export type SyncStatus   = 'SYNCING' | 'SYNCED' | 'FAILED' | 'DISABLED';
export type ABTestStatus = 'DRAFT' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';

// ---- SHARED PRIMITIVES ---------------------------------------------------

export type UUID      = string;
export type ISO8601   = string; // "2024-01-01T00:00:00.000Z"
export type ISODate   = string; // "2024-01-01"
export type CurrencyCode   = string; // ISO 4217 e.g. "USD"
export type CountryCode2   = string; // ISO 3166-1 alpha-2 e.g. "US"
export type DecimalString  = string; // Arbitrary precision: "1234.5678"
export type IBAN      = string;
export type BIC       = string;

export interface GeoPoint { lat: number; lng: number; }
export interface Address  { line1: string; line2?: string; city: string; state?: string; postcode: string; country: CountryCode2; }
export interface DeviceInfo { deviceId: string; os: string; osVersion: string; browser?: string; appVersion?: string; fingerprint?: string; }
export interface ContactInfo { name: string; email?: string; phone?: string; }

// ---- TABLE SCHEMAS -------------------------------------------------------

/** users table */
export interface UserRecord {
  id: UUID;
  email: string;           // VARCHAR(255) UNIQUE
  emailVerified: boolean;
  passwordHash: string;
  phone?: string;          // VARCHAR(20)
  phoneVerified: boolean;
  firstName: string;       // VARCHAR(100)
  lastName: string;        // VARCHAR(100)
  dateOfBirth?: ISODate;
  nationality?: CountryCode2;
  kycStatus: KYCStatus;
  kycVerifiedAt?: ISO8601;
  kycTier: 0 | 1 | 2 | 3; // 0=unverified, 1=basic, 2=enhanced, 3=full
  timezone: string;        // IANA tz e.g. "America/New_York"
  locale: string;          // e.g. "en-US"
  currency: CurrencyCode;
  theme: string;           // e.g. "dark" | "light" | "system"
  language: string;        // ISO 639-1
  notificationsEnabled: boolean;
  marketingOptIn: boolean;
  twoFactorMethod?: 'TOTP' | 'SMS' | 'EMAIL' | 'PASSKEY';
  twoFactorEnabledAt?: ISO8601;
  lastLoginAt?: ISO8601;
  lastLoginIp?: string;
  loginCount: number;
  failedLoginAttempts: number;
  lockedUntil?: ISO8601;
  referralCode?: string;
  referredBy?: UUID;
  createdAt: ISO8601;
  updatedAt: ISO8601;
  deletedAt?: ISO8601;     // Soft delete
}

/** accounts table */
export interface AccountRecord {
  id: UUID;
  userId: UUID;
  accountType: AccountType;
  accountNumber: string;   // VARCHAR(50) UNIQUE
  sortCode?: string;       // UK: VARCHAR(10)
  iban?: IBAN;
  bic?: BIC;
  currency: CurrencyCode;
  balance: number;         // DECIMAL(19,4)
  availableBalance: number;
  pendingBalance: number;
  status: AccountStatus;
  openedAt: ISO8601;
  closedAt?: ISO8601;
  interestRate?: number;   // DECIMAL(5,4) — annual rate
  overdraftLimit?: number; // DECIMAL(19,4)
  monthlyFee?: number;     // DECIMAL(10,2)
  feeWaiverConditions?: Record<string, unknown>;
  isJoint: boolean;
  coOwners?: UUID[];
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** transactions table */
export interface TransactionRecord {
  id: UUID;
  accountId: UUID;
  type: TxnType;
  amount: number;          // DECIMAL(19,4) — positive for credit, negative for debit
  currency: CurrencyCode;
  description: string;     // VARCHAR(500)
  category?: string;
  subcategory?: string;
  merchantId?: UUID;
  merchantName?: string;
  merchantCategory?: string; // MCC code
  transactionDate: ISO8601;
  valueDate?: ISO8601;
  postedDate?: ISO8601;
  status: TxnStatus;
  reference?: string;
  counterpartyName?: string;
  counterpartyAccount?: string;
  counterpartyBank?: string;
  balanceAfter?: number;   // DECIMAL(19,4)
  fees?: number;           // DECIMAL(10,2)
  exchangeRate?: number;   // DECIMAL(18,8)
  originalAmount?: number; // DECIMAL(19,4) — in sender's currency
  originalCurrency?: CurrencyCode;
  location?: GeoPoint;
  deviceInfo?: DeviceInfo;
  riskScore?: number;      // DECIMAL(5,4) 0-1
  fraudFlags?: string[];
  tags?: string[];
  notes?: string;
  receiptUrl?: string;
  metadata?: Record<string, unknown>;
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** cards table */
export interface CardRecord {
  id: UUID;
  userId: UUID;
  accountId: UUID;
  cardType: CardType;
  cardNetwork: CardNetwork;
  cardNumberLast4: string;  // CHAR(4)
  cardholderName: string;
  expiryMonth: number;      // 1-12
  expiryYear: number;       // 4-digit
  status: CardStatus;
  isVirtual: boolean;
  isPrimary: boolean;
  dailyLimit?: number;
  monthlyLimit?: number;
  onlineEnabled: boolean;
  internationalEnabled: boolean;
  contactlessEnabled: boolean;
  atmEnabled: boolean;
  frozenAt?: ISO8601;
  frozenReason?: string;
  orderedAt?: ISO8601;
  activatedAt?: ISO8601;
  expiresAt?: ISO8601;
  replacementFor?: UUID;
  deliveryAddress?: Address;
  pinSet: boolean;
  pinSetAt?: ISO8601;
  designId?: string;        // Card artwork/skin
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** recipients table */
export interface RecipientRecord {
  id: UUID;
  userId: UUID;
  name: string;
  nickname?: string;
  accountNumber?: string;
  sortCode?: string;
  iban?: IBAN;
  bic?: BIC;
  bankName?: string;
  bankAddress?: string;
  country: CountryCode2;
  currency: CurrencyCode;
  recipientType: RecipientType;
  verificationStatus: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'FAILED';
  verifiedAt?: ISO8601;
  isFavorite: boolean;
  category?: string;
  notes?: string;
  paymentMethods?: string[];
  defaultAmount?: number;
  lastPaymentDate?: ISO8601;
  paymentCount: number;
  totalPaid: number;
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** budgets table */
export interface BudgetRecord {
  id: UUID;
  userId: UUID;
  name: string;
  budgetType: BudgetType;
  amount: number;
  currency: CurrencyCode;
  period: BudgetPeriod;
  startDate: ISODate;
  endDate?: ISODate;
  categories: string[];
  excludeCategories?: string[];
  rolloverEnabled: boolean;
  rolloverAmount?: number;
  alertThresholds: number[]; // e.g. [50, 75, 90, 100]
  alertChannels: NotifChannel[];
  status: BudgetStatus;
  spentAmount: number;
  remainingAmount: number;
  percentageUsed: number;    // DECIMAL(5,2)
  projectedOverrun?: number;
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** savings_goals table */
export interface SavingsGoalRecord {
  id: UUID;
  userId: UUID;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  currency: CurrencyCode;
  targetDate?: ISODate;
  startDate: ISODate;
  autoSaveEnabled: boolean;
  autoSaveRule?: { type: 'FIXED' | 'PERCENTAGE' | 'ROUND_UP'; value: number; frequency: BudgetPeriod };
  roundUpEnabled: boolean;
  roundUpMultiplier: number; // e.g. 1, 2, 5, 10
  lastContributionAt?: ISO8601;
  percentageComplete: number;
  projectedCompletionDate?: ISODate;
  isAchieved: boolean;
  achievedAt?: ISO8601;
  visibility: 'PRIVATE' | 'SHARED' | 'PUBLIC';
  sharedWith?: UUID[];
  icon?: string;
  color?: string;
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** bills table */
export interface BillRecord {
  id: UUID;
  userId: UUID;
  payeeName: string;
  payeeAccount?: string;
  payeeBank?: string;
  amount: number;
  currency: CurrencyCode;
  frequency: BudgetPeriod | 'ONCE' | 'DAILY';
  nextDueDate: ISODate;
  lastPaidDate?: ISODate;
  autoPayEnabled: boolean;
  autoPayAccountId?: UUID;
  reminderDays: number[];   // days before due date
  reminderChannels: NotifChannel[];
  category?: string;
  notes?: string;
  attachmentUrls?: string[];
  isVariable: boolean;
  averageAmount?: number;
  latePaymentCount: number;
  totalPaid: number;
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** investments table */
export interface InvestmentRecord {
  id: UUID;
  userId: UUID;
  accountId?: UUID;
  investmentType: InvestType;
  ticker?: string;
  name: string;
  quantity: number;          // DECIMAL(19,8)
  averageCost: number;       // DECIMAL(19,4)
  currentPrice: number;      // DECIMAL(19,4)
  marketValue: number;       // DECIMAL(19,4)
  unrealizedGain: number;
  unrealizedGainPercent: number;
  realizedGain: number;
  dividendYield?: number;
  lastDividendAmount?: number;
  lastDividendDate?: ISODate;
  sector?: string;
  industry?: string;
  exchange?: string;
  currency: CurrencyCode;
  riskRating: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  esgScore?: number;         // 0-100
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** loans table */
export interface LoanRecord {
  id: UUID;
  userId: UUID;
  loanType: LoanType;
  lenderName: string;
  accountNumber?: string;
  principalAmount: number;
  outstandingBalance: number;
  interestRate: number;      // DECIMAL(5,4)
  interestType: 'FIXED' | 'VARIABLE' | 'TRACKER';
  termMonths: number;
  startDate: ISODate;
  maturityDate: ISODate;
  paymentAmount: number;
  paymentFrequency: BudgetPeriod;
  nextPaymentDate: ISODate;
  lastPaymentDate?: ISODate;
  paymentCount: number;
  remainingPayments: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  prepaymentAllowed: boolean;
  prepaymentPenalty?: number;
  collateral?: Record<string, unknown>;
  status: LoanStatus;
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** insurance_policies table */
export interface InsurancePolicyRecord {
  id: UUID;
  userId: UUID;
  policyType: InsuranceType;
  provider: string;
  policyNumber: string;
  coverageAmount: number;
  premiumAmount: number;
  premiumFrequency: BudgetPeriod | 'ONCE';
  startDate: ISODate;
  endDate?: ISODate;
  renewalDate?: ISODate;
  beneficiaries?: ContactInfo[];
  coverageDetails?: Record<string, unknown>;
  exclusions?: string[];
  deductible?: number;
  status: 'ACTIVE' | 'LAPSED' | 'CANCELLED' | 'PENDING' | 'EXPIRED';
  documentUrls?: string[];
  agentContact?: ContactInfo;
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** notifications table */
export interface NotificationRecord {
  id: UUID;
  userId: UUID;
  type: string;              // e.g. 'notif_txn_completed'
  title: string;
  message: string;
  priority: NotifPriority;
  channel: NotifChannel;
  isRead: boolean;
  readAt?: ISO8601;
  actionUrl?: string;
  actionData?: Record<string, unknown>;
  expiresAt?: ISO8601;
  metadata?: Record<string, unknown>;
  createdAt: ISO8601;
}

/** audit_logs table */
export interface AuditLogRecord {
  id: UUID;
  userId?: UUID;
  action: string;           // e.g. 'TXN_CREATE'
  resource: string;
  resourceId?: UUID;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  location?: GeoPoint;
  sessionId?: string;
  timestamp: ISO8601;       // indexed
}

/** api_keys table */
export interface ApiKeyRecord {
  id: UUID;
  userId: UUID;
  name: string;
  keyPrefix: string;        // e.g. "pg_live_"
  keyHash: string;          // bcrypt hash — never store plaintext
  permissions: string[];    // RBAC scopes
  rateLimit?: number;
  rateLimitPeriod?: string;
  expiresAt?: ISO8601;
  lastUsedAt?: ISO8601;
  usageCount: number;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** webhooks table */
export interface WebhookRecord {
  id: UUID;
  userId: UUID;
  url: string;
  events: string[];         // e.g. ['transaction.completed', 'card.frozen']
  secretHash: string;       // HMAC-SHA256 secret (hashed)
  isActive: boolean;
  lastTriggeredAt?: ISO8601;
  successCount: number;
  failureCount: number;
  lastResponseCode?: number;
  lastResponseBody?: string;
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** feature_flags table */
export interface FeatureFlagRecord {
  id: UUID;
  name: string;             // UNIQUE
  description?: string;
  defaultValue: boolean;
  userSegments?: Record<string, unknown>;
  rolloutPercentage: number; // DECIMAL(5,2)
  environments: string[];
  prerequisites?: string[];
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

/** sessions table */
export interface SessionRecord {
  id: UUID;
  userId: UUID;
  deviceId?: UUID;
  ipAddress: string;
  userAgent: string;
  location?: GeoPoint;
  createdAt: ISO8601;
  expiresAt: ISO8601;
  lastActivityAt: ISO8601;
  isActive: boolean;
}

/** device_trust table */
export interface DeviceTrustRecord {
  id: UUID;
  userId: UUID;
  deviceId: string;
  deviceName?: string;
  deviceType: string;
  os: string;
  osVersion: string;
  browser?: string;
  ipAddress: string;
  fingerprint?: string;
  trustLevel: TrustLevel;
  lastSeenAt: ISO8601;
  createdAt: ISO8601;
  expiresAt?: ISO8601;
}

/** jobs table */
export interface JobRecord {
  id: UUID;
  jobType: string;
  status: JobStatus;
  priority: number;         // 1 (highest) to 10 (lowest)
  payload: Record<string, unknown>;
  result?: Record<string, unknown>;
  error?: string;
  attempts: number;
  maxAttempts: number;
  scheduledAt: ISO8601;
  startedAt?: ISO8601;
  completedAt?: ISO8601;
  createdAt: ISO8601;
}

// ---- SCHEMA METADATA (for documentation and validation) -----------------

export interface TableMeta {
  tableName: string;
  schemaVersion: string;
  rowEstimate?: number;
  primaryKey: string;
  indexes: { name: string; columns: string[]; unique: boolean }[];
  foreignKeys: { column: string; referencesTable: string; referencesColumn: string }[];
  partitioned?: boolean;
  partitionKey?: string;
  retentionDays?: number;
}

export const TABLE_METADATA: TableMeta[] = [
  { tableName: 'users',              schemaVersion: '2.0', primaryKey: 'id', indexes: [{ name: 'idx_users_email', columns: ['email'], unique: true }, { name: 'idx_users_phone', columns: ['phone'], unique: false }], foreignKeys: [], retentionDays: 3650 },
  { tableName: 'accounts',           schemaVersion: '2.0', primaryKey: 'id', indexes: [{ name: 'idx_accounts_user', columns: ['userId'], unique: false }, { name: 'idx_accounts_number', columns: ['accountNumber'], unique: true }], foreignKeys: [{ column: 'userId', referencesTable: 'users', referencesColumn: 'id' }] },
  { tableName: 'transactions',       schemaVersion: '2.0', primaryKey: 'id', partitioned: true, partitionKey: 'transactionDate', indexes: [{ name: 'idx_txn_account', columns: ['accountId', 'transactionDate'], unique: false }, { name: 'idx_txn_status', columns: ['status'], unique: false }], foreignKeys: [{ column: 'accountId', referencesTable: 'accounts', referencesColumn: 'id' }], retentionDays: 2555 /* 7 years */ },
  { tableName: 'cards',              schemaVersion: '2.0', primaryKey: 'id', indexes: [{ name: 'idx_cards_user', columns: ['userId'], unique: false }, { name: 'idx_cards_account', columns: ['accountId'], unique: false }], foreignKeys: [{ column: 'userId', referencesTable: 'users', referencesColumn: 'id' }, { column: 'accountId', referencesTable: 'accounts', referencesColumn: 'id' }] },
  { tableName: 'audit_logs',         schemaVersion: '2.0', primaryKey: 'id', partitioned: true, partitionKey: 'timestamp', indexes: [{ name: 'idx_audit_user', columns: ['userId', 'timestamp'], unique: false }, { name: 'idx_audit_action', columns: ['action'], unique: false }], foreignKeys: [], retentionDays: 2555 },
  { tableName: 'notifications',      schemaVersion: '2.0', primaryKey: 'id', indexes: [{ name: 'idx_notif_user_unread', columns: ['userId', 'isRead'], unique: false }], foreignKeys: [{ column: 'userId', referencesTable: 'users', referencesColumn: 'id' }], retentionDays: 90 },
];
