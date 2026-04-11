"use strict";
/**
 * PATHGUARD PILLAR 1: AI INTELLIGENCE
 * Behavioral Analytics Service — Monitoring human-centric signals
 * to detect account takeover and anomalous activity.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.behavioralAnalyticsService = exports.BehavioralAnalyticsService = void 0;
class BehavioralAnalyticsService {
    static instance;
    userProfiles = new Map();
    constructor() { }
    static getInstance() {
        if (!BehavioralAnalyticsService.instance) {
            BehavioralAnalyticsService.instance = new BehavioralAnalyticsService();
        }
        return BehavioralAnalyticsService.instance;
    }
    /**
     * Register or update a user's behavioral baseline.
     */
    updateBaseline(profile) {
        this.userProfiles.set(profile.userId, profile);
        console.log(`[Pillar-1] Behavioral baseline updated for user: ${profile.userId}`);
    }
    /**
     * Analyze Geographic Velocity (Impossible Travel).
     * Returns a risk score from 0 (Safe) to 1 (Impossible).
     */
    calculateGeoVelocityRisk(userId, currentLat, currentLng) {
        const profile = this.userProfiles.get(userId);
        if (!profile)
            return 0.5;
        const lastTime = new Date(profile.lastActive).getTime();
        const currentTime = Date.now();
        const hourDiff = (currentTime - lastTime) / (1000 * 60 * 60);
        // Haversine distance simulation (simplified)
        const distance = Math.sqrt(Math.pow(currentLat - profile.baselineLocation.lat, 2) +
            Math.pow(currentLng - profile.baselineLocation.lng, 2)) * 111; // Approx km
        const speedRequired = distance / (hourDiff || 0.001);
        if (speedRequired > 1000)
            return 1.0; // Faster than a commercial jet
        if (speedRequired > 200)
            return 0.6; // Faster than a car
        return 0;
    }
    /**
     * Analyze Keystroke Dynamics.
     * Compares current typing speed against baseline.
     */
    calculateKeystrokeRisk(userId, currentSpeed) {
        const profile = this.userProfiles.get(userId);
        if (!profile)
            return 0.5;
        const deviation = Math.abs(currentSpeed - profile.baselineTypingSpeed) / profile.baselineTypingSpeed;
        if (deviation > 0.5)
            return 0.9; // Extreme deviation
        if (deviation > 0.2)
            return 0.4; // Notable deviation
        return 0;
    }
    /**
     * Analyze Recipient Entropy (Is this a new or high-risk recipient?).
     */
    calculateRecipientRisk(userId, recipientId) {
        const profile = this.userProfiles.get(userId);
        if (!profile)
            return 0.8;
        if (profile.knownRecipients.includes(recipientId))
            return 0;
        // In production: Cross-reference with global blacklists
        return 0.7; // New recipient risk
    }
    /**
     * Analyze Device Fingerprint.
     */
    calculateDeviceRisk(userId, deviceUuid) {
        const profile = this.userProfiles.get(userId);
        if (!profile)
            return 0.5;
        if (profile.trustedDevices.includes(deviceUuid))
            return 0;
        return 0.8; // Unknown device risk
    }
}
exports.BehavioralAnalyticsService = BehavioralAnalyticsService;
exports.behavioralAnalyticsService = BehavioralAnalyticsService.getInstance();
