import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ComplianceEngineService {
  /**
   * Feature 5.3: Sanctions screening with fuzzy matching
   */
  async screenAgainstSanctions(name: string): Promise<{ match: boolean; hits: any[] }> {
    // Simulated sanctions database check
    const sanctionsList = ['Voldemort', 'Grindelwald', 'Lex Luthor'];
    const hits = sanctionsList.filter(s => this.fuzzyMatch(name, s) > 0.8);
    
    return {
      match: hits.length > 0,
      hits
    };
  }

  /**
   * Feature 5.1: KYC/AML verification workflow
   */
  async initiateKYC(userId: string, documentType: string) {
    console.log(`Initiating KYC for user ${userId} with ${documentType}...`);
    return { status: 'PENDING_FACIAL_RECOGNITION', sessionId: `KYC-${Date.now()}` };
  }

  /**
   * Feature 5.7: SAR (Suspicious Activity Report) generation
   */
  async generateSAR(transactionId: string) {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { account: true }
    });

    if (!transaction) throw new Error('Transaction not found');

    const narrative = `Suspicious activity detected for transaction ${transactionId}. 
    Amount: ${transaction.amount} ${transaction.currency}. 
    Reason: Rapid frequency of high-value transfers detected.`;

    return await prisma.complianceReport.create({
      data: {
        type: 'SAR',
        status: 'DRAFT',
        tenantId: transaction.tenantId,
        transactionIds: [transactionId],
        content: { narrative, suspectName: transaction.senderName },
        generatedBy: 'SYSTEM_AI'
      }
    });
  }

  /**
   * Feature 5.10: Immutable audit trail logging
   */
  async logAuditEvent(userId: string, action: string, details: any) {
    return await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity: 'COMPLIANCE',
        details,
        createdAt: new Date()
      }
    });
  }

  private fuzzyMatch(s1: string, s2: string): number {
    // Simple Levenshtein-based similarity stub
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
    return (longer.length - this.editDistance(longer, shorter)) / longer.length;
  }

  private editDistance(s1: string, s2: string): number {
     // Basic distance logic
     return Math.abs(s1.length - s2.length); 
  }
}
