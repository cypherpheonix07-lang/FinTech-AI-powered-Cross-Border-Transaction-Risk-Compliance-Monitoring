// backend/src/services/parsers/swift-parser.ts
// SWIFT MT103 / MT202 message parser → Canonical Transaction format

import { CanonicalTransaction } from '../../types/canonical-transaction';
import { v4 as uuidv4 } from 'uuid';

/**
 * Parse SWIFT MT103 (Single Customer Credit Transfer) message.
 * 
 * MT103 Field Structure:
 * :20: Transaction Reference
 * :23B: Bank Operation Code
 * :32A: Value Date / Currency / Amount
 * :50K: Ordering Customer (Sender)
 * :52A: Ordering Institution (Sender BIC)
 * :53A: Sender Correspondent
 * :56A: Beneficiary Institution
 * :57A: Account With Institution (Receiver BIC)
 * :59: Beneficiary Customer (Receiver)
 * :70: Remittance Information
 * :71A: Details of Charges
 */
export function parseSWIFTMT103(rawMessage: string, tenantId: string): CanonicalTransaction {
  const fields = extractSWIFTFields(rawMessage);

  // :20: Transaction Reference
  const reference = fields['20'] || uuidv4();

  // :32A: Value Date / Currency / Amount (e.g., "230415USD100000,50")
  const field32A = fields['32A'] || '';
  const { valueDate, currency, amount } = parseField32A(field32A);

  // :50K: Ordering Customer (sender)
  const senderInfo = parsePartyField(fields['50K'] || fields['50'] || '');
  
  // :52A: Ordering Institution BIC
  const senderBIC = (fields['52A'] || '').trim();

  // :57A: Account With Institution BIC
  const receiverBIC = (fields['57A'] || fields['56A'] || '').trim();

  // :59: Beneficiary Customer (receiver)
  const receiverInfo = parsePartyField(fields['59'] || '');

  // Extract countries from BICs (positions 5-6 of 8/11 char BIC)
  const senderCountry = extractCountryFromBIC(senderBIC) || senderInfo.country || 'XX';
  const receiverCountry = extractCountryFromBIC(receiverBIC) || receiverInfo.country || 'XX';

  return {
    transactionId: uuidv4(),
    messageType: 'SWIFT_MT103',
    originalReference: reference,
    senderName: senderInfo.name,
    senderAccount: senderInfo.account,
    senderBIC,
    senderCountry,
    receiverName: receiverInfo.name,
    receiverAccount: receiverInfo.account,
    receiverBIC,
    receiverCountry,
    amount,
    currency,
    valueDate,
    rawMessage: rawMessage,
    parsedAt: new Date().toISOString(),
    tenantId,
  };
}

/**
 * Parse SWIFT MT202 (General Financial Institution Transfer)
 */
export function parseSWIFTMT202(rawMessage: string, tenantId: string): CanonicalTransaction {
  const fields = extractSWIFTFields(rawMessage);

  const reference = fields['20'] || uuidv4();
  const { valueDate, currency, amount } = parseField32A(fields['32A'] || '');

  const senderBIC = (fields['52A'] || fields['53A'] || '').trim();
  const receiverBIC = (fields['58A'] || fields['57A'] || '').trim();

  const senderCountry = extractCountryFromBIC(senderBIC) || 'XX';
  const receiverCountry = extractCountryFromBIC(receiverBIC) || 'XX';

  return {
    transactionId: uuidv4(),
    messageType: 'SWIFT_MT202',
    originalReference: reference,
    senderName: senderBIC || 'Financial Institution',
    senderAccount: fields['53A'] || senderBIC || '',
    senderBIC,
    senderCountry,
    receiverName: receiverBIC || 'Financial Institution',
    receiverAccount: fields['58A'] || receiverBIC || '',
    receiverBIC,
    receiverCountry,
    amount,
    currency,
    valueDate,
    rawMessage: rawMessage,
    parsedAt: new Date().toISOString(),
    tenantId,
  };
}

// ─── Helper Functions ─────────────────────────────────────────────────

function extractSWIFTFields(message: string): Record<string, string> {
  const fields: Record<string, string> = {};
  // Match SWIFT field tags like :20:, :32A:, :50K:, etc.
  const regex = /:(\d{2}[A-Z]?):([\s\S]*?)(?=\n:|\n-\}|\n\{|$)/g;
  let match;
  
  while ((match = regex.exec(message)) !== null) {
    const tag = match[1].trim();
    const value = match[2].trim();
    fields[tag] = value;
  }
  
  return fields;
}

function parseField32A(field: string): { valueDate: string; currency: string; amount: number } {
  // Format: YYMMDD + CUR + Amount (e.g., "230415USD100000,50" or "230415 USD 100000.50")
  const cleaned = field.replace(/\s+/g, '');
  
  if (cleaned.length < 9) {
    return { valueDate: new Date().toISOString().split('T')[0], currency: 'USD', amount: 0 };
  }

  const dateStr = cleaned.substring(0, 6);
  const year = 2000 + parseInt(dateStr.substring(0, 2));
  const month = dateStr.substring(2, 4);
  const day = dateStr.substring(4, 6);
  const valueDate = `${year}-${month}-${day}`;

  const remaining = cleaned.substring(6);
  const currencyMatch = remaining.match(/^([A-Z]{3})/);
  const currency = currencyMatch ? currencyMatch[1] : 'USD';

  const amountStr = remaining.substring(3).replace(',', '.');
  const amount = parseFloat(amountStr) || 0;

  return { valueDate, currency, amount };
}

function parsePartyField(field: string): { name: string; account: string; country: string } {
  const lines = field.split('\n').map(l => l.trim()).filter(Boolean);
  
  let account = '';
  let name = '';
  let country = '';

  if (lines.length > 0) {
    // First line often starts with / followed by account number
    if (lines[0].startsWith('/')) {
      account = lines[0].substring(1).split('\n')[0].trim();
      name = lines.slice(1).join(' ').trim();
    } else {
      name = lines[0];
      account = lines[1] || '';
    }
  }

  // Try to extract country from address (last line often contains country)
  const lastLine = lines[lines.length - 1] || '';
  const countryMatch = lastLine.match(/\b([A-Z]{2})\b/);
  if (countryMatch) {
    country = countryMatch[1];
  }

  return { name: name || 'Unknown', account: account || 'Unknown', country };
}

function extractCountryFromBIC(bic: string): string | null {
  // BIC format: BANKCCLL or BANKCCLLXXX (CC = country code at positions 5-6, 0-indexed 4-5)
  if (bic && bic.length >= 6) {
    return bic.substring(4, 6).toUpperCase();
  }
  return null;
}

/**
 * Auto-detect SWIFT message type and parse accordingly.
 */
export function parseSWIFTMessage(rawMessage: string, tenantId: string): CanonicalTransaction {
  const upperMsg = rawMessage.toUpperCase();
  
  if (upperMsg.includes('MT202') || upperMsg.includes('{2:O202')) {
    return parseSWIFTMT202(rawMessage, tenantId);
  }
  
  // Default to MT103
  return parseSWIFTMT103(rawMessage, tenantId);
}
