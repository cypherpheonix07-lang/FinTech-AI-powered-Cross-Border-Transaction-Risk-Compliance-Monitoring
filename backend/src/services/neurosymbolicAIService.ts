/**
 * SECTION 102: NEUROSYMBOLIC AI FINANCIAL REASONING ENGINE
 * Hybrid neural-symbolic: knowledge graphs, causal reasoning (do-calculus),
 * case-based reasoning, deontic compliance logic, counterfactual queries,
 * forward/backward chaining, and explainability.
 */

export type ReasoningMode = 'DEDUCTIVE' | 'INDUCTIVE' | 'ABDUCTIVE' | 'CAUSAL' | 'COUNTERFACTUAL' | 'DEONTIC';
export type InferenceStatus = 'PROVEN' | 'REFUTED' | 'UNCERTAIN' | 'UNKNOWN';
export type RuleType = 'HORN_CLAUSE' | 'DEFEASIBLE' | 'PROBABILISTIC' | 'DEONTIC';

export interface Concept {
  id: string; label: string;
  type: 'CLASS' | 'INDIVIDUAL' | 'PROPERTY';
  attributes: Record<string, number | string | boolean>;
  superClasses?: string[];
}

export interface KnowledgeGraphEdge {
  from: string; to: string;
  relation: string;   // 'hasRisk' | 'regulatedBy' | 'causedBy' | 'correlatesWith'
  weight?: number;    // 0-1 confidence
  provenance?: string;
}

export interface LogicalRule {
  ruleId: string; type: RuleType; description: string;
  antecedents: string[];
  consequent: string;
  confidence: number; priority: number;
  exceptions?: string[];
  jurisdiction?: string;
  source: 'EXPERT' | 'MINED' | 'REGULATORY' | 'LEARNED';
}

export interface ReasoningResult {
  query: string; mode: ReasoningMode; status: InferenceStatus;
  conclusion?: string; confidence: number;
  explanation: string; computeTimeMs: number;
  rulesActivated: string[]; evidenceUsed: string[];
}

export interface CausalInference {
  queryType: 'ASSOCIATION' | 'INTERVENTION' | 'COUNTERFACTUAL';
  query: string;
  evidence: Record<string, number | string>;
  intervention?: Record<string, number | string>;
  result: Record<string, number | string>;
  confidenceInterval?: [number, number];
  explanation: string;
}

export interface FinancialCase {
  caseId: string; description: string;
  context: Record<string, number | string | boolean>;
  solution: Record<string, number | string>;
  outcome: 'SUCCESS' | 'FAILURE' | 'PARTIAL';
  domain: string; tags: string[];
  similarity?: number;
}

// ======================================================================
// NEUROSYMBOLIC AI SERVICE
// ======================================================================

export class NeurosymbolicAIService {
  private concepts: Map<string, Concept> = new Map();
  private edges: KnowledgeGraphEdge[] = [];
  private rules: LogicalRule[];
  private caseBase: FinancialCase[] = [];

  constructor() {
    this.rules = this._buildCoreComplianceRules();
    this._buildDefaultOntology();
  }

  // ---- KNOWLEDGE GRAPH --------------------------------------------------

  queryGraph(subject?: string, relation?: string, object?: string): KnowledgeGraphEdge[] {
    return this.edges.filter(e =>
      (!subject  || e.from.includes(subject))  &&
      (!relation || e.relation === relation)   &&
      (!object   || e.to.includes(object))
    );
  }

  semanticSimilarity(a: string, b: string): number {
    if (a === b) return 1.0;
    const ca = this.concepts.get(a);
    const cb = this.concepts.get(b);
    if (!ca || !cb) return 0.0;
    const sa = new Set(ca.superClasses ?? []);
    const sb = new Set(cb.superClasses ?? []);
    const shared = [...sa].filter(x => sb.has(x)).length;
    return shared / Math.max(1, Math.max(sa.size, sb.size));
  }

  // ---- INFERENCE ENGINE ------------------------------------------------

  /** Forward-chaining: derive new facts via Rete-simplified */
  forwardChain(facts: string[]): { derivedFacts: string[]; activatedRules: string[] } {
    const wm = new Set(facts);
    const activated: string[] = [];
    let changed = true;
    while (changed) {
      changed = false;
      for (const rule of this.rules) {
        const holds = rule.antecedents.every(a => wm.has(a));
        if (holds && !wm.has(rule.consequent) && Math.random() < rule.confidence) {
          wm.add(rule.consequent); activated.push(rule.ruleId); changed = true;
        }
      }
    }
    return { derivedFacts: [...wm].filter(f => !facts.includes(f)), activatedRules: activated };
  }

  /** Backward-chaining: prove hypothesis from facts */
  backwardChain(hypothesis: string, facts: string[], depth = 0): ReasoningResult {
    const t = Date.now();
    if (facts.includes(hypothesis))
      return { query: hypothesis, mode: 'DEDUCTIVE', status: 'PROVEN', conclusion: hypothesis, confidence: 1.0, explanation: 'Direct fact', computeTimeMs: 0, rulesActivated: [], evidenceUsed: [hypothesis] };
    if (depth >= 8)
      return { query: hypothesis, mode: 'DEDUCTIVE', status: 'UNKNOWN', confidence: 0, explanation: 'Max depth', computeTimeMs: Date.now() - t, rulesActivated: [], evidenceUsed: [] };

    for (const rule of this.rules.filter(r => r.consequent === hypothesis)) {
      const subResults = rule.antecedents.map(a => this.backwardChain(a, facts, depth + 1));
      if (subResults.every(r => r.status === 'PROVEN')) {
        return { query: hypothesis, mode: 'DEDUCTIVE', status: 'PROVEN', conclusion: hypothesis,
          confidence: rule.confidence * Math.min(...subResults.map(r => r.confidence)),
          explanation: `Via rule ${rule.ruleId}: ${rule.description}`,
          rulesActivated: [rule.ruleId, ...subResults.flatMap(r => r.rulesActivated)],
          evidenceUsed: subResults.flatMap(r => r.evidenceUsed), computeTimeMs: Date.now() - t };
      }
    }
    return { query: hypothesis, mode: 'DEDUCTIVE', status: 'UNKNOWN', confidence: 0, explanation: 'Unprovable', computeTimeMs: Date.now() - t, rulesActivated: [], evidenceUsed: [] };
  }

  // ---- CAUSAL REASONING (do-calculus simplified) -----------------------

  causalQuery(target: string, intervention: Record<string, number>, observations: Record<string, number>): CausalInference {
    let value = observations[target] ?? 0.5;
    for (const [v, iv] of Object.entries(intervention)) {
      const edge = this.edges.find(e => e.from === v && e.to === target);
      if (edge?.weight) value += edge.weight * (iv - (observations[v] ?? 0));
    }
    value = Math.max(0, Math.min(1, value));
    return {
      queryType: 'INTERVENTION',
      query: `P(${target} | do(${JSON.stringify(intervention)}))`,
      evidence: observations, intervention, result: { [target]: value },
      confidenceInterval: [Math.max(0, value - 0.1), Math.min(1, value + 0.1)],
      explanation: `Causal adjustment: ${target} shifted to ${value.toFixed(4)} via ${Object.keys(intervention).join(', ')}`,
    };
  }

  counterfactual(observed: Record<string, number>, cfIntervention: Record<string, number>): {
    factualOutcome: Record<string, number>;
    counterfactualOutcome: Record<string, number>;
    ite: number;
  } {
    const cfOutcome = { ...observed };
    for (const [k, v] of Object.entries(cfIntervention)) {
      const delta = v - (observed[k] ?? 0);
      for (const key of Object.keys(cfOutcome).filter(k2 => k2 !== k))
        cfOutcome[key] = Math.max(0, Math.min(1, cfOutcome[key] + 0.3 * delta));
    }
    const avgCf = Object.values(cfOutcome).reduce((a, b) => a + b, 0) / Object.keys(cfOutcome).length;
    const avgObs = Object.values(observed).reduce((a, b) => a + b, 0) / Object.keys(observed).length;
    return { factualOutcome: observed, counterfactualOutcome: cfOutcome, ite: avgCf - avgObs };
  }

  // ---- DEONTIC COMPLIANCE (permitted/obligated/forbidden) ---------------

  assessCompliance(action: string, ctx: Record<string, string | boolean | number>): {
    permitted: boolean; obligated: boolean; forbidden: boolean;
    applicableRules: string[]; violations: string[];
  } {
    const deonticRules = this.rules.filter(r => r.type === 'DEONTIC');
    const applicable: string[] = [];
    const violations: string[] = [];
    let permitted = true, obligated = false, forbidden = false;

    for (const rule of deonticRules) {
      const applies = rule.antecedents.every(ant => {
        const [k, v] = ant.split('=');
        return String(ctx[k]) === v;
      });
      if (applies) {
        applicable.push(rule.ruleId);
        if (rule.consequent.startsWith('FORBIDDEN:')) { forbidden = true; violations.push(rule.description); }
        else if (rule.consequent.startsWith('OBLIGATED:')) obligated = true;
      }
    }
    if (forbidden) permitted = false;
    return { permitted, obligated, forbidden, applicableRules: applicable, violations };
  }

  // ---- CASE-BASED REASONING --------------------------------------------

  retrieveSimilarCases(query: Record<string, number | string | boolean>, k = 5): FinancialCase[] {
    return this.caseBase
      .map(c => ({ ...c, similarity: this._similarity(query, c.context) }))
      .sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0))
      .slice(0, k);
  }

  addCase(c: FinancialCase): void { this.caseBase.push(c); }

  private _similarity(a: Record<string, number | string | boolean>, b: Record<string, number | string | boolean>): number {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    let score = 0;
    for (const k of keys) {
      const av = a[k]; const bv = b[k];
      if (av === undefined || bv === undefined) continue;
      if (typeof av === 'number' && typeof bv === 'number') score += 1 - Math.abs(av - bv) / Math.max(Math.abs(av), Math.abs(bv), 1);
      else score += av === bv ? 1 : 0;
    }
    return score / keys.size;
  }

  // ---- EXPLAINABILITY --------------------------------------------------

  explainDecision(label: string, prob: number, featureImportances: Record<string, number>, ctx: Record<string, string | number>): string {
    const top = Object.entries(featureImportances).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])).slice(0, 5);
    const parts = top.map(([f, imp]) => `${f}=${ctx[f]} (${imp > 0 ? '+' : ''}${(imp * 100).toFixed(1)}%)`);
    return `Decision: ${label} (${(prob * 100).toFixed(1)}% confidence). Drivers: ${parts.join(', ')}.`;
  }

  // ---- PRIVATE SETUP ---------------------------------------------------

  private _buildDefaultOntology() {
    [
      { id: 'Transaction', label: 'Transaction', type: 'CLASS' as const, attributes: {} },
      { id: 'HighRiskTxn', label: 'High-Risk Txn', type: 'CLASS' as const, attributes: {}, superClasses: ['Transaction'] },
      { id: 'SuspiciousTxn', label: 'Suspicious Txn', type: 'CLASS' as const, attributes: {}, superClasses: ['HighRiskTxn'] },
      { id: 'Customer', label: 'Customer', type: 'CLASS' as const, attributes: {} },
      { id: 'PEP', label: 'Politically Exposed Person', type: 'CLASS' as const, attributes: {}, superClasses: ['Customer'] },
      { id: 'SanctionedEntity', label: 'Sanctioned Entity', type: 'CLASS' as const, attributes: {}, superClasses: ['Customer'] },
    ].forEach(c => this.concepts.set(c.id, c));

    this.edges.push(
      { from: 'SuspiciousTxn', to: 'AMLRegulation', relation: 'regulatedBy', weight: 0.95 },
      { from: 'PEP', to: 'HighRiskTxn', relation: 'isAssociatedWith', weight: 0.75 },
      { from: 'SanctionedEntity', to: 'SuspiciousTxn', relation: 'triggers', weight: 1.0 },
    );
  }

  private _buildCoreComplianceRules(): LogicalRule[] {
    return [
      { ruleId: 'AML001', type: 'DEONTIC', description: 'Txn ≥ $10K USD requires CTR', antecedents: ['amount_gte_10000=true', 'currency=USD'], consequent: 'OBLIGATED:file_CTR', confidence: 1.0, priority: 1, source: 'REGULATORY', jurisdiction: 'US' },
      { ruleId: 'AML002', type: 'DEONTIC', description: 'Sanctioned counterparty blocks transaction', antecedents: ['counterparty_sanctioned=true'], consequent: 'FORBIDDEN:process_transaction', confidence: 1.0, priority: 0, source: 'REGULATORY' },
      { ruleId: 'AML003', type: 'HORN_CLAUSE', description: 'Structuring: multiple sub-10K txns summing ≥10K', antecedents: ['multiple_txns_same_day=true', 'cumulative_gte_10000=true'], consequent: 'structuring_detected', confidence: 0.85, priority: 2, source: 'REGULATORY' },
      { ruleId: 'FRAUD001', type: 'PROBABILISTIC', description: 'High fraud: unusual country + high amount + new device', antecedents: ['unusual_country=true', 'amount_above_avg=true', 'new_device=true'], consequent: 'high_fraud_risk', confidence: 0.87, priority: 2, source: 'LEARNED' },
      { ruleId: 'KYC001', type: 'DEONTIC', description: 'PEP requires enhanced due diligence', antecedents: ['customer_is_pep=true'], consequent: 'OBLIGATED:enhanced_due_diligence', confidence: 1.0, priority: 1, source: 'REGULATORY' },
      { ruleId: 'TAX001', type: 'HORN_CLAUSE', description: 'US persons with foreign accounts > 10K must file FBAR', antecedents: ['us_person=true', 'foreign_acct_gte_10000=true'], consequent: 'fbar_filing_required', confidence: 1.0, priority: 1, source: 'REGULATORY', jurisdiction: 'US' },
      { ruleId: 'INVEST001', type: 'DEONTIC', description: 'Private placements require accredited investor verification', antecedents: ['product_type=PRIVATE_PLACEMENT'], consequent: 'OBLIGATED:verify_accredited_investor', confidence: 1.0, priority: 1, source: 'REGULATORY' },
      { ruleId: 'CREDIT001', type: 'DEFEASIBLE', description: 'Credit score ≥ 650 → creditworthy (unless in default)', antecedents: ['credit_score_gte_650=true'], consequent: 'creditworthy', exceptions: ['currently_in_default=true'], confidence: 0.9, priority: 3, source: 'EXPERT' },
    ];
  }
}
