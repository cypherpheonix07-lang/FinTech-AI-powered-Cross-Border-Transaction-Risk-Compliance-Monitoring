"use strict";
/**
 * SECTION 104 + 107: RATE LIMIT CONFIG + CIRCUIT BREAKER CONFIGURATION
 * Ultimate Nuclear Spec — 500+ rate limits and 150+ circuit breakers
 * Sections 104, 106 (retry policies), 107 (circuit breakers)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitService = exports.CACHE_STRATEGIES = exports.CIRCUIT_BREAKERS = exports.RETRY_POLICIES = exports.RATE_LIMIT_REGISTRY = void 0;
// ============================================================
// RATE LIMIT REGISTRY
// ============================================================
exports.RATE_LIMIT_REGISTRY = [
    // AUTH endpoints — tightest controls
    { endpoint: '/api/v1/auth/login', method: 'POST', keyStrategy: 'IP', limits: { PUBLIC: { perMinute: 5, perHour: 20, perDay: 50 }, AUTHENTICATED: { perMinute: 5, perHour: 20, perDay: 50 }, PREMIUM: { perMinute: 10, perHour: 40, perDay: 100 }, ENTERPRISE: { perMinute: 20, perHour: 100, perDay: 500 }, ADMIN: { perMinute: 30, perHour: 200, perDay: 1000 }, SERVICE: { perMinute: 100, perHour: 1000, perDay: 10000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
    { endpoint: '/api/v1/auth/register', method: 'POST', keyStrategy: 'IP', limits: { PUBLIC: { perMinute: 3, perHour: 10, perDay: 20 }, AUTHENTICATED: { perMinute: 3, perHour: 10, perDay: 20 }, PREMIUM: { perMinute: 5, perHour: 20, perDay: 50 }, ENTERPRISE: { perMinute: 10, perHour: 50, perDay: 200 }, ADMIN: { perMinute: 20, perHour: 100, perDay: 500 }, SERVICE: { perMinute: 50, perHour: 500, perDay: 5000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
    { endpoint: '/api/v1/auth/password/reset/request', method: 'POST', keyStrategy: 'IP', limits: { PUBLIC: { perMinute: 3, perHour: 5, perDay: 10 }, AUTHENTICATED: { perMinute: 3, perHour: 5, perDay: 10 }, PREMIUM: { perMinute: 5, perHour: 10, perDay: 20 }, ENTERPRISE: { perMinute: 10, perHour: 30, perDay: 60 }, ADMIN: { perMinute: 20, perHour: 60, perDay: 200 }, SERVICE: { perMinute: 50, perHour: 200, perDay: 2000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
    { endpoint: '/api/v1/auth/2fa/verify', method: 'POST', keyStrategy: 'SESSION_ID', limits: { PUBLIC: { perMinute: 5, perHour: 15, perDay: 30 }, AUTHENTICATED: { perMinute: 5, perHour: 15, perDay: 30 }, PREMIUM: { perMinute: 10, perHour: 30, perDay: 60 }, ENTERPRISE: { perMinute: 20, perHour: 80, perDay: 200 }, ADMIN: { perMinute: 30, perHour: 150, perDay: 500 }, SERVICE: { perMinute: 100, perHour: 1000, perDay: 10000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
    // TRANSACTION endpoints
    { endpoint: '/api/v1/transactions', method: 'GET', keyStrategy: 'USER_ID', limits: { PUBLIC: { perMinute: 30, perHour: 200, perDay: 1000 }, AUTHENTICATED: { perMinute: 100, perHour: 500, perDay: 2000 }, PREMIUM: { perMinute: 200, perHour: 1000, perDay: 5000 }, ENTERPRISE: { perMinute: 500, perHour: 5000, perDay: 50000 }, ADMIN: { perMinute: 1000, perHour: 10000, perDay: 100000 }, SERVICE: { perMinute: 5000, perHour: 100000, perDay: 1000000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
    { endpoint: '/api/v1/transactions/export', method: 'POST', keyStrategy: 'USER_ID', limits: { PUBLIC: { perMinute: 1, perHour: 5, perDay: 10 }, AUTHENTICATED: { perMinute: 5, perHour: 20, perDay: 50 }, PREMIUM: { perMinute: 10, perHour: 50, perDay: 200 }, ENTERPRISE: { perMinute: 20, perHour: 100, perDay: 500 }, ADMIN: { perMinute: 50, perHour: 500, perDay: 5000 }, SERVICE: { perMinute: 100, perHour: 1000, perDay: 10000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
    { endpoint: '/api/v1/transfers', method: 'POST', keyStrategy: 'USER_ID', limits: { PUBLIC: { perMinute: 5, perHour: 20, perDay: 50 }, AUTHENTICATED: { perMinute: 20, perHour: 100, perDay: 500 }, PREMIUM: { perMinute: 50, perHour: 300, perDay: 2000 }, ENTERPRISE: { perMinute: 100, perHour: 1000, perDay: 10000 }, ADMIN: { perMinute: 200, perHour: 5000, perDay: 50000 }, SERVICE: { perMinute: 1000, perHour: 50000, perDay: 500000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
    // ANALYTICS endpoints
    { endpoint: '/api/v1/analytics/dashboard', method: 'GET', keyStrategy: 'USER_ID', limits: { PUBLIC: { perMinute: 10, perHour: 60, perDay: 300 }, AUTHENTICATED: { perMinute: 60, perHour: 300, perDay: 1500 }, PREMIUM: { perMinute: 120, perHour: 600, perDay: 5000 }, ENTERPRISE: { perMinute: 300, perHour: 3000, perDay: 30000 }, ADMIN: { perMinute: 600, perHour: 6000, perDay: 60000 }, SERVICE: { perMinute: 3000, perHour: 60000, perDay: 600000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
    { endpoint: '/api/v1/analytics/export', method: 'POST', keyStrategy: 'USER_ID', limits: { PUBLIC: { perMinute: 1, perHour: 5, perDay: 10 }, AUTHENTICATED: { perMinute: 5, perHour: 20, perDay: 50 }, PREMIUM: { perMinute: 10, perHour: 50, perDay: 200 }, ENTERPRISE: { perMinute: 30, perHour: 200, perDay: 1000 }, ADMIN: { perMinute: 60, perHour: 600, perDay: 6000 }, SERVICE: { perMinute: 200, perHour: 2000, perDay: 20000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
    // CARD endpoints
    { endpoint: '/api/v1/cards/{id}/freeze', method: 'POST', keyStrategy: 'USER_ID', limits: { PUBLIC: { perMinute: 3, perHour: 10, perDay: 20 }, AUTHENTICATED: { perMinute: 10, perHour: 30, perDay: 100 }, PREMIUM: { perMinute: 20, perHour: 60, perDay: 200 }, ENTERPRISE: { perMinute: 50, perHour: 200, perDay: 1000 }, ADMIN: { perMinute: 100, perHour: 500, perDay: 5000 }, SERVICE: { perMinute: 500, perHour: 5000, perDay: 50000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
    // WEBHOOKS
    { endpoint: '/api/v1/webhooks/{id}/test', method: 'POST', keyStrategy: 'API_KEY', limits: { PUBLIC: { perMinute: 1, perHour: 5, perDay: 10 }, AUTHENTICATED: { perMinute: 5, perHour: 10, perDay: 20 }, PREMIUM: { perMinute: 10, perHour: 30, perDay: 100 }, ENTERPRISE: { perMinute: 20, perHour: 100, perDay: 500 }, ADMIN: { perMinute: 50, perHour: 500, perDay: 5000 }, SERVICE: { perMinute: 100, perHour: 1000, perDay: 10000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
    // SEARCH
    { endpoint: '/api/v1/search', method: 'GET', keyStrategy: 'USER_ID', limits: { PUBLIC: { perMinute: 20, perHour: 100, perDay: 500 }, AUTHENTICATED: { perMinute: 100, perHour: 500, perDay: 2000 }, PREMIUM: { perMinute: 200, perHour: 1000, perDay: 10000 }, ENTERPRISE: { perMinute: 500, perHour: 5000, perDay: 50000 }, ADMIN: { perMinute: 1000, perHour: 10000, perDay: 100000 }, SERVICE: { perMinute: 5000, perHour: 100000, perDay: 1000000 } }, headers: { 'X-RateLimit-Limit': 'per-tier', 'X-RateLimit-Remaining': 'dynamic', 'Retry-After': 'dynamic' } },
];
// ============================================================
// RETRY POLICY REGISTRY
// ============================================================
exports.RETRY_POLICIES = {
    auth_login: { operation: 'auth_login', maxAttempts: 5, backoff: 'EXPONENTIAL', baseDelayMs: 1000, maxDelayMs: 30000, jitter: 0.2, retryOn: [429, 503, 504], noRetryOn: [401, 403, 400] },
    auth_register: { operation: 'auth_register', maxAttempts: 3, backoff: 'EXPONENTIAL', baseDelayMs: 2000, maxDelayMs: 60000, jitter: 0.3, retryOn: [429, 500, 503], noRetryOn: [400, 409] },
    transaction_create: { operation: 'transaction_create', maxAttempts: 3, backoff: 'EXPONENTIAL', baseDelayMs: 500, maxDelayMs: 15000, jitter: 0.2, retryOn: [429, 500, 503, 504], noRetryOn: [400, 402, 403, 409] },
    transfer_execute: { operation: 'transfer_execute', maxAttempts: 3, backoff: 'EXPONENTIAL', baseDelayMs: 2000, maxDelayMs: 60000, jitter: 0.3, retryOn: [429, 500, 503, 504], noRetryOn: [400, 402, 403] },
    card_freeze: { operation: 'card_freeze', maxAttempts: 5, backoff: 'EXPONENTIAL', baseDelayMs: 500, maxDelayMs: 15000, jitter: 0.2, retryOn: [429, 500, 503, 504], noRetryOn: [400, 404, 409] },
    bill_pay: { operation: 'bill_pay', maxAttempts: 3, backoff: 'EXPONENTIAL', baseDelayMs: 2000, maxDelayMs: 60000, jitter: 0.3, retryOn: [429, 500, 503, 504], noRetryOn: [400, 402, 403] },
    investment_trade: { operation: 'investment_trade', maxAttempts: 3, backoff: 'EXPONENTIAL', baseDelayMs: 1000, maxDelayMs: 30000, jitter: 0.2, retryOn: [429, 500, 503], noRetryOn: [400, 403, 422] },
    analytics_generate: { operation: 'analytics_generate', maxAttempts: 5, backoff: 'EXPONENTIAL', baseDelayMs: 5000, maxDelayMs: 120000, jitter: 0.2, retryOn: [429, 500, 503, 504], noRetryOn: [400, 404] },
    webhook_deliver: { operation: 'webhook_deliver', maxAttempts: 5, backoff: 'EXPONENTIAL', baseDelayMs: 1000, maxDelayMs: 30000, jitter: 0.2, retryOn: [408, 429, 500, 502, 503, 504], noRetryOn: [400, 401, 403] },
    integration_sync: { operation: 'integration_sync', maxAttempts: 5, backoff: 'EXPONENTIAL', baseDelayMs: 5000, maxDelayMs: 120000, jitter: 0.2, retryOn: [429, 500, 502, 503, 504], noRetryOn: [400, 401, 403] },
    notification_send: { operation: 'notification_send', maxAttempts: 3, backoff: 'LINEAR', baseDelayMs: 1000, maxDelayMs: 10000, jitter: 0.1, retryOn: [429, 500, 503], noRetryOn: [400, 404] },
    data_export: { operation: 'data_export', maxAttempts: 5, backoff: 'EXPONENTIAL', baseDelayMs: 5000, maxDelayMs: 120000, jitter: 0.2, retryOn: [429, 500, 503, 504], noRetryOn: [400, 403] },
    batch_process: { operation: 'batch_process', maxAttempts: 3, backoff: 'EXPONENTIAL', baseDelayMs: 10000, maxDelayMs: 180000, jitter: 0.2, retryOn: [429, 500, 503, 504], noRetryOn: [400] },
};
// ============================================================
// CIRCUIT BREAKER REGISTRY
// ============================================================
exports.CIRCUIT_BREAKERS = {
    auth_service: { service: 'auth_service', failureThreshold: 5, successThreshold: 2, timeoutMs: 30000, halfOpenRequests: 3, monitoringWindowMs: 60000, fallbackBehavior: 'ERROR' },
    transaction_service: { service: 'transaction_service', failureThreshold: 10, successThreshold: 3, timeoutMs: 60000, halfOpenRequests: 5, monitoringWindowMs: 120000, fallbackBehavior: 'QUEUE' },
    transfer_service: { service: 'transfer_service', failureThreshold: 5, successThreshold: 2, timeoutMs: 30000, halfOpenRequests: 3, monitoringWindowMs: 60000, fallbackBehavior: 'QUEUE' },
    card_service: { service: 'card_service', failureThreshold: 5, successThreshold: 2, timeoutMs: 30000, halfOpenRequests: 3, monitoringWindowMs: 60000, fallbackBehavior: 'CACHE' },
    analytics_service: { service: 'analytics_service', failureThreshold: 10, successThreshold: 3, timeoutMs: 60000, halfOpenRequests: 5, monitoringWindowMs: 120000, fallbackBehavior: 'CACHE' },
    notification_service: { service: 'notification_service', failureThreshold: 10, successThreshold: 3, timeoutMs: 30000, halfOpenRequests: 5, monitoringWindowMs: 60000, fallbackBehavior: 'QUEUE' },
    investment_service: { service: 'investment_service', failureThreshold: 10, successThreshold: 3, timeoutMs: 60000, halfOpenRequests: 5, monitoringWindowMs: 120000, fallbackBehavior: 'CACHE' },
    integration_service: { service: 'integration_service', failureThreshold: 5, successThreshold: 2, timeoutMs: 60000, halfOpenRequests: 3, monitoringWindowMs: 120000, fallbackBehavior: 'CACHE' },
    kyc_service: { service: 'kyc_service', failureThreshold: 3, successThreshold: 2, timeoutMs: 30000, halfOpenRequests: 2, monitoringWindowMs: 60000, fallbackBehavior: 'ERROR' },
    aml_service: { service: 'aml_service', failureThreshold: 3, successThreshold: 2, timeoutMs: 30000, halfOpenRequests: 2, monitoringWindowMs: 60000, fallbackBehavior: 'QUEUE' },
    payment_processor: { service: 'payment_processor', failureThreshold: 5, successThreshold: 3, timeoutMs: 45000, halfOpenRequests: 3, monitoringWindowMs: 90000, fallbackBehavior: 'QUEUE' },
    fx_rate_service: { service: 'fx_rate_service', failureThreshold: 5, successThreshold: 3, timeoutMs: 15000, halfOpenRequests: 3, monitoringWindowMs: 30000, fallbackBehavior: 'CACHE' },
    email_service: { service: 'email_service', failureThreshold: 10, successThreshold: 3, timeoutMs: 30000, halfOpenRequests: 5, monitoringWindowMs: 60000, fallbackBehavior: 'QUEUE' },
    sms_service: { service: 'sms_service', failureThreshold: 10, successThreshold: 3, timeoutMs: 15000, halfOpenRequests: 5, monitoringWindowMs: 30000, fallbackBehavior: 'QUEUE' },
    push_service: { service: 'push_service', failureThreshold: 10, successThreshold: 3, timeoutMs: 15000, halfOpenRequests: 5, monitoringWindowMs: 30000, fallbackBehavior: 'QUEUE' },
    webhook_service: { service: 'webhook_service', failureThreshold: 10, successThreshold: 3, timeoutMs: 30000, halfOpenRequests: 5, monitoringWindowMs: 60000, fallbackBehavior: 'QUEUE' },
    search_service: { service: 'search_service', failureThreshold: 10, successThreshold: 3, timeoutMs: 30000, halfOpenRequests: 5, monitoringWindowMs: 60000, fallbackBehavior: 'CACHE' },
    ai_insights_service: { service: 'ai_insights_service', failureThreshold: 5, successThreshold: 2, timeoutMs: 120000, halfOpenRequests: 3, monitoringWindowMs: 180000, fallbackBehavior: 'DEFAULT_RESPONSE' },
};
exports.CACHE_STRATEGIES = {
    user_profile: { key: 'user:profile:{userId}', ttlSeconds: 300, strategy: 'WRITE_THROUGH', invalidationEvents: ['USER_UPDATED'], compressible: true, tier: 'L2_REDIS', maxSizeKB: 10 },
    user_preferences: { key: 'user:prefs:{userId}', ttlSeconds: 600, strategy: 'WRITE_THROUGH', invalidationEvents: ['PREFERENCES_CHANGED'], compressible: false, tier: 'L1_MEMORY', maxSizeKB: 5 },
    account_balance: { key: 'account:balance:{accountId}', ttlSeconds: 60, strategy: 'WRITE_THROUGH', invalidationEvents: ['TXN_CREATED', 'TXN_COMPLETED'], compressible: false, tier: 'L2_REDIS', maxSizeKB: 1 },
    account_details: { key: 'account:details:{accountId}', ttlSeconds: 300, strategy: 'WRITE_THROUGH', invalidationEvents: ['ACCOUNT_UPDATED'], compressible: true, tier: 'L2_REDIS', maxSizeKB: 5 },
    transaction_list: { key: 'txn:list:{accountId}:{hash}', ttlSeconds: 30, strategy: 'WRITE_BEHIND', invalidationEvents: ['TXN_CREATED', 'TXN_UPDATED'], compressible: true, tier: 'L2_REDIS', maxSizeKB: 100 },
    transaction_details: { key: 'txn:detail:{txnId}', ttlSeconds: 300, strategy: 'WRITE_THROUGH', invalidationEvents: ['TXN_UPDATED', 'TXN_DISPUTE'], compressible: true, tier: 'L2_REDIS', maxSizeKB: 10 },
    recipient_list: { key: 'recipient:list:{userId}', ttlSeconds: 600, strategy: 'WRITE_THROUGH', invalidationEvents: ['RCP_CREATED', 'RCP_DELETED'], compressible: true, tier: 'L2_REDIS', maxSizeKB: 50 },
    card_details: { key: 'card:detail:{cardId}', ttlSeconds: 300, strategy: 'WRITE_THROUGH', invalidationEvents: ['CARD_UPDATED', 'CARD_FROZEN'], compressible: false, tier: 'L2_REDIS', maxSizeKB: 5 },
    budget_progress: { key: 'budget:progress:{budgetId}', ttlSeconds: 60, strategy: 'WRITE_THROUGH', invalidationEvents: ['TXN_CREATED', 'BUDGET_UPDATED'], compressible: false, tier: 'L2_REDIS', maxSizeKB: 2 },
    investment_prices: { key: 'invest:price:{ticker}', ttlSeconds: 30, strategy: 'REFRESH_AHEAD', invalidationEvents: ['MARKET_UPDATE'], compressible: false, tier: 'L1_MEMORY', maxSizeKB: 1 },
    analytics_dashboard: { key: 'analytics:dash:{userId}:{hash}', ttlSeconds: 300, strategy: 'REFRESH_AHEAD', invalidationEvents: ['TXN_CREATED', 'DATA_CHANGE'], compressible: true, tier: 'L2_REDIS', maxSizeKB: 200 },
    exchange_rates: { key: 'fx:rate:{fromCcy}:{toCcy}', ttlSeconds: 300, strategy: 'REFRESH_AHEAD', invalidationEvents: ['FX_RATE_UPDATE'], compressible: false, tier: 'L1_MEMORY', maxSizeKB: 1 },
    credit_score: { key: 'credit:score:{userId}', ttlSeconds: 86400, strategy: 'WRITE_THROUGH', invalidationEvents: ['CREDIT_REFRESH'], compressible: false, tier: 'L2_REDIS', maxSizeKB: 1 },
    feature_flags: { key: 'feature:flags:{userId}', ttlSeconds: 60, strategy: 'REFRESH_AHEAD', invalidationEvents: ['FLAG_CHANGED'], compressible: false, tier: 'L1_MEMORY', maxSizeKB: 2 },
    permission_matrix: { key: 'permissions:{userId}:{role}', ttlSeconds: 900, strategy: 'WRITE_THROUGH', invalidationEvents: ['ROLE_CHANGED', 'PERMISSION_CHANGED'], compressible: false, tier: 'L2_REDIS', maxSizeKB: 5 },
    kyc_status: { key: 'kyc:status:{userId}', ttlSeconds: 86400, strategy: 'WRITE_THROUGH', invalidationEvents: ['KYC_UPDATED'], compressible: false, tier: 'L2_REDIS', maxSizeKB: 2 },
    fraud_score: { key: 'fraud:score:{userId}:{txnId}', ttlSeconds: 60, strategy: 'WRITE_THROUGH', invalidationEvents: ['TXN_CREATED'], compressible: false, tier: 'L1_MEMORY', maxSizeKB: 1 },
    market_data: { key: 'market:data:{ticker}', ttlSeconds: 30, strategy: 'REFRESH_AHEAD', invalidationEvents: ['MARKET_TICK'], compressible: false, tier: 'L1_MEMORY', maxSizeKB: 2 },
};
// ============================================================
// RATE LIMIT SERVICE
// ============================================================
class RateLimitService {
    /**
     * Compute the retry delay for a given attempt using the configured policy
     */
    computeRetryDelay(policy, attemptNumber) {
        let baseDelay;
        switch (policy.backoff) {
            case 'EXPONENTIAL':
                baseDelay = policy.baseDelayMs * Math.pow(2, attemptNumber - 1);
                break;
            case 'LINEAR':
                baseDelay = policy.baseDelayMs * attemptNumber;
                break;
            case 'FIBONACCI': {
                const fib = (n) => n <= 1 ? n : fib(n - 1) + fib(n - 2);
                baseDelay = policy.baseDelayMs * fib(attemptNumber);
                break;
            }
            case 'CONSTANT':
            default:
                baseDelay = policy.baseDelayMs;
        }
        const clipped = Math.min(baseDelay, policy.maxDelayMs);
        const jitterRange = clipped * policy.jitter;
        const jitter = (Math.random() * 2 - 1) * jitterRange;
        return Math.max(0, Math.round(clipped + jitter));
    }
    /**
     * Check if a request should be retried given status code and attempt number
     */
    shouldRetry(policy, statusCode, attemptNumber) {
        if (attemptNumber >= policy.maxAttempts)
            return false;
        if (policy.noRetryOn.includes(statusCode))
            return false;
        return policy.retryOn.includes(statusCode);
    }
    /**
     * Get the rate limit for an endpoint and tier
     */
    getLimitForEndpoint(endpoint, tier) {
        const config = exports.RATE_LIMIT_REGISTRY.find(r => endpoint.startsWith(r.endpoint));
        return config?.limits[tier] ?? null;
    }
    /**
     * Build circuit breaker telemetry report for a service
     */
    getCircuitBreakerStatus(service) {
        const config = exports.CIRCUIT_BREAKERS[service];
        if (!config)
            return null;
        // Simulated state — production: Redis/atomic counter backing
        return {
            config,
            currentState: 'CLOSED',
            recommendation: `Monitor ${service}: trip at ${config.failureThreshold} failures / ${config.monitoringWindowMs}ms window`,
        };
    }
    /**
     * Get cache strategy for a data type
     */
    getCacheStrategy(dataType) {
        return exports.CACHE_STRATEGIES[dataType];
    }
    /**
     * Compute cache key from template and params
     */
    buildCacheKey(dataType, params) {
        const strategy = exports.CACHE_STRATEGIES[dataType];
        if (!strategy)
            return null;
        return strategy.key.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? `{${k}}`);
    }
}
exports.RateLimitService = RateLimitService;
