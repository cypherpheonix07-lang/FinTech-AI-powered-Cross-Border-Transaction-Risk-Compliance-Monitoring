"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroTrustService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ZeroTrustService {
    /**
     * Feature 4.2: Adaptive step-up authentication based on risk score
     */
    async evaluateSessionRisk(sessionId) {
        const session = await prisma.zeroTrustSession.findUnique({
            where: { id: sessionId },
            include: { verifications: { orderBy: { timestamp: 'desc' }, take: 10 } }
        });
        if (!session)
            return 1.0; // Max risk if no session
        let riskScore = 0;
        // 1. Check time since last verification (Feature 4.1)
        const timeSinceLastVeif = Date.now() - session.lastVerifiedAt.getTime();
        if (timeSinceLastVeif > 1000 * 60 * 60)
            riskScore += 0.3; // 1 hour threshold
        // 2. Check recent behavioral anomalies (Feature 4.4 - simulated)
        const behavioralVeifs = session.verifications.filter((v) => v.verificationType === 'BEHAVIORAL');
        const failedBehavioral = behavioralVeifs.filter((v) => v.status === 'FAILED').length;
        riskScore += (failedBehavioral * 0.2);
        // 3. Update session risk
        await prisma.zeroTrustSession.update({
            where: { id: sessionId },
            data: { riskScore: Math.min(1.0, riskScore) }
        });
        return riskScore;
    }
    /**
     * Feature 4.4: Log behavioral biometric result
     */
    async logContinuousVerification(sessionId, type, status, data) {
        return await prisma.continuousVerification.create({
            data: {
                sessionId,
                verificationType: type,
                status,
                resultData: data,
                timestamp: new Date()
            }
        });
    }
    /**
     * Feature 4.3: Liveness detection stub
     */
    async verifyLiveness(sessionId, proof) {
        // Simulated liveness check logic
        const isValid = proof && proof.isHuman;
        if (isValid) {
            await prisma.zeroTrustSession.update({
                where: { id: sessionId },
                data: { lastVerifiedAt: new Date(), riskScore: 0 }
            });
        }
        return !!isValid;
    }
}
exports.ZeroTrustService = ZeroTrustService;
