"use strict";
// backend/src/services/parsers/iso20022-parser.ts
// ISO 20022 XML parser (pacs.008, pacs.002) → Canonical Transaction format
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseISO20022 = parseISO20022;
const uuid_1 = require("uuid");
/**
 * Parse ISO 20022 pacs.008 (FI to FI Customer Credit Transfer) XML.
 *
 * Key XPaths:
 * /Document/FIToFICstmrCdtTrf/GrpHdr/MsgId — Message ID
 * /Document/FIToFICstmrCdtTrf/CdtTrfTxInf/PmtId/EndToEndId — Transaction Reference
 * /Document/FIToFICstmrCdtTrf/CdtTrfTxInf/IntrBkSttlmAmt — Amount + Currency
 * /Document/FIToFICstmrCdtTrf/CdtTrfTxInf/Dbtr — Debtor (Sender)
 * /Document/FIToFICstmrCdtTrf/CdtTrfTxInf/Cdtr — Creditor (Receiver)
 */
function parseISO20022(xmlString, tenantId) {
    const transactions = [];
    // Determine message type
    const isPacs008 = xmlString.includes('FIToFICstmrCdtTrf') || xmlString.includes('pacs.008');
    const isPacs002 = xmlString.includes('FIToFIPmtStsRpt') || xmlString.includes('pacs.002');
    if (isPacs008) {
        transactions.push(...parsePacs008(xmlString, tenantId));
    }
    else if (isPacs002) {
        transactions.push(...parsePacs002(xmlString, tenantId));
    }
    else {
        // Try generic parsing
        transactions.push(...parseGenericISO20022(xmlString, tenantId));
    }
    return transactions;
}
function parsePacs008(xml, tenantId) {
    const transactions = [];
    // Extract group header message ID
    const groupMsgId = extractXMLValue(xml, 'MsgId') || (0, uuid_1.v4)();
    // Find all credit transfer transaction blocks
    const txBlocks = extractAllBlocks(xml, 'CdtTrfTxInf');
    for (const block of txBlocks) {
        const endToEndId = extractXMLValue(block, 'EndToEndId') || groupMsgId;
        // Amount and currency
        const amountBlock = extractBlock(block, 'IntrBkSttlmAmt') || extractBlock(block, 'InstdAmt') || '';
        const currency = extractAttribute(amountBlock, 'Ccy') || 'USD';
        const amount = parseFloat(stripTags(amountBlock)) || 0;
        // Settlement date
        const settlementDate = extractXMLValue(block, 'IntrBkSttlmDt') || new Date().toISOString().split('T')[0];
        // Debtor (Sender)
        const debtorBlock = extractBlock(block, 'Dbtr') || '';
        const senderName = extractXMLValue(debtorBlock, 'Nm') || 'Unknown Debtor';
        const senderAccount = extractXMLValue(extractBlock(block, 'DbtrAcct') || '', 'IBAN') || extractXMLValue(extractBlock(block, 'DbtrAcct') || '', 'Id') || '';
        const senderBIC = extractXMLValue(extractBlock(block, 'DbtrAgt') || '', 'BIC')
            || extractXMLValue(extractBlock(block, 'DbtrAgt') || '', 'BICFI') || '';
        const senderCountry = extractXMLValue(debtorBlock, 'Ctry')
            || extractCountryFromBIC(senderBIC) || 'XX';
        // Creditor (Receiver)
        const creditorBlock = extractBlock(block, 'Cdtr') || '';
        const receiverName = extractXMLValue(creditorBlock, 'Nm') || 'Unknown Creditor';
        const receiverAccount = extractXMLValue(extractBlock(block, 'CdtrAcct') || '', 'IBAN') || extractXMLValue(extractBlock(block, 'CdtrAcct') || '', 'Id') || '';
        const receiverBIC = extractXMLValue(extractBlock(block, 'CdtrAgt') || '', 'BIC')
            || extractXMLValue(extractBlock(block, 'CdtrAgt') || '', 'BICFI') || '';
        const receiverCountry = extractXMLValue(creditorBlock, 'Ctry')
            || extractCountryFromBIC(receiverBIC) || 'XX';
        transactions.push({
            transactionId: (0, uuid_1.v4)(),
            messageType: 'ISO20022_PACS008',
            originalReference: endToEndId,
            senderName,
            senderAccount,
            senderBIC,
            senderCountry,
            receiverName,
            receiverAccount,
            receiverBIC,
            receiverCountry,
            amount,
            currency,
            valueDate: settlementDate,
            settlementDate,
            rawMessage: xml,
            parsedAt: new Date().toISOString(),
            tenantId,
        });
    }
    // If no transaction blocks found, try root-level parsing
    if (transactions.length === 0) {
        transactions.push(parseGenericISO20022Single(xml, tenantId));
    }
    return transactions;
}
function parsePacs002(xml, tenantId) {
    // pacs.002 is a payment status report — extract the original transaction reference
    const endToEndId = extractXMLValue(xml, 'EndToEndId') || extractXMLValue(xml, 'OrgnlEndToEndId') || (0, uuid_1.v4)();
    return [{
            transactionId: (0, uuid_1.v4)(),
            messageType: 'ISO20022_PACS002',
            originalReference: endToEndId,
            senderName: extractXMLValue(xml, 'InstgAgt') || 'Unknown',
            senderAccount: '',
            senderCountry: 'XX',
            receiverName: extractXMLValue(xml, 'InstdAgt') || 'Unknown',
            receiverAccount: '',
            receiverCountry: 'XX',
            amount: parseFloat(extractXMLValue(xml, 'IntrBkSttlmAmt') || '0') || 0,
            currency: extractAttribute(extractBlock(xml, 'IntrBkSttlmAmt') || '', 'Ccy') || 'USD',
            valueDate: extractXMLValue(xml, 'IntrBkSttlmDt') || new Date().toISOString().split('T')[0],
            rawMessage: xml,
            parsedAt: new Date().toISOString(),
            tenantId,
        }];
}
function parseGenericISO20022(xml, tenantId) {
    return [parseGenericISO20022Single(xml, tenantId)];
}
function parseGenericISO20022Single(xml, tenantId) {
    return {
        transactionId: (0, uuid_1.v4)(),
        messageType: 'ISO20022_PACS008',
        originalReference: extractXMLValue(xml, 'MsgId') || extractXMLValue(xml, 'EndToEndId') || (0, uuid_1.v4)(),
        senderName: extractXMLValue(xml, 'Nm') || 'Unknown',
        senderAccount: extractXMLValue(xml, 'IBAN') || '',
        senderCountry: extractXMLValue(xml, 'Ctry') || 'XX',
        receiverName: 'Unknown',
        receiverAccount: '',
        receiverCountry: 'XX',
        amount: 0,
        currency: 'USD',
        valueDate: new Date().toISOString().split('T')[0],
        rawMessage: xml,
        parsedAt: new Date().toISOString(),
        tenantId,
    };
}
// ─── XML Helpers (lightweight, no external dependency) ────────────────
function extractXMLValue(xml, tag) {
    const regex = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'i');
    const match = xml.match(regex);
    return match ? match[1].trim() : null;
}
function extractBlock(xml, tag) {
    const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
    const match = xml.match(regex);
    return match ? match[0] : null;
}
function extractAllBlocks(xml, tag) {
    const regex = new RegExp(`<${tag}[^>]*>[\\s\\S]*?</${tag}>`, 'gi');
    return xml.match(regex) || [];
}
function extractAttribute(xml, attr) {
    const regex = new RegExp(`${attr}="([^"]*)"`, 'i');
    const match = xml.match(regex);
    return match ? match[1] : null;
}
function stripTags(xml) {
    return xml.replace(/<[^>]*>/g, '').trim();
}
function extractCountryFromBIC(bic) {
    if (bic && bic.length >= 6) {
        return bic.substring(4, 6).toUpperCase();
    }
    return null;
}
