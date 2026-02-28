export interface CanonicalTransaction {
  senderBic: string
  receiverBic: string
  amount: number
  currency: string
  valueDate: string
  reference: string
}

export function parseMT103(message: string): CanonicalTransaction {

  const sender = message.match(/:52A:(.+)/)?.[1]?.trim() || ""
  const receiver = message.match(/:57A:(.+)/)?.[1]?.trim() || ""
  const amountMatch = message.match(/:32A:(\d{6})([A-Z]{3})([\d,]+)/)

  if (!amountMatch) {
    throw new Error("Invalid MT103 amount field")
  }

  return {
    senderBic: sender,
    receiverBic: receiver,
    valueDate: amountMatch[1],
    currency: amountMatch[2],
    amount: parseFloat(amountMatch[3].replace(",", ".")),
    reference: message.match(/:20:(.+)/)?.[1]?.trim() || ""
  }
}
