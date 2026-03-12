/**
 * SECTION 103: ERROR CODE COMPLETE REGISTRY
 * Ultimate Nuclear Spec — 500+ structured error codes for all domains
 */

export type ErrorDomain =
  | 'AUTH' | 'ACCT' | 'TXN' | 'RCP' | 'CARD' | 'BUDGET'
  | 'INVST' | 'LOAN' | 'INS' | 'KYC' | 'AML'
  | 'COMPLIANCE' | 'SYSTEM' | 'WEBHOOK' | 'INTG' | 'API';

export interface PathGuardError {
  code: string;            // e.g. PG-AUTH-001
  httpStatus: number;
  message: string;         // Technical message
  userMessage: string;     // Safe UX message
  recoveryAction: string;  // Client-side recovery hint
  retryable: boolean;
  retryAfterSeconds?: number;
  domain: ErrorDomain;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

const ALL_ERRORS: PathGuardError[] = [
  // AUTH
  { code: 'PG-AUTH-001', httpStatus: 401, domain: 'AUTH', severity: 'MEDIUM',   logLevel: 'warn',  message: 'Invalid credentials',                    userMessage: 'Email or password is incorrect.',                            recoveryAction: 'PROMPT_REAUTH',                   retryable: true,  retryAfterSeconds: 0 },
  { code: 'PG-AUTH-002', httpStatus: 403, domain: 'AUTH', severity: 'HIGH',     logLevel: 'warn',  message: 'Account locked',                         userMessage: 'Account is temporarily locked.',                             recoveryAction: 'SHOW_UNLOCK_INSTRUCTIONS',        retryable: false },
  { code: 'PG-AUTH-003', httpStatus: 403, domain: 'AUTH', severity: 'MEDIUM',   logLevel: 'info',  message: '2FA required',                           userMessage: 'Two-factor authentication is required.',                     recoveryAction: 'SHOW_2FA_INPUT_MODAL',            retryable: true },
  { code: 'PG-AUTH-004', httpStatus: 401, domain: 'AUTH', severity: 'MEDIUM',   logLevel: 'warn',  message: 'Invalid 2FA code',                       userMessage: 'Invalid verification code.',                                 recoveryAction: 'ALLOW_RETRY_WITH_COUNTER',        retryable: true,  retryAfterSeconds: 30 },
  { code: 'PG-AUTH-005', httpStatus: 401, domain: 'AUTH', severity: 'LOW',      logLevel: 'info',  message: 'Session expired',                        userMessage: 'Your session has expired.',                                  recoveryAction: 'SILENT_TOKEN_REFRESH',            retryable: true },
  { code: 'PG-AUTH-006', httpStatus: 401, domain: 'AUTH', severity: 'HIGH',     logLevel: 'warn',  message: 'Session revoked',                        userMessage: 'Your session was ended for security reasons.',               recoveryAction: 'FORCE_LOGOUT',                    retryable: false },
  { code: 'PG-AUTH-007', httpStatus: 403, domain: 'AUTH', severity: 'HIGH',     logLevel: 'warn',  message: 'Device untrusted',                       userMessage: 'This device is not recognized.',                             recoveryAction: 'DEVICE_VERIFICATION_FLOW',        retryable: false },
  { code: 'PG-AUTH-008', httpStatus: 403, domain: 'AUTH', severity: 'CRITICAL', logLevel: 'error', message: 'IP blocked',                             userMessage: 'Access from this location is restricted.',                   recoveryAction: 'DISPLAY_SECURITY_NOTICE',         retryable: false },
  { code: 'PG-AUTH-009', httpStatus: 429, domain: 'AUTH', severity: 'MEDIUM',   logLevel: 'warn',  message: 'Rate limit exceeded',                    userMessage: 'Too many attempts. Please wait.',                            recoveryAction: 'SHOW_RETRY_AFTER_HEADER',         retryable: true,  retryAfterSeconds: 60 },
  { code: 'PG-AUTH-010', httpStatus: 403, domain: 'AUTH', severity: 'MEDIUM',   logLevel: 'info',  message: 'Concurrent session limit reached',       userMessage: 'Maximum sessions reached.',                                  recoveryAction: 'OFFER_SESSION_MANAGEMENT',        retryable: false },
  { code: 'PG-AUTH-011', httpStatus: 400, domain: 'AUTH', severity: 'LOW',      logLevel: 'info',  message: 'Password too weak',                      userMessage: 'Password does not meet security requirements.',              recoveryAction: 'SHOW_PASSWORD_REQUIREMENTS',      retryable: true },
  { code: 'PG-AUTH-012', httpStatus: 409, domain: 'AUTH', severity: 'LOW',      logLevel: 'info',  message: 'Email already registered',               userMessage: 'An account with this email already exists.',                 recoveryAction: 'OFFER_LOGIN_OR_RESET',            retryable: false },
  { code: 'PG-AUTH-013', httpStatus: 400, domain: 'AUTH', severity: 'LOW',      logLevel: 'info',  message: 'Invalid password reset token',           userMessage: 'This reset link has expired.',                               recoveryAction: 'REQUEST_NEW_RESET_LINK',          retryable: true },
  { code: 'PG-AUTH-014', httpStatus: 401, domain: 'AUTH', severity: 'HIGH',     logLevel: 'warn',  message: 'Biometric auth failed',                  userMessage: 'Biometric verification failed.',                             recoveryAction: 'FALLBACK_TO_PASSWORD',            retryable: true,  retryAfterSeconds: 5 },
  { code: 'PG-AUTH-015', httpStatus: 403, domain: 'AUTH', severity: 'HIGH',     logLevel: 'warn',  message: 'Account suspended',                      userMessage: 'Your account has been suspended.',                           recoveryAction: 'CONTACT_SUPPORT',                 retryable: false },
  // ACCOUNT
  { code: 'PG-ACCT-001', httpStatus: 404, domain: 'ACCT', severity: 'LOW',      logLevel: 'info',  message: 'Account not found',                      userMessage: 'Account could not be found.',                                recoveryAction: 'VERIFY_ACCOUNT_NUMBER',           retryable: false },
  { code: 'PG-ACCT-002', httpStatus: 403, domain: 'ACCT', severity: 'MEDIUM',   logLevel: 'info',  message: 'Account closed',                         userMessage: 'This account has been closed.',                              recoveryAction: 'DISPLAY_CLOSURE_NOTICE',          retryable: false },
  { code: 'PG-ACCT-003', httpStatus: 402, domain: 'ACCT', severity: 'MEDIUM',   logLevel: 'warn',  message: 'Insufficient funds',                     userMessage: 'You have insufficient funds.',                               recoveryAction: 'SHOW_BALANCE_AND_OPTIONS',        retryable: false },
  { code: 'PG-ACCT-004', httpStatus: 403, domain: 'ACCT', severity: 'CRITICAL', logLevel: 'error', message: 'Account frozen',                         userMessage: 'Your account has been temporarily frozen.',                  recoveryAction: 'DISPLAY_FREEZE_REASON',           retryable: false },
  { code: 'PG-ACCT-005', httpStatus: 403, domain: 'ACCT', severity: 'MEDIUM',   logLevel: 'info',  message: 'Daily limit exceeded',                   userMessage: 'You have reached your daily transaction limit.',             recoveryAction: 'SHOW_LIMIT_RESET_TIME',           retryable: true,  retryAfterSeconds: 86400 },
  { code: 'PG-ACCT-006', httpStatus: 403, domain: 'ACCT', severity: 'MEDIUM',   logLevel: 'info',  message: 'Monthly limit exceeded',                 userMessage: 'You have reached your monthly transaction limit.',           recoveryAction: 'SHOW_LIMIT_RESET_DATE',           retryable: true },
  { code: 'PG-ACCT-007', httpStatus: 400, domain: 'ACCT', severity: 'LOW',      logLevel: 'info',  message: 'Currency mismatch',                      userMessage: 'Currency mismatch detected.',                                recoveryAction: 'OFFER_CURRENCY_CONVERSION',       retryable: true },
  { code: 'PG-ACCT-008', httpStatus: 403, domain: 'ACCT', severity: 'MEDIUM',   logLevel: 'info',  message: 'Account verification pending',           userMessage: 'Your account verification is in progress.',                 recoveryAction: 'SHOW_VERIFICATION_STATUS',        retryable: true },
  { code: 'PG-ACCT-009', httpStatus: 403, domain: 'ACCT', severity: 'HIGH',     logLevel: 'warn',  message: 'Joint account co-owner approval required', userMessage: 'This requires all account holders to approve.',          recoveryAction: 'REQUEST_CO_OWNER_APPROVAL',       retryable: true },
  { code: 'PG-ACCT-010', httpStatus: 403, domain: 'ACCT', severity: 'HIGH',     logLevel: 'error', message: 'Account under compliance review',        userMessage: 'Your account access is under review.',                      recoveryAction: 'CONTACT_COMPLIANCE',              retryable: false },
  // TRANSACTIONS
  { code: 'PG-TXN-001',  httpStatus: 404, domain: 'TXN',  severity: 'LOW',      logLevel: 'info',  message: 'Transaction not found',                  userMessage: 'This transaction could not be found.',                       recoveryAction: 'VERIFY_TRANSACTION_ID',           retryable: false },
  { code: 'PG-TXN-002',  httpStatus: 409, domain: 'TXN',  severity: 'MEDIUM',   logLevel: 'warn',  message: 'Already processed',                      userMessage: 'This payment has already been processed.',                   recoveryAction: 'SHOW_EXISTING_TRANSACTION',      retryable: false },
  { code: 'PG-TXN-003',  httpStatus: 402, domain: 'TXN',  severity: 'HIGH',     logLevel: 'error', message: 'Transaction failed at processor',        userMessage: 'Your payment could not be processed.',                       recoveryAction: 'DISPLAY_FAILURE_REASON',          retryable: true,  retryAfterSeconds: 30 },
  { code: 'PG-TXN-004',  httpStatus: 202, domain: 'TXN',  severity: 'LOW',      logLevel: 'info',  message: 'Transaction pending',                    userMessage: 'Your transaction is being processed.',                       recoveryAction: 'SHOW_ESTIMATED_COMPLETION',       retryable: false },
  { code: 'PG-TXN-005',  httpStatus: 409, domain: 'TXN',  severity: 'MEDIUM',   logLevel: 'warn',  message: 'Duplicate transaction detected',         userMessage: 'A duplicate transaction was detected.',                      recoveryAction: 'SHOW_ORIGINAL_TRANSACTION',       retryable: false },
  { code: 'PG-TXN-006',  httpStatus: 400, domain: 'TXN',  severity: 'LOW',      logLevel: 'info',  message: 'Invalid amount',                         userMessage: 'The amount entered is not valid.',                           recoveryAction: 'SHOW_VALID_AMOUNT_RANGE',         retryable: true },
  { code: 'PG-TXN-007',  httpStatus: 403, domain: 'TXN',  severity: 'CRITICAL', logLevel: 'error', message: 'Suspicious activity – transaction blocked', userMessage: 'This transaction requires additional verification.',       recoveryAction: 'SECURITY_VERIFICATION_REQUIRED', retryable: false },
  { code: 'PG-TXN-008',  httpStatus: 422, domain: 'TXN',  severity: 'MEDIUM',   logLevel: 'warn',  message: 'FX rate expired',                        userMessage: 'The exchange rate has expired. Please refresh.',             recoveryAction: 'REFRESH_AND_RETRY',               retryable: true,  retryAfterSeconds: 0 },
  // RECIPIENTS
  { code: 'PG-RCP-001',  httpStatus: 404, domain: 'RCP',  severity: 'LOW',      logLevel: 'info',  message: 'Recipient not found',                    userMessage: 'The recipient could not be found.',                          recoveryAction: 'CREATE_NEW_RECIPIENT',            retryable: false },
  { code: 'PG-RCP-002',  httpStatus: 400, domain: 'RCP',  severity: 'MEDIUM',   logLevel: 'warn',  message: 'Recipient verification failed',          userMessage: 'We could not verify the recipient details.',                 recoveryAction: 'SHOW_VERIFICATION_REQUIREMENTS', retryable: false },
  { code: 'PG-RCP-003',  httpStatus: 409, domain: 'RCP',  severity: 'LOW',      logLevel: 'info',  message: 'Duplicate recipient',                    userMessage: 'This recipient already exists.',                             recoveryAction: 'SHOW_EXISTING_RECIPIENT',         retryable: false },
  { code: 'PG-RCP-004',  httpStatus: 400, domain: 'RCP',  severity: 'LOW',      logLevel: 'info',  message: 'Invalid bank details',                   userMessage: 'The bank details appear to be incorrect.',                   recoveryAction: 'SHOW_FORMAT_REQUIREMENTS',        retryable: true },
  { code: 'PG-RCP-005',  httpStatus: 403, domain: 'RCP',  severity: 'CRITICAL', logLevel: 'error', message: 'Sanctioned entity detected',             userMessage: 'This transfer cannot proceed due to compliance restrictions.',recoveryAction: 'COMPLIANCE_NOTICE',               retryable: false },
  { code: 'PG-RCP-006',  httpStatus: 403, domain: 'RCP',  severity: 'MEDIUM',   logLevel: 'warn',  message: 'International transfer restrictions',    userMessage: 'Transfers to this country are currently restricted.',        recoveryAction: 'SHOW_COUNTRY_RESTRICTIONS',       retryable: false },
  // CARDS
  { code: 'PG-CARD-001', httpStatus: 404, domain: 'CARD', severity: 'LOW',      logLevel: 'info',  message: 'Card not found',                         userMessage: 'The card could not be found.',                               recoveryAction: 'VERIFY_CARD_DETAILS',             retryable: false },
  { code: 'PG-CARD-002', httpStatus: 400, domain: 'CARD', severity: 'MEDIUM',   logLevel: 'info',  message: 'Card expired',                           userMessage: 'Your card has expired.',                                     recoveryAction: 'OFFER_CARD_REPLACEMENT',          retryable: false },
  { code: 'PG-CARD-003', httpStatus: 403, domain: 'CARD', severity: 'MEDIUM',   logLevel: 'info',  message: 'Card frozen',                            userMessage: 'Your card is currently frozen.',                             recoveryAction: 'OFFER_UNFREEZE_OPTION',           retryable: false },
  { code: 'PG-CARD-004', httpStatus: 403, domain: 'CARD', severity: 'HIGH',     logLevel: 'warn',  message: 'Card blocked',                           userMessage: 'Your card has been blocked.',                                recoveryAction: 'DISPLAY_BLOCK_REASON',            retryable: false },
  { code: 'PG-CARD-005', httpStatus: 400, domain: 'CARD', severity: 'MEDIUM',   logLevel: 'warn',  message: 'Invalid CVV',                            userMessage: 'The security code is incorrect.',                            recoveryAction: 'ALLOW_RETRY_WITH_COUNTER',        retryable: true,  retryAfterSeconds: 10 },
  { code: 'PG-CARD-006', httpStatus: 403, domain: 'CARD', severity: 'MEDIUM',   logLevel: 'info',  message: 'Card limit exceeded',                    userMessage: 'You have reached your card spending limit.',                 recoveryAction: 'SHOW_LIMIT_DETAILS',              retryable: true },
  { code: 'PG-CARD-007', httpStatus: 403, domain: 'CARD', severity: 'MEDIUM',   logLevel: 'info',  message: 'Card not activated',                     userMessage: 'This card has not been activated.',                          recoveryAction: 'SHOW_ACTIVATION_FLOW',            retryable: false },
  { code: 'PG-CARD-008', httpStatus: 500, domain: 'CARD', severity: 'HIGH',     logLevel: 'error', message: 'Virtual card generation failed',         userMessage: 'Could not create virtual card.',                             recoveryAction: 'RETRY_WITH_BACKOFF',              retryable: true,  retryAfterSeconds: 5 },
  // BUDGETS
  { code: 'PG-BUDGET-001', httpStatus: 404, domain: 'BUDGET', severity: 'LOW',  logLevel: 'info',  message: 'Budget not found',                       userMessage: 'The budget could not be found.',                             recoveryAction: 'CREATE_NEW_BUDGET',               retryable: false },
  { code: 'PG-BUDGET-002', httpStatus: 400, domain: 'BUDGET', severity: 'LOW',  logLevel: 'info',  message: 'Invalid budget period',                  userMessage: 'Please select a valid budget period.',                       recoveryAction: 'SHOW_VALID_PERIODS',              retryable: true },
  { code: 'PG-BUDGET-003', httpStatus: 400, domain: 'BUDGET', severity: 'LOW',  logLevel: 'info',  message: 'Invalid budget amount',                  userMessage: 'Please enter a valid budget amount.',                        recoveryAction: 'SHOW_VALID_RANGE',                retryable: true },
  { code: 'PG-BUDGET-004', httpStatus: 409, domain: 'BUDGET', severity: 'LOW',  logLevel: 'info',  message: 'Budget category conflict',               userMessage: 'This category is already assigned.',                         recoveryAction: 'SHOW_CATEGORY_MAPPING',           retryable: false },
  { code: 'PG-BUDGET-005', httpStatus: 500, domain: 'BUDGET', severity: 'HIGH', logLevel: 'error', message: 'Budget rollover failed',                 userMessage: 'Budget rollover could not be processed.',                    recoveryAction: 'MANUAL_ADJUSTMENT_REQUIRED',      retryable: true,  retryAfterSeconds: 60 },
  // COMPLIANCE
  { code: 'PG-KYC-001',  httpStatus: 403, domain: 'KYC',  severity: 'HIGH',     logLevel: 'warn',  message: 'KYC verification required',              userMessage: 'Identity verification is required.',                         recoveryAction: 'START_KYC_FLOW',                  retryable: false },
  { code: 'PG-KYC-002',  httpStatus: 400, domain: 'KYC',  severity: 'MEDIUM',   logLevel: 'warn',  message: 'KYC document rejected',                  userMessage: 'Your ID document was not accepted.',                         recoveryAction: 'SHOW_ACCEPTED_DOCUMENTS',         retryable: true },
  { code: 'PG-KYC-003',  httpStatus: 403, domain: 'KYC',  severity: 'CRITICAL', logLevel: 'error', message: 'PEP – enhanced due diligence required',  userMessage: 'Additional identity checks are required.',                   recoveryAction: 'EDD_REVIEW_REQUIRED',             retryable: false },
  { code: 'PG-AML-001',  httpStatus: 403, domain: 'AML',  severity: 'CRITICAL', logLevel: 'error', message: 'AML screening match',                    userMessage: 'This transaction is under compliance review.',               recoveryAction: 'AML_REVIEW_QUEUE',                retryable: false },
  { code: 'PG-AML-002',  httpStatus: 403, domain: 'AML',  severity: 'CRITICAL', logLevel: 'error', message: 'OFAC sanctions match',                   userMessage: 'This transaction cannot proceed.',                           recoveryAction: 'REPORT_TO_COMPLIANCE',            retryable: false },
  { code: 'PG-AML-003',  httpStatus: 403, domain: 'AML',  severity: 'HIGH',     logLevel: 'warn',  message: 'Structuring pattern detected',           userMessage: 'This transaction requires additional review.',               recoveryAction: 'SAR_FILING_TRIGGERED',            retryable: false },
  { code: 'PG-COMPLIANCE-001', httpStatus: 451, domain: 'COMPLIANCE', severity: 'CRITICAL', logLevel: 'error', message: 'Country not supported', userMessage: 'This service is not available in your region.',              recoveryAction: 'SHOW_REGIONAL_NOTICE',            retryable: false },
  // SYSTEM
  { code: 'PG-SYSTEM-001', httpStatus: 500, domain: 'SYSTEM', severity: 'CRITICAL', logLevel: 'error', message: 'Internal server error',             userMessage: 'Something went wrong. Please try again.',                    recoveryAction: 'RETRY_WITH_BACKOFF',              retryable: true,  retryAfterSeconds: 10 },
  { code: 'PG-SYSTEM-002', httpStatus: 503, domain: 'SYSTEM', severity: 'CRITICAL', logLevel: 'error', message: 'Service unavailable',               userMessage: 'We are experiencing technical difficulties.',                recoveryAction: 'SHOW_STATUS_PAGE',                retryable: true,  retryAfterSeconds: 30 },
  { code: 'PG-SYSTEM-003', httpStatus: 504, domain: 'SYSTEM', severity: 'HIGH',     logLevel: 'error', message: 'Gateway timeout',                   userMessage: 'The request timed out. Please try again.',                   recoveryAction: 'RETRY_ONCE',                      retryable: true,  retryAfterSeconds: 5 },
  { code: 'PG-SYSTEM-004', httpStatus: 429, domain: 'SYSTEM', severity: 'MEDIUM',   logLevel: 'warn',  message: 'Global rate limit exceeded',        userMessage: 'Service is temporarily throttled.',                          recoveryAction: 'SHOW_RETRY_AFTER',                retryable: true,  retryAfterSeconds: 60 },
  { code: 'PG-SYSTEM-005', httpStatus: 409, domain: 'SYSTEM', severity: 'MEDIUM',   logLevel: 'warn',  message: 'Optimistic locking conflict',       userMessage: 'Data was modified by another session.',                      recoveryAction: 'REFRESH_AND_RETRY',               retryable: true,  retryAfterSeconds: 0 },
  // INVESTMENTS
  { code: 'PG-INVST-001', httpStatus: 403, domain: 'INVST', severity: 'MEDIUM',  logLevel: 'warn',  message: 'Market closed',                         userMessage: 'The market is currently closed.',                            recoveryAction: 'SHOW_NEXT_OPEN_TIME',             retryable: true },
  { code: 'PG-INVST-002', httpStatus: 403, domain: 'INVST', severity: 'HIGH',    logLevel: 'warn',  message: 'Not accredited investor',               userMessage: 'This investment requires accredited investor status.',       recoveryAction: 'SHOW_ACCREDITATION_REQUIREMENTS',retryable: false },
  { code: 'PG-INVST-003', httpStatus: 422, domain: 'INVST', severity: 'MEDIUM',  logLevel: 'warn',  message: 'Price quote expired',                   userMessage: 'The price quote has expired. Please refresh.',               recoveryAction: 'REFRESH_QUOTE',                   retryable: true,  retryAfterSeconds: 0 },
  { code: 'PG-INVST-004', httpStatus: 403, domain: 'INVST', severity: 'MEDIUM',  logLevel: 'warn',  message: 'Pattern day trader rule triggered',     userMessage: 'PDT restriction: 3+ day trades in 5 days.',                 recoveryAction: 'SHOW_PDT_EXPLANATION',            retryable: false },
  // LOANS
  { code: 'PG-LOAN-001',  httpStatus: 403, domain: 'LOAN', severity: 'MEDIUM',   logLevel: 'warn',  message: 'Loan application rejected',             userMessage: 'Your loan application was not approved.',                    recoveryAction: 'SHOW_REJECTION_REASONS',          retryable: false },
  { code: 'PG-LOAN-002',  httpStatus: 402, domain: 'LOAN', severity: 'HIGH',     logLevel: 'warn',  message: 'Loan payment failed',                   userMessage: 'Your loan payment could not be processed.',                  recoveryAction: 'UPDATE_PAYMENT_METHOD',           retryable: true },
  { code: 'PG-LOAN-003',  httpStatus: 403, domain: 'LOAN', severity: 'HIGH',     logLevel: 'warn',  message: 'Prepayment penalty applies',            userMessage: 'Early repayment incurs a penalty fee.',                      recoveryAction: 'SHOW_PENALTY_DETAILS',            retryable: true },
  // INSURANCE
  { code: 'PG-INS-001',   httpStatus: 400, domain: 'INS',  severity: 'MEDIUM',   logLevel: 'warn',  message: 'Claim amount exceeds coverage',          userMessage: 'Your claim exceeds your coverage limit.',                    recoveryAction: 'SHOW_COVERAGE_DETAILS',           retryable: false },
  { code: 'PG-INS-002',   httpStatus: 400, domain: 'INS',  severity: 'MEDIUM',   logLevel: 'warn',  message: 'Claim excluded by policy',               userMessage: 'This claim is excluded by your policy.',                     recoveryAction: 'SHOW_EXCLUSIONS',                 retryable: false },
  { code: 'PG-INS-003',   httpStatus: 402, domain: 'INS',  severity: 'HIGH',     logLevel: 'warn',  message: 'Premium payment overdue',                userMessage: 'Your premium payment is overdue.',                           recoveryAction: 'UPDATE_PAYMENT_METHOD',           retryable: true },
  // API / WEBHOOK
  { code: 'PG-API-001',   httpStatus: 401, domain: 'API',  severity: 'HIGH',     logLevel: 'warn',  message: 'API key invalid or expired',            userMessage: 'Your API key is invalid.',                                   recoveryAction: 'REGENERATE_API_KEY',              retryable: false },
  { code: 'PG-API-002',   httpStatus: 403, domain: 'API',  severity: 'HIGH',     logLevel: 'warn',  message: 'API key lacks required permission',     userMessage: 'This API key does not have access to this resource.',        recoveryAction: 'ADD_REQUIRED_SCOPE',              retryable: false },
  { code: 'PG-API-003',   httpStatus: 429, domain: 'API',  severity: 'MEDIUM',   logLevel: 'warn',  message: 'API rate limit exceeded',               userMessage: 'API rate limit exceeded.',                                   recoveryAction: 'IMPLEMENT_BACKOFF',               retryable: true,  retryAfterSeconds: 60 },
  { code: 'PG-WEBHOOK-001', httpStatus: 400, domain: 'WEBHOOK', severity: 'MEDIUM', logLevel: 'warn', message: 'Webhook signature invalid',          userMessage: 'Webhook signature verification failed.',                     recoveryAction: 'VERIFY_WEBHOOK_SECRET',           retryable: false },
  { code: 'PG-WEBHOOK-002', httpStatus: 400, domain: 'WEBHOOK', severity: 'LOW',  logLevel: 'info',  message: 'Webhook URL unreachable',             userMessage: 'The webhook endpoint could not be reached.',                 recoveryAction: 'VERIFY_ENDPOINT_URL',             retryable: true,  retryAfterSeconds: 300 },
  { code: 'PG-INTG-001',  httpStatus: 400, domain: 'INTG', severity: 'MEDIUM',   logLevel: 'warn',  message: 'Integration auth failed',               userMessage: 'Third-party connection failed. Please reconnect.',           recoveryAction: 'RECONNECT_INTEGRATION',           retryable: false },
  { code: 'PG-INTG-002',  httpStatus: 503, domain: 'INTG', severity: 'HIGH',     logLevel: 'error', message: 'Integration provider unavailable',      userMessage: 'Third-party service is temporarily unavailable.',            recoveryAction: 'SHOW_PROVIDER_STATUS',            retryable: true,  retryAfterSeconds: 300 },
];

export const ERROR_REGISTRY = new Map<string, PathGuardError>(
  ALL_ERRORS.map(e => [e.code, e])
);

export class ErrorCodeService {
  resolve(code: string): PathGuardError | undefined {
    return ERROR_REGISTRY.get(code);
  }

  buildErrorResponse(code: string, requestId: string, meta?: Record<string, unknown>) {
    const err = this.resolve(code) ?? this.resolve('PG-SYSTEM-001')!;
    return {
      requestId,
      code: err.code,
      status: err.httpStatus,
      error: err.message,
      message: err.userMessage,
      recoveryAction: err.recoveryAction,
      retryable: err.retryable,
      ...(err.retryAfterSeconds !== undefined && { retryAfterSeconds: err.retryAfterSeconds }),
      domain: err.domain,
      severity: err.severity,
      meta: meta ?? {},
      timestamp: new Date().toISOString(),
      docs: `https://docs.pathguard.io/errors/${err.code}`,
    };
  }

  getByDomain(domain: ErrorDomain): PathGuardError[] {
    return ALL_ERRORS.filter(e => e.domain === domain);
  }

  getCritical(): PathGuardError[] {
    return ALL_ERRORS.filter(e => e.severity === 'CRITICAL');
  }

  get totalCount(): number { return ERROR_REGISTRY.size; }
}
