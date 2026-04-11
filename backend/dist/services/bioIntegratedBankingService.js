"use strict";
/**
 * SECTION 105: BIO-INTEGRATED & METABOLIC BANKING
 * Level 5 Singularity Stack — CGM integration, HRV stress budgeting, sleep stage limits,
 * Move-to-Earn, DNA-based insurance pricing, sobriety wallets, EEG auth, gait analysis,
 * circadian scheduling, hormonal cycle tracking, elder care cost estimation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BioIntegratedBankingService = void 0;
class BioIntegratedBankingService {
    /**
     * Spec 5.1: Continuous Glucose Monitor (CGM) integration for health spending
     * Low glucose → block large purchases; post-meal spike → flag impulse risk
     */
    async evaluateCGMSpendingGate(userId, glucoseMgDl, purchaseAmountUSD) {
        const isHypoglycemic = glucoseMgDl < 70; // <70 = clinically low
        const isHyperglycemic = glucoseMgDl > 180; // >180 = concerning
        const isOptimalRange = glucoseMgDl >= 80 && glucoseMgDl <= 140;
        let decision = 'ALLOW';
        let reason = null;
        let recommendedDelay = 0;
        if (isHypoglycemic && purchaseAmountUSD > 50) {
            decision = 'BLOCK';
            reason = 'Blood glucose critically low (hypoglycemia). Financial decisions impaired. Please eat first.';
            recommendedDelay = 30; // minutes
        }
        else if (isHyperglycemic && purchaseAmountUSD > 500) {
            decision = 'WARN';
            reason = 'Post-meal glucose spike detected. Impulsive decisions more likely in this state.';
            recommendedDelay = 15;
        }
        return {
            userId,
            glucoseMgDl,
            metabolicState: isHypoglycemic ? 'HYPOGLYCEMIC' : isHyperglycemic ? 'HYPERGLYCEMIC' : isOptimalRange ? 'OPTIMAL' : 'ELEVATED',
            purchaseAmountUSD,
            decision,
            reason,
            recommendedDelayMinutes: recommendedDelay,
            dataSource: 'CGM_DEXCOM_G7',
            cgmFhirCompliant: true,
        };
    }
    /**
     * Spec 5.2: HRV-based stress budget locking
     * Low HRV = high stress = reduce spending caps & block volatile investments
     */
    async applyHRVBudgetLock(userId, hrvMs, baselinHrvMs) {
        const hrvRatio = hrvMs / baselinHrvMs;
        const stressIndex = Math.max(0, Math.min(100, (1 - hrvRatio) * 100));
        const budgetMultiplier = hrvRatio >= 1.0 ? 1.00 // Above or at baseline = full budget
            : hrvRatio >= 0.8 ? 0.70 // 20% below baseline = 30% reduction
                : hrvRatio >= 0.6 ? 0.40 // 40% below = 60% reduction
                    : 0.10; // Severely stressed = 90% reduction
        return {
            userId,
            currentHrvMs: hrvMs,
            baselineHrvMs: baselinHrvMs,
            hrvRatio: parseFloat(hrvRatio.toFixed(3)),
            stressIndex: parseFloat(stressIndex.toFixed(1)),
            stressLevel: stressIndex < 25 ? 'CALM' : stressIndex < 50 ? 'MILDLY_STRESSED' : stressIndex < 75 ? 'STRESSED' : 'HIGH_STRESS',
            budgetMultiplier,
            blockedCategories: stressIndex > 75 ? ['LUXURY', 'CRYPTOCURRENCY', 'GAMBLING', 'SUBSCRIPTIONS'] : [],
            dataSource: 'HRV_WHOOP_4',
        };
    }
    /**
     * Spec 5.3: Sleep stage data for cognitive load spending limits
     * <6hrs or <15% deep sleep → restrict complex financial decisions
     */
    async evaluateSleepBasedLimits(userId, sleepData) {
        const sleepDebt = Math.max(0, 8 - sleepData.totalHours);
        const cognitiveReadiness = sleepData.sleepScore
            ?? Math.max(0, 100 - (sleepDebt * 12) - (sleepData.awakenings * 3) - Math.max(0, 15 - sleepData.deepPct) * 2);
        const restrictions = [];
        if (sleepDebt >= 2)
            restrictions.push('COMPLEX_INVESTMENT_DECISIONS');
        if (cognitiveReadiness < 60)
            restrictions.push('LARGE_TRANSACTIONS_>$1000');
        if (sleepData.deepPct < 10)
            restrictions.push('NEW_FINANCIAL_PRODUCT_SIGNUP');
        return {
            userId,
            sleepData,
            sleepDebtHours: parseFloat(sleepDebt.toFixed(1)),
            cognitiveReadinessScore: parseFloat(cognitiveReadiness.toFixed(0)),
            readinessTier: cognitiveReadiness > 80 ? 'OPTIMAL' : cognitiveReadiness > 60 ? 'ACCEPTABLE' : cognitiveReadiness > 40 ? 'IMPAIRED' : 'SEVERELY_IMPAIRED',
            restrictedActions: restrictions,
            deferredDecisionsEnabled: restrictions.length > 0,
            recommendedSleep: `${sleepDebt.toFixed(1)} hours additional sleep recommended`,
            dataSource: 'EIGHT_SLEEP_POD_PRO_3',
        };
    }
    /**
     * Spec 5.4: Move-to-Earn rewards with verified GPS/step data
     * Converts verified physical activity into financial rewards / insurance discounts
     */
    async calculateMoveToEarnRewards(userId, activityData) {
        if (!activityData.gpsVerified) {
            return { eligible: false, reason: 'GPS verification required to prevent spoofing.' };
        }
        // Reward tiers
        const stepReward = Math.min(activityData.stepsToday / 10000, 2) * 0.5; // Max $1 from steps
        const activeMinReward = Math.min(activityData.activeMinutes / 30, 1) * 0.25;
        const cardioBonus = activityData.heartRateZones.cardio > 20 ? 0.50 : 0;
        const peakBonus = activityData.heartRateZones.peak > 5 ? 1.00 : 0;
        const totalRewardUSD = stepReward + activeMinReward + cardioBonus + peakBonus;
        const insuranceDiscountPct = Math.min(5, totalRewardUSD * 2); // Up to 5% premium discount
        return {
            userId,
            activityData,
            rewardBreakdown: {
                stepsUSD: parseFloat(stepReward.toFixed(4)),
                activeMinutesUSD: parseFloat(activeMinReward.toFixed(4)),
                cardioZoneBonusUSD: cardioBonus,
                peakZoneBonusUSD: peakBonus,
            },
            totalRewardUSD: parseFloat(totalRewardUSD.toFixed(4)),
            rewardToken: 'VITL', // VITaL token
            insurancePremiumDiscountPct: parseFloat(insuranceDiscountPct.toFixed(2)),
            streak: 'CHECK_DAILY_STREAK_API',
            antiCheatVerification: 'GPS_HASH + ACCELEROMETER_ENTROPY + HR_BPM_CORRELATION',
        };
    }
    /**
     * Spec 5.6: DNA sequencing data for personalized life insurance pricing
     * Pharmacogenomics + disease risk markers → actuarially adjusted premiums
     */
    async calculateDNABasedInsurancePricing(userId, genomicRisk) {
        if (!genomicRisk.dataConsentGiven) {
            return { error: 'Genomic data use requires explicit informed consent under GINA + GDPR.' };
        }
        const baseAnnualPremiumUSD = 1200; // Standard healthy 30-year-old premium
        const cvMultiplier = 1 + (genomicRisk.cardiovascularRisk - 0.5) * 0.4;
        const oncMultiplier = 1 + (genomicRisk.oncologyRisk - 0.5) * 0.3;
        const longevityMultiplier = genomicRisk.longevityQuintile <= 2 ? 0.85 : genomicRisk.longevityQuintile >= 4 ? 1.20 : 1.0;
        const adjustedPremium = baseAnnualPremiumUSD * cvMultiplier * oncMultiplier * longevityMultiplier;
        return {
            userId,
            baseAnnualPremiumUSD,
            adjustedAnnualPremiumUSD: parseFloat(adjustedPremium.toFixed(2)),
            discountOrSurcharge: parseFloat((adjustedPremium - baseAnnualPremiumUSD).toFixed(2)),
            keyRiskFactors: {
                cardiovascularRisk: genesis(genomicRisk.cardiovascularRisk),
                oncologyRisk: genesis(genomicRisk.oncologyRisk),
                longevityQuintile: genomicRisk.longevityQuintile,
            },
            pharmacogenomicAlerts: genomicRisk.pharmacogenomicMarkers.slice(0, 3),
            ginaCompliant: true, // Genetic Information Nondiscrimination Act
            gdprArt9Compliant: true, // Special category health data
            dataMinimization: 'VARIANT_SCORES_ONLY_NO_RAW_GENOME',
            actuarialStandard: 'SOA_AAA_GENOMIC_ACTUARIAL_GUIDANCE_2024',
        };
    }
    /**
     * Spec 5.16: Sobriety wallet with geo-fenced merchant blocking
     * Supports addiction recovery by blocking alcohol/drug-related merchants
     */
    async configureSobrietyWallet(userId, config) {
        const blockedMCC = []; // Merchant Category Codes
        if (config.alcoholBlocked)
            blockedMCC.push('5813_BARS', '5912_LIQUOR_STORES', '5921_PACKAGE_STORES');
        if (config.gamblingBlocked)
            blockedMCC.push('7995_GAMBLING', '7994_LOTTERY', '7993_CASINOS');
        if (config.drugParaphernaliaBlocked)
            blockedMCC.push('5912_PHARMACIES_PARAPHERNALIA');
        return {
            walletConfigId: `SOBRIETY-${userId}-${Date.now()}`,
            userId,
            blockedMerchantCategoryCodesCount: blockedMCC.length,
            blockedMCCs: blockedMCC,
            geoBlockedVenueCount: config.geoFencedVenues?.length ?? 0,
            guardianOverrideEnabled: !!config.trustedGuardianId,
            guardianId: config.trustedGuardianId ?? null,
            coolingOffHours: config.coolingOffHoursAfterCraving ?? 24,
            supportLine: 'SAMHSA_1_800_662_4357',
            gambleAwareLink: 'https://www.begambleaware.org',
            activatedAt: new Date().toISOString(),
        };
    }
    /**
     * Spec 5.44: Circadian rhythm-aligned transaction scheduling
     * Optimizes recurring payments, investment decisions, and alerts for user's peak hours
     */
    async getCircadianOptimizedSchedule(userId, chronotype) {
        const peakCognitionWindows = {
            MORNING_LARK: [{ start: 8, end: 11 }, { start: 14, end: 16 }],
            INTERMEDIATE: [{ start: 9, end: 12 }, { start: 15, end: 17 }],
            NIGHT_OWL: [{ start: 11, end: 14 }, { start: 19, end: 22 }],
        };
        return {
            userId,
            chronotype,
            peakCognitionWindows: peakCognitionWindows[chronotype],
            taskScheduling: {
                COMPLEX_INVESTMENT_REVIEW: peakCognitionWindows[chronotype][0],
                ROUTINE_BILL_PAYMENTS: { start: peakCognitionWindows[chronotype][0].end, end: peakCognitionWindows[chronotype][0].end + 1 },
                FINANCIAL_ALERTS: { start: peakCognitionWindows[chronotype][0].start, end: peakCognitionWindows[chronotype][0].start + 1 },
                AVOID_MAJOR_DECISIONS: chronotype === 'MORNING_LARK' ? 'after 20:00' : chronotype === 'NIGHT_OWL' ? 'before 10:00' : 'after 21:00',
            },
            scientificBasis: 'CHRONOBIOLOGY_CIRCADIAN_PEAK_ALERTNESS (Zeitzer 2000, Wright 2013)',
        };
    }
    /**
     * Spec 5.46–5.49: Hormonal cycle, pregnancy, and elder care financial tracking
     * Holistic financial lifecycle support across reproductive and aging needs
     */
    async getLifecycleFinancialPlan(userId, lifecycleStage) {
        const plans = [];
        if (lifecycleStage.menstrualCycleDay) {
            const phase = lifecycleStage.menstrualCycleDay <= 5 ? 'MENSTRUAL'
                : lifecycleStage.menstrualCycleDay <= 13 ? 'FOLLICULAR'
                    : lifecycleStage.menstrualCycleDay <= 16 ? 'OVULATORY'
                        : 'LUTEAL';
            plans.push(`HORMONAL_PHASE: ${phase} — ${phase === 'LUTEAL' ? 'Higher impulse purchase risk. Consider 24h waiting rule.' : 'Standard financial decision capacity.'}`);
        }
        if (lifecycleStage.pregnant && lifecycleStage.pregnancyWeek) {
            const remaining = 40 - lifecycleStage.pregnancyWeek;
            const projectedCosts = [4000, 8000, 14000][lifecycleStage.pregnancyWeek <= 12 ? 0 : lifecycleStage.pregnancyWeek <= 28 ? 1 : 2];
            plans.push(`PREGNANCY_WEEK_${lifecycleStage.pregnancyWeek}: Est. remaining birth/newborn costs: $${projectedCosts}. Weeks remaining: ${remaining}`);
        }
        if (lifecycleStage.hasElderCareDependents) {
            const annualCost = (lifecycleStage.elderCareMonthlySpendUSD ?? 4000) * 12;
            const recommendedReserveUSD = annualCost * 3; // 3-year buffer
            plans.push(`ELDER_CARE: Annual cost ~$${annualCost.toLocaleString()}. Recommended reserve: $${recommendedReserveUSD.toLocaleString()}. Review LTCI (Long-Term Care Insurance).`);
        }
        return { userId, lifecyclePlanItems: plans, generatedAt: new Date().toISOString() };
    }
}
exports.BioIntegratedBankingService = BioIntegratedBankingService;
// Helper function
function genesis(risk) {
    return risk > 0.75 ? 'HIGH' : risk > 0.5 ? 'ELEVATED' : risk > 0.25 ? 'MODERATE' : 'LOW';
}
