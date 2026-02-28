import { XMLParser } from "fast-xml-parser"

export function parseISO20022(xml: string) {

  const parser = new XMLParser()
  const json = parser.parse(xml)

  const tx = json.Document?.FIToFICstmrCdtTrf?.CdtTrfTxInf

  if (!tx) {
    throw new Error("Invalid ISO20022 message")
  }

  return {
    senderBic: tx.DbtrAgt?.FinInstnId?.BICFI,
    receiverBic: tx.CdtrAgt?.FinInstnId?.BICFI,
    amount: parseFloat(tx.Amt?.InstdAmt?.["#text"]),
    currency: tx.Amt?.InstdAmt?.["@_Ccy"],
    reference: tx.PmtId?.InstrId
  }
}
