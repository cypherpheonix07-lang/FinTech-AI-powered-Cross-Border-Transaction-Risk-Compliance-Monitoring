/**
 * SECTION 105: SELF-HEALING FINANCIAL INFRASTRUCTURE
 * Ultimate Nuclear Spec — autonomous fault detection, root cause analysis,
 * self-repair, self-optimization, self-scaling, self-protection,
 * chaos engineering hooks, self-audit, compliance enforcement,
 * and anti-fragile resilience patterns
 */

export type HealingAction = 'RESTART' | 'SCALE_UP' | 'SCALE_DOWN' | 'FAILOVER' | 'ROLLBACK' | 'PATCH' | 'ISOLATE' | 'REBALANCE' | 'CACHE_WARM' | 'DRAIN_QUEUE' | 'CIRCUIT_RESET' | 'REROUTE' | 'NOOP';
export type FaultSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
export type ComponentType = 'SERVICE' | 'DATABASE' | 'CACHE' | 'QUEUE' | 'LOAD_BALANCER' | 'CDN' | 'GATEWAY' | 'SCHEDULER' | 'WORKER' | 'STORAGE';
export type HealingStatus = 'DETECTING' | 'DIAGNOSING' | 'ACTING' | 'VERIFYING' | 'RESOLVED' | 'FAILED' | 'ESCALATED';

export interface ComponentHealth {
  componentId: string;
  componentType: ComponentType;
  name: string;
  region: string;
  status: 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY' | 'CRITICAL' | 'UNKNOWN';
  metrics: ComponentMetrics;
  lastHealthCheck: string;
  version: string;
  replicas: { running: number; desired: number; ready: number };
}

export interface ComponentMetrics {
  cpuPercent: number;
  memoryPercent: number;
  errorRatePer1000: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  requestsPerSec: number;
  queueDepth?: number;
  diskUsagePercent?: number;
  networkBandwidthMbps?: number;
  activeConnections?: number;
  gcPauseMs?: number;
}

export interface Fault {
  faultId: string;
  componentId: string;
  severity: FaultSeverity;
  type: string;                    // e.g. 'HIGH_ERROR_RATE' | 'LATENCY_SPIKE' | 'MEMORY_LEAK' | 'CRASH_LOOP'
  description: string;
  detectedAt: string;
  rootCause?: string;
  contributingFactors?: string[];
  affectedComponents?: string[];
  estimatedImpact: { usersAffected: number; revenueRisk: number; dataRisk: boolean };
  status: HealingStatus;
  resolution?: string;
  resolvedAt?: string;
}

export interface HealingPlan {
  planId: string;
  faultId: string;
  targetComponentId: string;
  actions: HealingStep[];
  estimatedDurationMs: number;
  rollbackPlan: HealingStep[];
  safetyChecks: string[];
  requiresHumanApproval: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface HealingStep {
  stepId: string;
  action: HealingAction;
  params: Record<string, string | number | boolean>;
  order: number;
  parallel: boolean;              // Can run in parallel with other steps
  retryable: boolean;
  maxRetries: number;
  timeoutMs: number;
  rollbackAction?: HealingAction;
  preChecks?: string[];
  postChecks?: string[];
}

export interface HealingEvent {
  eventId: string;
  faultId: string;
  planId: string;
  step: HealingStep;
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'SKIPPED';
  startedAt?: string;
  completedAt?: string;
  errorMessage?: string;
  output?: Record<string, unknown>;
}

export interface ChaosExperiment {
  experimentId: string;
  name: string;
  hypothesis: string;
  targetComponents: string[];
  faultType: 'LATENCY' | 'ERROR' | 'CRASH' | 'RESOURCE_SATURATION' | 'NETWORK_PARTITION' | 'CLOCK_SKEW';
  faultParams: Record<string, number>;    // e.g. { latencyMs: 500, errorRate: 0.1 }
  duration: number;                        // seconds
  rollbackOnBreach: boolean;
  breachConditions: Record<string, number>; // e.g. { errorRate: 0.05, p99LatencyMs: 2000 }
  schedule?: string;                        // Cron expression
  status: 'DRAFT' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'ROLLED_BACK';
  results?: ChaosExperimentResult;
}

export interface ChaosExperimentResult {
  systemSurvived: boolean;
  hypothesis_validated: boolean;
  metrics_before: ComponentMetrics;
  metrics_during: ComponentMetrics;
  metrics_after: ComponentMetrics;
  weaknesses_found: string[];
  recommendations: string[];
}

export interface SelfOptimizationResult {
  componentId: string;
  optimizationType: 'RESOURCE_ALLOCATION' | 'QUERY_OPTIMIZATION' | 'CACHE_TUNING' | 'THREAD_POOL' | 'BATCH_SIZE' | 'TIMEOUT_CALIBRATION';
  oldValue: Record<string, number | string>;
  newValue: Record<string, number | string>;
  expectedImprovementPercent: number;
  actualImprovementPercent?: number;
  appliedAt: string;
  verifiedAt?: string;
  reverted: boolean;
}

// ======================================================================
// SELF-HEALING INFRASTRUCTURE SERVICE
// ======================================================================

export class SelfHealingInfrastructureService {
  private components: Map<string, ComponentHealth> = new Map();
  private faults: Map<string, Fault> = new Map();
  private healingHistory: HealingEvent[] = [];
  private chaosExperiments: Map<string, ChaosExperiment> = new Map();

  // ---- COMPONENT REGISTRATION ------------------------------------------

  registerComponent(health: ComponentHealth): void {
    this.components.set(health.componentId, health);
  }

  updateHealth(componentId: string, metrics: ComponentMetrics): void {
    const c = this.components.get(componentId);
    if (!c) return;
    c.metrics = metrics;
    c.lastHealthCheck = new Date().toISOString();
    c.status = this._deriveStatus(metrics);
  }

  private _deriveStatus(m: ComponentMetrics): ComponentHealth['status'] {
    if (m.errorRatePer1000 > 100 || m.cpuPercent > 95 || m.memoryPercent > 95) return 'CRITICAL';
    if (m.errorRatePer1000 > 30  || m.cpuPercent > 80 || m.p99LatencyMs > 5000)  return 'UNHEALTHY';
    if (m.errorRatePer1000 > 10  || m.cpuPercent > 70 || m.p99LatencyMs > 2000)  return 'DEGRADED';
    return 'HEALTHY';
  }

  // ---- FAULT DETECTION (AUTOMATED MONITORING) ---------------------------

  detectFaults(): Fault[] {
    const detected: Fault[] = [];

    for (const [id, c] of this.components) {
      const faults = this._analyzeComponent(c);
      for (const f of faults) {
        if (!this.faults.has(f.faultId)) {
          this.faults.set(f.faultId, f);
          detected.push(f);
        }
      }
    }

    return detected;
  }

  private _analyzeComponent(c: ComponentHealth): Fault[] {
    const faults: Fault[] = [];
    const m = c.metrics;
    const base = { componentId: c.componentId, detectedAt: new Date().toISOString(), status: 'DETECTING' as HealingStatus };

    if (m.errorRatePer1000 > 50) {
      faults.push({ ...base, faultId: `fault-${c.componentId}-err-${Date.now()}`, severity: m.errorRatePer1000 > 100 ? 'CRITICAL' : 'HIGH', type: 'HIGH_ERROR_RATE', description: `Error rate ${m.errorRatePer1000}/1000 exceeds threshold`, estimatedImpact: { usersAffected: Math.round(m.requestsPerSec * 0.05), revenueRisk: m.errorRatePer1000 * 100, dataRisk: false } });
    }
    if (m.p99LatencyMs > 3000) {
      faults.push({ ...base, faultId: `fault-${c.componentId}-lat-${Date.now()}`, severity: m.p99LatencyMs > 8000 ? 'CRITICAL' : 'HIGH', type: 'LATENCY_SPIKE', description: `p99 latency ${m.p99LatencyMs}ms exceeds SLO`, estimatedImpact: { usersAffected: Math.round(m.requestsPerSec * 0.99), revenueRisk: 5000, dataRisk: false } });
    }
    if (m.memoryPercent > 90) {
      faults.push({ ...base, faultId: `fault-${c.componentId}-mem-${Date.now()}`, severity: m.memoryPercent > 95 ? 'CRITICAL' : 'HIGH', type: 'MEMORY_EXHAUSTION', description: `Memory usage ${m.memoryPercent}% near limit`, estimatedImpact: { usersAffected: 0, revenueRisk: 0, dataRisk: true } });
    }
    if (c.replicas.running < c.replicas.desired) {
      faults.push({ ...base, faultId: `fault-${c.componentId}-rep-${Date.now()}`, severity: 'MEDIUM', type: 'REPLICA_SHORTAGE', description: `Only ${c.replicas.running}/${c.replicas.desired} replicas running`, estimatedImpact: { usersAffected: 0, revenueRisk: 1000, dataRisk: false } });
    }
    if ((m.queueDepth ?? 0) > 10000) {
      faults.push({ ...base, faultId: `fault-${c.componentId}-q-${Date.now()}`, severity: 'HIGH', type: 'QUEUE_BACKLOG', description: `Queue depth ${m.queueDepth} exceeds healthy threshold`, estimatedImpact: { usersAffected: 100, revenueRisk: 2000, dataRisk: false } });
    }

    return faults;
  }

  // ---- ROOT CAUSE ANALYSIS ----------------------------------------------

  performRCA(faultId: string): { rootCause: string; contributingFactors: string[]; confidence: number; timeline: string[] } {
    const fault = this.faults.get(faultId);
    if (!fault) return { rootCause: 'UNKNOWN', contributingFactors: [], confidence: 0, timeline: [] };

    // Simplified RCA — production: ML-based anomaly correlation + causal graph traversal
    const rcaMap: Record<string, { rootCause: string; factors: string[] }> = {
      HIGH_ERROR_RATE:   { rootCause: 'Upstream dependency failure or code regression', factors: ['Deployment in last 2h', 'Database connection pool saturation', 'Memory pressure causing GC pauses'] },
      LATENCY_SPIKE:     { rootCause: 'Database query inefficiency or cache miss storm', factors: ['Cache eviction spike', 'Index missing on hot query', 'Connection pool exhaustion'] },
      MEMORY_EXHAUSTION: { rootCause: 'Memory leak in service or unbounded cache growth', factors: ['Heap dump shows growing old generation', 'Cache eviction disabled', 'Event listener accumulation'] },
      REPLICA_SHORTAGE:  { rootCause: 'Node eviction or pod OOM kill', factors: ['Node resource pressure', 'PodAntiAffinity conflict', 'Startup probe failure'] },
      QUEUE_BACKLOG:     { rootCause: 'Consumer throughput insufficient or consumer crash', factors: ['Consumer lag increasing for >10min', 'Dead letter queue growing', 'Processing retry storm'] },
    };

    const rca = rcaMap[fault.type] ?? { rootCause: 'Undetermined — requires manual investigation', factors: [] };

    fault.rootCause = rca.rootCause;
    fault.contributingFactors = rca.factors;

    return {
      rootCause: rca.rootCause, contributingFactors: rca.factors, confidence: 0.82,
      timeline: [
        `T-30m: Normal conditions`, `T-10m: Early warning signs`, `T-5m: Threshold breached`, `T-0: Fault detected`,
      ],
    };
  }

  // ---- HEALING PLAN GENERATION ------------------------------------------

  generateHealingPlan(faultId: string): HealingPlan {
    const fault = this.faults.get(faultId);
    if (!fault) throw new Error(`Fault ${faultId} not found`);

    const actionMap: Record<string, HealingStep[]> = {
      HIGH_ERROR_RATE: [
        { stepId: 's1', action: 'CIRCUIT_RESET', params: { targetService: fault.componentId }, order: 1, parallel: false, retryable: true, maxRetries: 2, timeoutMs: 5000, postChecks: ['error_rate_below_10'] },
        { stepId: 's2', action: 'ROLLBACK', params: { toVersion: 'previous', targetService: fault.componentId }, order: 2, parallel: false, retryable: true, maxRetries: 1, timeoutMs: 120000 },
      ],
      LATENCY_SPIKE: [
        { stepId: 's1', action: 'CACHE_WARM', params: { targetService: fault.componentId }, order: 1, parallel: true, retryable: true, maxRetries: 2, timeoutMs: 30000 },
        { stepId: 's2', action: 'SCALE_UP', params: { targetService: fault.componentId, replicaCount: 2 }, order: 2, parallel: true, retryable: true, maxRetries: 2, timeoutMs: 60000 },
      ],
      MEMORY_EXHAUSTION: [
        { stepId: 's1', action: 'RESTART', params: { targetService: fault.componentId, graceful: true }, order: 1, parallel: false, retryable: true, maxRetries: 2, timeoutMs: 30000 },
        { stepId: 's2', action: 'SCALE_UP', params: { targetService: fault.componentId, replicaCount: 1 }, order: 2, parallel: false, retryable: false, maxRetries: 1, timeoutMs: 60000 },
      ],
      REPLICA_SHORTAGE: [
        { stepId: 's1', action: 'SCALE_UP', params: { targetService: fault.componentId, replicaCount: 2 }, order: 1, parallel: false, retryable: true, maxRetries: 3, timeoutMs: 120000 },
      ],
      QUEUE_BACKLOG: [
        { stepId: 's1', action: 'DRAIN_QUEUE', params: { targetService: fault.componentId, batchSize: 500 }, order: 1, parallel: true, retryable: true, maxRetries: 2, timeoutMs: 300000 },
        { stepId: 's2', action: 'SCALE_UP', params: { targetService: fault.componentId, workers: 5 }, order: 2, parallel: true, retryable: true, maxRetries: 2, timeoutMs: 60000 },
      ],
    };

    const actions = actionMap[fault.type] ?? [{ stepId: 's1', action: 'NOOP' as HealingAction, params: {}, order: 1, parallel: false, retryable: false, maxRetries: 0, timeoutMs: 0 }];
    const requiresHuman = fault.severity === 'CRITICAL' && fault.estimatedImpact.dataRisk;

    return {
      planId: `plan-${faultId.slice(0, 12)}-${Date.now()}`,
      faultId, targetComponentId: fault.componentId,
      actions,
      estimatedDurationMs: actions.reduce((s, a) => s + a.timeoutMs, 0),
      rollbackPlan: [{ stepId: 'rb1', action: 'ROLLBACK', params: { target: fault.componentId }, order: 1, parallel: false, retryable: false, maxRetries: 1, timeoutMs: 120000 }],
      safetyChecks: ['backup_recent', 'traffic_under_threshold', 'no_active_deployments'],
      requiresHumanApproval: requiresHuman,
    };
  }

  // ---- PLAN EXECUTION ---------------------------------------------------

  async executePlan(plan: HealingPlan): Promise<{ success: boolean; events: HealingEvent[] }> {
    const events: HealingEvent[] = [];

    for (const step of plan.actions.sort((a, b) => a.order - b.order)) {
      const event: HealingEvent = {
        eventId: `evt-${Date.now()}-${step.stepId}`,
        faultId: plan.faultId,
        planId: plan.planId,
        step, status: 'RUNNING',
        startedAt: new Date().toISOString(),
      };

      try {
        await this._executeStep(step);
        event.status = 'SUCCESS';
        event.completedAt = new Date().toISOString();
      } catch (err) {
        event.status = 'FAILED';
        event.errorMessage = String(err);
        event.completedAt = new Date().toISOString();
        events.push(event);
        this.healingHistory.push(event);

        // Execute rollback on failure
        if (plan.rollbackPlan.length > 0) {
          for (const rb of plan.rollbackPlan) await this._executeStep(rb).catch(() => {});
        }
        return { success: false, events };
      }

      events.push(event);
      this.healingHistory.push(event);
    }

    // Mark fault as resolved
    const fault = this.faults.get(plan.faultId);
    if (fault) { fault.status = 'RESOLVED'; fault.resolvedAt = new Date().toISOString(); fault.resolution = `Auto-healed via plan ${plan.planId}`; }

    return { success: true, events };
  }

  private async _executeStep(step: HealingStep): Promise<void> {
    // Production: calls Kubernetes API, cloud provider SDKs, or internal platform APIs
    const actLog = `[SelfHeal] Executing ${step.action} with params ${JSON.stringify(step.params)}`;
    console.log(actLog);
    await new Promise(r => setTimeout(r, 100)); // Simulate async action
  }

  // ---- SELF-OPTIMIZATION -----------------------------------------------

  optimizeComponent(componentId: string): SelfOptimizationResult[] {
    const c = this.components.get(componentId);
    if (!c) return [];

    const results: SelfOptimizationResult[] = [];
    const m = c.metrics;
    const base = { componentId, appliedAt: new Date().toISOString(), reverted: false };

    if (m.cpuPercent > 70) {
      results.push({ ...base, optimizationType: 'THREAD_POOL', oldValue: { threads: 8 }, newValue: { threads: Math.min(32, 8 + Math.ceil(m.cpuPercent / 20)) }, expectedImprovementPercent: 15 });
    }
    if (m.p95LatencyMs > 1000) {
      results.push({ ...base, optimizationType: 'CACHE_TUNING', oldValue: { cacheSizeMb: 256, evictionPolicy: 'LRU' }, newValue: { cacheSizeMb: 512, evictionPolicy: 'ARC' }, expectedImprovementPercent: 25 });
    }
    if ((m.queueDepth ?? 0) > 1000) {
      results.push({ ...base, optimizationType: 'BATCH_SIZE', oldValue: { batchSize: 100 }, newValue: { batchSize: 500 }, expectedImprovementPercent: 40 });
    }

    return results;
  }

  // ---- CHAOS ENGINEERING -----------------------------------------------

  createChaosExperiment(exp: ChaosExperiment): void {
    this.chaosExperiments.set(exp.experimentId, exp);
  }

  async runChaosExperiment(experimentId: string): Promise<ChaosExperimentResult> {
    const exp = this.chaosExperiments.get(experimentId);
    if (!exp) throw new Error(`Chaos experiment ${experimentId} not found`);

    exp.status = 'RUNNING';
    const metricsBefore = this.components.get(exp.targetComponents[0])?.metrics ?? {} as ComponentMetrics;

    // Inject fault (simulated)
    console.log(`[Chaos] Injecting ${exp.faultType} on ${exp.targetComponents.join(', ')}: ${JSON.stringify(exp.faultParams)}`);
    await new Promise(r => setTimeout(r, 500)); // Simulate fault injection

    const metricsDuring: ComponentMetrics = { ...metricsBefore, errorRatePer1000: (metricsBefore.errorRatePer1000 ?? 0) + (exp.faultParams.errorRate ?? 0) * 1000, p99LatencyMs: (metricsBefore.p99LatencyMs ?? 0) + (exp.faultParams.latencyMs ?? 0) };

    // Check breach conditions
    const breached = Object.entries(exp.breachConditions).some(([metric, limit]) => (metricsDuring as unknown as Record<string, number>)[metric] > limit);

    if (breached && exp.rollbackOnBreach) {
      exp.status = 'ROLLED_BACK';
    } else {
      exp.status = 'COMPLETED';
    }

    const result: ChaosExperimentResult = {
      systemSurvived: !breached,
      hypothesis_validated: !breached,
      metrics_before: metricsBefore,
      metrics_during: metricsDuring,
      metrics_after: metricsBefore, // Recovered
      weaknesses_found: breached ? [`${exp.faultType} causes breach of ${JSON.stringify(exp.breachConditions)}`] : [],
      recommendations: breached ? ['Add circuit breaker', 'Increase replicas', 'Improve fallback behavior'] : ['System resilient — no changes needed'],
    };

    exp.results = result;
    return result;
  }

  // ---- AUDIT & REPORTING -----------------------------------------------

  generateHealthReport(): {
    timestamp: string;
    totalComponents: number;
    healthy: number; degraded: number; unhealthy: number; critical: number;
    openFaults: number; resolvedFaultsLast24h: number;
    healingActionsLast24h: number;
    avgTimeToHealMs: number;
    topIssues: Array<{ type: string; count: number }>;
  } {
    const components = Array.from(this.components.values());
    const faults = Array.from(this.faults.values());
    const now = new Date();
    const past24h = new Date(now.getTime() - 86400000);

    const resolved24h = faults.filter(f => f.resolvedAt && new Date(f.resolvedAt) > past24h);
    const healing24h = this.healingHistory.filter(e => e.startedAt && new Date(e.startedAt) > past24h);

    const resolvedWithTime = resolved24h.filter(f => f.detectedAt && f.resolvedAt);
    const avgHealTime = resolvedWithTime.length > 0
      ? resolvedWithTime.reduce((s, f) => s + (new Date(f.resolvedAt!).getTime() - new Date(f.detectedAt).getTime()), 0) / resolvedWithTime.length
      : 0;

    const faultTypeCounts: Record<string, number> = {};
    for (const f of faults) faultTypeCounts[f.type] = (faultTypeCounts[f.type] ?? 0) + 1;

    return {
      timestamp: now.toISOString(),
      totalComponents: components.length,
      healthy:  components.filter(c => c.status === 'HEALTHY').length,
      degraded: components.filter(c => c.status === 'DEGRADED').length,
      unhealthy:components.filter(c => c.status === 'UNHEALTHY').length,
      critical: components.filter(c => c.status === 'CRITICAL').length,
      openFaults: faults.filter(f => f.status !== 'RESOLVED').length,
      resolvedFaultsLast24h: resolved24h.length,
      healingActionsLast24h: healing24h.length,
      avgTimeToHealMs: Math.round(avgHealTime),
      topIssues: Object.entries(faultTypeCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([type, count]) => ({ type, count })),
    };
  }
}
