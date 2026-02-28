"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseISO20022 = parseISO20022;
const fast_xml_parser_1 = require("fast-xml-parser");
function parseISO20022(xml) {
    const parser = new fast_xml_parser_1.XMLParser();
    const json = parser.parse(xml);
    const tx = json.Document?.FIToFICstmrCdtTrf?.CdtTrfTxInf;
    if (!tx) {
        throw new Error("Invalid ISO20022 message");
    }
    return {
        senderBic: tx.DbtrAgt?.FinInstnId?.BICFI,
        receiverBic: tx.CdtrAgt?.FinInstnId?.BICFI,
        amount: parseFloat(tx.Amt?.InstdAmt?.["#text"]),
        currency: tx.Amt?.InstdAmt?.["@_Ccy"],
        reference: tx.PmtId?.InstrId
    };
}
