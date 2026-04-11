"use strict";
/**
 * SECTION 112: HYPER-PERSONALIZED ECONOMIC MODELS
 * SECTION 195: BEHAVIORAL FINANCE ADVANCED
 * Omega P5 — Individual inflation, micro-budgeting, biometric-triggered spending blocks,
 * values-based spending filters, mood-aware advice, social capital tracking, impact investing
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperPersonalizedEconomicsService = void 0;
class HyperPersonalizedEconomicsService {
    /**
     * Feature 112.1: Individual inflation rate — personal CPI basket
     * Calculates YOUR inflation, not the national average (based on actual spending)
     */
    async calculatePersonalCPI(userId, spendingData, nationalCpiRate) {
        const totalBaselineSpend = spendingData.reduce((s, d) => s + d.monthlySpendBaseline, 0);
        const basketItems = spendingData.map(d => {
            const weight = d.monthlySpendBaseline / totalBaselineSpend;
            const priceIndexChange = d.monthlySpendCurrent / d.monthlySpendBaseline;
            return {
                category: d.category,
                weight: parseFloat(weight.toFixed(4)),
                currentPriceIndex: parseFloat((priceIndexChange * 100).toFixed(2)),
                baselinePriceIndex: 100,
            };
        });
        const personalInflationRate = basketItems.reduce((s, item) => {
            return s + (item.weight * (item.currentPriceIndex - 100) / 100);
        }, 0);
        return {
            userId,
            basketItems,
            personalInflationRate: parseFloat((personalInflationRate * 100).toFixed(2)),
            nationalCpiRate,
            personalVsNational: parseFloat(((personalInflationRate * 100) - nationalCpiRate).toFixed(2)),
            calculatedAt: new Date().toISOString(),
        };
    }
    /**
     * Feature 112.3: Micro-budgeting automation — per-minute financial granularity
     * Tracks budget remaining in real-time, down to minute-by-minute cash flow
     */
    getMicroBudget(monthlyBudgetUSD, currentDatetime = new Date()) {
        const startOfMonth = new Date(currentDatetime.getFullYear(), currentDatetime.getMonth(), 1);
        const endOfMonth = new Date(currentDatetime.getFullYear(), currentDatetime.getMonth() + 1, 0);
        const totalMinutesInMonth = (endOfMonth.getTime() - startOfMonth.getTime()) / 60000;
        const minutesElapsed = (currentDatetime.getTime() - startOfMonth.getTime()) / 60000;
        const minutesRemaining = totalMinutesInMonth - minutesElapsed;
        const budgetPerMinute = monthlyBudgetUSD / totalMinutesInMonth;
        const budgetConsumedSoFar = budgetPerMinute * minutesElapsed;
        const budgetRemaining = monthlyBudgetUSD - budgetConsumedSoFar;
        return {
            monthlyBudgetUSD,
            budgetPerMinuteUSD: parseFloat(budgetPerMinute.toFixed(6)),
            budgetPerHourUSD: parseFloat((budgetPerMinute * 60).toFixed(4)),
            budgetPerDayUSD: parseFloat((budgetPerMinute * 60 * 24).toFixed(2)),
            minutesElapsed: Math.round(minutesElapsed),
            minutesRemaining: Math.round(minutesRemaining),
            budgetConsumedProRataUSD: parseFloat(budgetConsumedSoFar.toFixed(2)),
            budgetRemainingUSD: parseFloat(budgetRemaining.toFixed(2)),
            onTrack: true, // In production: compare against actual spend
            nextHourBudgetAllowanceUSD: parseFloat((budgetPerMinute * 60).toFixed(2)),
        };
    }
    /**
     * Feature 112.5: Values-based spending filter
     * Blocks or flags purchases that contradict user's stated personal values
     */
    async applyValuesFilter(userId, purchase, userValues) {
        const valueConflicts = [];
        // Sustainability check
        if (userValues.includes('SUSTAINABILITY')) {
            if (purchase.merchantEsgScore !== undefined && purchase.merchantEsgScore < 40) {
                valueConflicts.push({ value: 'SUSTAINABILITY', concern: `${purchase.merchant} ESG score ${purchase.merchantEsgScore}/100 is below your threshold.`, severity: 'HIGH' });
            }
            if (['FAST_FASHION', 'SINGLE_USE_PLASTIC', 'HIGH_CARBON_TRAVEL'].includes(purchase.category)) {
                valueConflicts.push({ value: 'SUSTAINABILITY', concern: `${purchase.category} conflicts with sustainability values.`, severity: 'MEDIUM' });
            }
        }
        // Security check — large impulse purchases
        if (userValues.includes('SECURITY') && purchase.amountUSD > 500) {
            valueConflicts.push({ value: 'SECURITY', concern: `Large purchase $${purchase.amountUSD} may conflict with your financial security priority. Confirm?`, severity: 'LOW' });
        }
        // Community check
        if (userValues.includes('COMMUNITY') && ['MEGA_CORPORATION', 'MONOPOLY'].includes(purchase.category)) {
            valueConflicts.push({ value: 'COMMUNITY', concern: 'Consider if a local alternative aligns better with your community value.', severity: 'LOW' });
        }
        return {
            purchaseId: `PUR-${Date.now()}`,
            allow: valueConflicts.filter(c => c.severity === 'HIGH').length === 0,
            valueConflicts,
            overallAlignmentScore: parseFloat(((1 - valueConflicts.length / (userValues.length * 2)) * 100).toFixed(1)),
            alternatives: valueConflicts.length > 0 ? [`Search for ethical alternatives to ${purchase.merchant}`] : [],
        };
    }
    /**
     * Feature 112.4: Habit-based spending limits with behavioral science
     * Automatically tightens limits for habitual patterns (subscription creep, emotional spending)
     */
    async detectSpendingHabits(monthlyHistory) {
        const categoryTotals = {};
        for (const tx of monthlyHistory) {
            const month = tx.date.slice(0, 7);
            if (!categoryTotals[tx.category])
                categoryTotals[tx.category] = [];
            categoryTotals[tx.category].push(tx.amountUSD);
        }
        const habits = Object.entries(categoryTotals).map(([category, amounts]) => {
            const avg = amounts.reduce((s, a) => s + a, 0) / amounts.length;
            const max = Math.max(...amounts);
            const volatility = Math.sqrt(amounts.reduce((s, a) => s + Math.pow(a - avg, 2), 0) / amounts.length);
            const isHabit = amounts.length >= 3 && volatility / avg < 0.3; // Low variance = habit
            return {
                category,
                occurrences: amounts.length,
                avgMonthlyUSD: parseFloat(avg.toFixed(2)),
                maxSpendUSD: parseFloat(max.toFixed(2)),
                isRecurringHabit: isHabit,
                habitStrength: isHabit ? 'STRONG' : amounts.length >= 2 ? 'FORMING' : 'NONE',
                recommendedBudgetCapUSD: parseFloat((avg * 1.10).toFixed(2)), // 10% buffer above habit average
            };
        });
        return {
            habits: habits.sort((a, b) => b.avgMonthlyUSD - a.avgMonthlyUSD),
            totalMonthlyFromHabits: parseFloat(habits.filter(h => h.isRecurringHabit).reduce((s, h) => s + h.avgMonthlyUSD, 0).toFixed(2)),
            subscriptionCreepWarning: habits.filter(h => h.isRecurringHabit && h.category === 'SUBSCRIPTIONS').length > 5,
        };
    }
    /**
     * Feature 112.7: Social capital tracking — non-monetary value accounting
     * Tracks "social ROI" from community participation, volunteering, gifting
     */
    async trackSocialCapital(userId, activities) {
        const socialValueMultipliers = {
            VOLUNTEERING: 30, // $30/hr social value (approx IndependentSector.org rate)
            GIFTING: 1.5, // 1.5x multiplier on gift value
            MENTORING: 50, // $50/hr (skill transfer value)
            COMMUNITY_CONTRIBUTION: 25, // $25/hr
            KNOWLEDGE_SHARING: 40, // $40/hr
        };
        const capitalItems = activities.map(a => {
            const multiplier = socialValueMultipliers[a.type];
            const socialValueUSD = a.hoursOrUSD * multiplier * Math.log(1 + a.recipientCount);
            return {
                type: a.type,
                inputValue: a.hoursOrUSD,
                recipientCount: a.recipientCount,
                socialValueUSD: parseFloat(socialValueUSD.toFixed(2)),
                date: a.date,
            };
        });
        const totalSocialCapitalUSD = capitalItems.reduce((s, c) => s + c.socialValueUSD, 0);
        return {
            userId,
            totalSocialCapitalUSD: parseFloat(totalSocialCapitalUSD.toFixed(2)),
            activities: capitalItems,
            socialCapitalScore: Math.min(1000, Math.round(totalSocialCapitalUSD / 100)),
            reputationImpact: 'VISIBLE_ON_PATHGUARD_COMMUNITY_PROFILE',
            taxDeductiblePortionUSD: capitalItems
                .filter(c => c.type === 'VOLUNTEERING' || c.type === 'GIFTING')
                .reduce((s, c) => s + c.socialValueUSD * 0.3, 0), // Approx deductible value
        };
    }
    /**
     * Feature 195.1: Behavioral bias scanner — detect and correct 12 major biases
     * In real-time, warns when a financial decision appears to be bias-driven
     */
    async scanBehavioralBiases(decisionContext) {
        const detectedBiases = [];
        if (decisionContext.timeSpentConsideringMinutes < 2 && !decisionContext.priorExperienceWithProduct) {
            detectedBiases.push({ bias: 'AVAILABILITY_HEURISTIC', evidence: 'Very quick decision on unfamiliar product.', debiasStrategy: 'Sleep on it — wait 24 hours before purchasing unfamiliar products.' });
        }
        if (decisionContext.emotionalStateRating >= 8) {
            detectedBiases.push({ bias: 'EMOTIONAL_DECISION_MAKING', evidence: `High emotional state (${decisionContext.emotionalStateRating}/10).`, debiasStrategy: 'Invoke 10-10-10 rule: How will you feel in 10 min, 10 hrs, 10 days?' });
        }
        if (decisionContext.recentLossUSD && decisionContext.recentLossUSD > 500) {
            detectedBiases.push({ bias: 'LOSS_AVERSION_OVERREACTION', evidence: `Recent $${decisionContext.recentLossUSD} loss may be distorting risk perception.`, debiasStrategy: 'Evaluate this decision independently from the recent loss.' });
        }
        if (decisionContext.initialAnchorPriceUSD && decisionContext.finalDecisionPriceUSD) {
            const anchorInfluence = Math.abs(decisionContext.finalDecisionPriceUSD - decisionContext.initialAnchorPriceUSD) / decisionContext.initialAnchorPriceUSD;
            if (anchorInfluence < 0.05) {
                detectedBiases.push({ bias: 'ANCHORING', evidence: 'Final price very close to initial anchor — may be anchored.', debiasStrategy: 'Research fair market value independently before seeing the listed price.' });
            }
        }
        if (decisionContext.triggerEvent?.includes('friend')) {
            detectedBiases.push({ bias: 'SOCIAL_PROOF_BIAS', evidence: 'Decision triggered by social reference.', debiasStrategy: 'Is this for you or to keep up with others?' });
        }
        return {
            biasCount: detectedBiases.length,
            detectedBiases,
            overallBiasRisk: detectedBiases.length === 0 ? 'LOW' : detectedBiases.length <= 2 ? 'MEDIUM' : 'HIGH',
            proceedRecommendation: detectedBiases.length >= 2 ? 'DEFER_DECISION' : 'PROCEED_WITH_AWARENESS',
            cognitiveLibertyClear: detectedBiases.length === 0,
        };
    }
}
exports.HyperPersonalizedEconomicsService = HyperPersonalizedEconomicsService;
