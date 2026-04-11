"use strict";
/**
 * PATHGUARD PILLAR 3: USER EXPERIENCE
 * Intent Engine Service — Parsing plain English financial requests
 * and mapping them to internal system commands.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.intentEngineService = exports.IntentEngineService = void 0;
class IntentEngineService {
    static instance;
    constructor() { }
    static getInstance() {
        if (!IntentEngineService.instance) {
            IntentEngineService.instance = new IntentEngineService();
        }
        return IntentEngineService.instance;
    }
    /**
     * Parse a natural language string to extract financial intent.
     * In production: Uses LLM (Ollama/OpenAI) or NLP (NLU) logic.
     */
    async parseCommand(input) {
        const text = input.toLowerCase();
        // Simple heuristic-based parsing for simulation
        let action = 'UNKNOWN';
        if (text.includes('pay') || text.includes('send') || text.includes('transfer'))
            action = 'SEND';
        if (text.includes('convert') || text.includes('swap'))
            action = 'CONVERT';
        if (text.includes('audit') || text.includes('check'))
            action = 'AUDIT';
        // Regex for amount (e.g., $5,000, 500 usd)
        const amountMatch = text.match(/\d+(?:,\d+)?(?:\.\d+)?/);
        const amount = amountMatch ? parseFloat(amountMatch[0].replace(/,/g, '')) : undefined;
        // Regex for currency
        const currencies = ['usd', 'eur', 'gbp', 'aed', 'btc', 'eth'];
        const currency = currencies.find(c => text.includes(c)) || (text.includes('$') ? 'USD' : undefined);
        // Extraction of recipient (simple "to X" logic)
        const recipientMatch = text.match(/to\s+(\w+)/);
        const recipient = recipientMatch ? recipientMatch[1] : undefined;
        return {
            action,
            amount,
            currency: currency?.toUpperCase(),
            recipient,
            confidence: action !== 'UNKNOWN' ? 0.95 : 0.2
        };
    }
    /**
     * Convert a parsed intent into a human-friendly confirmation string.
     */
    getConfirmationString(intent) {
        if (intent.action === 'UNKNOWN')
            return "I couldn't quite understand that. Could you try rephrasing?";
        if (intent.action === 'SEND') {
            return `I've prepared a transfer of ${intent.amount || 'an unspecified amount'} ${intent.currency || ''} to ${intent.recipient || 'a new recipient'}. Shall I proceed with the path verification?`;
        }
        return `Command recognized: ${intent.action}. Assessing requirements...`;
    }
}
exports.IntentEngineService = IntentEngineService;
exports.intentEngineService = IntentEngineService.getInstance();
