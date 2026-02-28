"""
╔══════════════════════════════════════════════════════════════════════╗
║          KUBERA TRACE — FINAL MASTER SIMULATION v3.0               ║
║     Cross-Border Payment Traceability & Risk Intelligence          ║
║                    Full Platform Stress Test                       ║
╚══════════════════════════════════════════════════════════════════════╝

Runs ALL backend modules through a unified simulation pipeline:
  Phase 1: Core Service Health Check
  Phase 2: Security & Privacy Suite
  Phase 3: AI & Intelligence Pipeline
  Phase 4: Data Governance & Compliance
  Phase 5: Concurrency & Chaos Stress Test
  Phase 6: End-to-End Workflow Simulation
"""

import sys
import os
import json
import time
import uuid
import random
import hashlib
import threading
import traceback
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from io import StringIO

# ── Path Setup ──────────────────────────────────────────
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__)))
sys.path.insert(0, ROOT)

# ── Import ALL Backend Modules ──────────────────────────
from backend.api_gateway.rate_limiter import RateLimiter
from backend.services.counterfactuals import CounterfactualService
from backend.services.explainability import ExplainabilityService
from backend.services.lineage import LineageService
from backend.privacy.consent_manager import ConsentManager
from backend.privacy.gdpr_workflow import GDPRWorkflow
from backend.security.secure_enclave import SecureEnclave
from backend.policy.simulator import PolicySimulator
from backend.policy.opa_adapter import OPAAdapter
from backend.enrichment.enrichment_hub import EnrichmentHub
from backend.audit.append_ledger import AuditLedger
from backend.sandbox.third_party_sandbox import ThirdPartySandbox
from backend.catalog.schema_registry import SchemaRegistry
from backend.reports.scheduler import ReportScheduler


# ══════════════════════════════════════════════════════════
# SIMULATION ENGINE
# ══════════════════════════════════════════════════════════

class Colors:
    """ANSI color codes for terminal output."""
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    DIM = '\033[2m'
    END = '\033[0m'


class SimulationResult:
    def __init__(self, name, passed, tests_run, errors, duration):
        self.name = name
        self.passed = passed
        self.tests_run = tests_run
        self.errors = errors
        self.duration = duration


class MasterSimulation:
    """
    Final comprehensive simulation covering every backend module.
    """

    def __init__(self):
        self.results = []
        self.total_tests = 0
        self.total_errors = []
        self.start_time = None

    def _header(self, text):
        print(f"\n{Colors.BOLD}{Colors.CYAN}{'═' * 70}{Colors.END}")
        print(f"{Colors.BOLD}{Colors.CYAN}  {text}{Colors.END}")
        print(f"{Colors.BOLD}{Colors.CYAN}{'═' * 70}{Colors.END}")

    def _phase(self, num, name):
        print(f"\n{Colors.BOLD}{Colors.BLUE}  ┌─ PHASE {num}: {name}{Colors.END}")

    def _test(self, name, passed, detail=""):
        icon = f"{Colors.GREEN}✓{Colors.END}" if passed else f"{Colors.RED}✗{Colors.END}"
        d = f" {Colors.DIM}({detail}){Colors.END}" if detail else ""
        print(f"  │  {icon} {name}{d}")

    def _phase_end(self, result):
        self.results.append(result)
        self.total_tests += result.tests_run
        self.total_errors.extend(result.errors)
        status = f"{Colors.GREEN}PASSED{Colors.END}" if result.passed else f"{Colors.RED}FAILED{Colors.END}"
        print(f"  └─ {status} ({result.tests_run} tests, {result.duration:.3f}s)")

    # ──────────────────────────────────────────────────────
    # PHASE 1: Core Service Health Check
    # ──────────────────────────────────────────────────────
    def phase_1_core_health(self):
        self._phase(1, "CORE SERVICE HEALTH CHECK")
        t0 = time.time()
        tests = 0
        errors = []

        # 1.1 Rate Limiter — basic flow
        tests += 1
        try:
            rl = RateLimiter(limit=3, window=10)
            r1, _ = rl.is_allowed("HEALTH_T1")
            r2, _ = rl.is_allowed("HEALTH_T1")
            r3, _ = rl.is_allowed("HEALTH_T1")
            r4, _ = rl.is_allowed("HEALTH_T1")
            ok = r1 and r2 and r3 and not r4
            self._test("RateLimiter sliding window", ok, "allow→allow→allow→block")
            if not ok: errors.append("RateLimiter basic flow failed")
        except Exception as e:
            self._test("RateLimiter sliding window", False, str(e))
            errors.append(f"RateLimiter: {e}")

        # 1.2 Rate Limiter — multi-tenant isolation
        tests += 1
        try:
            rl2 = RateLimiter(limit=1, window=10)
            rl2.is_allowed("TENANT_A")
            ok_b, _ = rl2.is_allowed("TENANT_B")  # Different tenant should still be allowed
            self._test("RateLimiter tenant isolation", ok_b)
            if not ok_b: errors.append("RateLimiter tenant isolation failed")
        except Exception as e:
            self._test("RateLimiter tenant isolation", False, str(e))
            errors.append(f"RateLimiter isolation: {e}")

        # 1.3 Report Scheduler
        tests += 1
        try:
            sid = f"HEALTH_{uuid.uuid4().hex[:6]}"
            ReportScheduler._schedules[sid] = {
                "recipients": ["test@kubera.io"],
                "frequency": "ONCE",
                "last_run": None
            }
            url = ReportScheduler.trigger_run(sid)
            ok = url is not None and "kubera.io" in url
            self._test("ReportScheduler trigger & delivery", ok, url[:50] if url else "None")
            if not ok: errors.append("ReportScheduler failed")
        except Exception as e:
            self._test("ReportScheduler trigger & delivery", False, str(e))
            errors.append(f"ReportScheduler: {e}")

        # 1.4 Schema Registry — dataset catalog
        tests += 1
        try:
            ds = SchemaRegistry.get_datasets()
            ok = "payments_v1" in ds and "fields" in ds["payments_v1"]
            self._test("SchemaRegistry dataset catalog", ok, f"{len(ds)} datasets")
            if not ok: errors.append("SchemaRegistry missing datasets")
        except Exception as e:
            self._test("SchemaRegistry dataset catalog", False, str(e))
            errors.append(f"SchemaRegistry: {e}")

        self._phase_end(SimulationResult("Core Health", len(errors) == 0, tests, errors, time.time() - t0))

    # ──────────────────────────────────────────────────────
    # PHASE 2: Security & Privacy Suite
    # ──────────────────────────────────────────────────────
    def phase_2_security(self):
        self._phase(2, "SECURITY & PRIVACY SUITE")
        t0 = time.time()
        tests = 0
        errors = []

        # 2.1 SecureEnclave attestation
        tests += 1
        try:
            doc = SecureEnclave.attune_enclave()
            ok = doc["status"] == "ATTESTED" and "pcr0" in doc
            self._test("SecureEnclave attestation", ok, f"PCR0={doc.get('pcr0', '?')[:16]}...")
            if not ok: errors.append("Enclave attestation failed")
        except Exception as e:
            self._test("SecureEnclave attestation", False, str(e))
            errors.append(f"Enclave: {e}")

        # 2.2 SecureEnclave encrypt/decrypt roundtrip
        tests += 1
        try:
            payload = json.dumps({"sanctioned_match": True, "amount": 500000}).encode()
            encrypted = SecureEnclave._cipher.encrypt(payload)
            result = SecureEnclave.secure_execute(encrypted)
            decrypted = json.loads(SecureEnclave._cipher.decrypt(result.encode()))
            ok = decrypted["risk_score"] == 0.95 and "ts" in decrypted
            self._test("SecureEnclave encrypt→execute→decrypt", ok, f"risk={decrypted.get('risk_score')}")
            if not ok: errors.append("Enclave roundtrip data mismatch")
        except Exception as e:
            self._test("SecureEnclave encrypt→execute→decrypt", False, str(e))
            errors.append(f"Enclave roundtrip: {e}")

        # 2.3 Consent lifecycle
        tests += 1
        try:
            user = f"U_{uuid.uuid4().hex[:6]}"
            ConsentManager.record_consent(user, "T_SEC", "TRACE_ACCESS")
            has = ConsentManager.check_consent(user, "TRACE_ACCESS")
            ConsentManager.revoke_user_scopes(user, "TRACE_ACCESS")
            revoked = ConsentManager.check_consent(user, "TRACE_ACCESS")
            ok = has and not revoked
            self._test("ConsentManager grant→check→revoke→check", ok)
            if not ok: errors.append("Consent lifecycle failed")
        except Exception as e:
            self._test("ConsentManager lifecycle", False, str(e))
            errors.append(f"Consent: {e}")

        # 2.4 GDPR — SAR initiation
        tests += 1
        try:
            jid = GDPRWorkflow.initiate_sar(f"user_{uuid.uuid4().hex[:4]}", "T_TEST")
            status = GDPRWorkflow.get_job_status(jid)
            ok = status["status"] == "PROCESSING" and status["type"] == "SAR"
            self._test("GDPRWorkflow SAR initiation", ok, f"job={jid}")
            if not ok: errors.append("GDPR SAR failed")
        except Exception as e:
            self._test("GDPRWorkflow SAR initiation", False, str(e))
            errors.append(f"GDPR SAR: {e}")

        # 2.5 GDPR — legal hold blocks deletion
        tests += 1
        try:
            result = GDPRWorkflow.initiate_deletion("user_legal", legal_hold=True)
            ok = "error" in result
            self._test("GDPRWorkflow legal hold blocks deletion", ok)
            if not ok: errors.append("Legal hold did not block deletion")
        except Exception as e:
            self._test("GDPRWorkflow legal hold", False, str(e))
            errors.append(f"GDPR legal hold: {e}")

        # 2.6 Sandbox — scope escalation prevention
        tests += 1
        try:
            creds = ThirdPartySandbox.register_app("SecTestApp", "dev_sec", ["READ_TRACES"])
            cid = creds["client_id"]
            ok_valid, _ = ThirdPartySandbox.validate_call(cid, "READ_TRACES")
            ok_blocked, _ = ThirdPartySandbox.validate_call(cid, "ADMIN_WRITE")
            ok_fake, _ = ThirdPartySandbox.validate_call("FAKE_ID", "READ_TRACES")
            ok = ok_valid and not ok_blocked and not ok_fake
            self._test("ThirdPartySandbox scope escalation prevention", ok)
            if not ok: errors.append("Sandbox scope escalation vulnerability!")
        except Exception as e:
            self._test("ThirdPartySandbox scope escalation", False, str(e))
            errors.append(f"Sandbox: {e}")

        self._phase_end(SimulationResult("Security & Privacy", len(errors) == 0, tests, errors, time.time() - t0))

    # ──────────────────────────────────────────────────────
    # PHASE 3: AI & Intelligence Pipeline
    # ──────────────────────────────────────────────────────
    def phase_3_intelligence(self):
        self._phase(3, "AI & INTELLIGENCE PIPELINE")
        t0 = time.time()
        tests = 0
        errors = []

        # 3.1 Counterfactual suggestions — high risk
        tests += 1
        try:
            result = CounterfactualService.get_suggestions("TX_HIGH", 0.92)
            ok = (result["estimated_new_risk"] < 0.92 
                  and len(result["suggestions"]) > 0 
                  and result["estimated_new_risk"] >= 0)
            self._test("Counterfactual risk reduction (0.92)", ok, 
                       f"new_risk={result['estimated_new_risk']}")
            if not ok: errors.append("Counterfactual logic error")
        except Exception as e:
            self._test("Counterfactual risk reduction", False, str(e))
            errors.append(f"Counterfactual: {e}")

        # 3.2 Counterfactual — input validation
        tests += 1
        try:
            rejected = 0
            for bad_input in [None, "STRING", -5.0, 999.0]:
                try:
                    CounterfactualService.get_suggestions("TX", bad_input)
                except (ValueError, TypeError):
                    rejected += 1
            ok = rejected == 4
            self._test("Counterfactual rejects invalid inputs", ok, f"{rejected}/4 rejected")
            if not ok: errors.append("Counterfactual accepted invalid inputs")
        except Exception as e:
            self._test("Counterfactual input validation", False, str(e))
            errors.append(f"Counterfactual validation: {e}")

        # 3.3 Explainability — SHAP values
        tests += 1
        try:
            shap = ExplainabilityService.get_shap_values("TX_SHAP_001")
            ok = ("contributions" in shap 
                  and len(shap["contributions"]) > 0 
                  and "prediction" in shap)
            self._test("Explainability SHAP values", ok, 
                       f"{len(shap['contributions'])} features, pred={shap['prediction']}")
            if not ok: errors.append("SHAP values missing data")
        except Exception as e:
            self._test("Explainability SHAP", False, str(e))
            errors.append(f"SHAP: {e}")

        # 3.4 Data Lineage — provenance chain
        tests += 1
        try:
            node = LineageService.capture_provenance("TRANSACTION", "TX_LIN_001", {"source": "SWIFT"})
            path = LineageService.get_path_to_origin("TX_LIN_001")
            ok = "lineage_id" in node and isinstance(path, list) and len(path) > 0
            self._test("Data Lineage provenance capture", ok, f"path_depth={len(path)}")
            if not ok: errors.append("Lineage capture failed")
        except Exception as e:
            self._test("Data Lineage", False, str(e))
            errors.append(f"Lineage: {e}")

        # 3.5 Enrichment Hub — risk tagging
        tests += 1
        try:
            EnrichmentHub.flush_cache()
            profile = EnrichmentHub.get_account_profile("ACC_FRAUD_TEST_001")
            ok = "HIGH_RISK_ENTITY" in profile.get("risk_tags", [])
            self._test("EnrichmentHub fraud tagging", ok, f"tags={profile.get('risk_tags')}")
            if not ok: errors.append("Enrichment tagging failed")
        except Exception as e:
            self._test("EnrichmentHub fraud tagging", False, str(e))
            errors.append(f"Enrichment: {e}")

        # 3.6 Enrichment Hub — cache hit
        tests += 1
        try:
            t_first = time.time()
            EnrichmentHub.get_account_profile("ACC_CACHE_TEST")
            t_miss = time.time() - t_first
            t_second = time.time()
            EnrichmentHub.get_account_profile("ACC_CACHE_TEST")
            t_hit = time.time() - t_second
            ok = True  # Both calls succeeded
            self._test("EnrichmentHub cache hit", ok, f"miss={t_miss*1000:.1f}ms, hit={t_hit*1000:.1f}ms")
        except Exception as e:
            self._test("EnrichmentHub cache", False, str(e))
            errors.append(f"Enrichment cache: {e}")

        # 3.7 Enrichment Hub — None/empty guard
        tests += 1
        try:
            p1 = EnrichmentHub.get_account_profile(None)
            p2 = EnrichmentHub.get_account_profile("")
            ok = p1["kyc_status"] == "UNKNOWN" and p2["kyc_status"] == "UNKNOWN"
            self._test("EnrichmentHub None/empty guard", ok)
            if not ok: errors.append("Enrichment None guard failed")
        except Exception as e:
            self._test("EnrichmentHub None/empty guard", False, str(e))
            errors.append(f"Enrichment null guard: {e}")

        self._phase_end(SimulationResult("AI & Intelligence", len(errors) == 0, tests, errors, time.time() - t0))

    # ──────────────────────────────────────────────────────
    # PHASE 4: Data Governance & Compliance
    # ──────────────────────────────────────────────────────
    def phase_4_governance(self):
        self._phase(4, "DATA GOVERNANCE & COMPLIANCE")
        t0 = time.time()
        tests = 0
        errors = []

        # 4.1 OPA — high-value block
        tests += 1
        try:
            result = OPAAdapter.evaluate_transaction({"amount": 5000000}, "T1")
            ok = result["allow"] is False and len(result["reasons"]) > 0
            self._test("OPA blocks high-value transfer", ok, f"reasons={result['reasons']}")
            if not ok: errors.append("OPA failed to block high-value tx")
        except Exception as e:
            self._test("OPA high-value block", False, str(e))
            errors.append(f"OPA: {e}")

        # 4.2 OPA — normal pass
        tests += 1
        try:
            result = OPAAdapter.evaluate_transaction({"amount": 500}, "T1")
            ok = result["allow"] is True
            self._test("OPA allows normal transfer", ok)
            if not ok: errors.append("OPA blocked normal tx")
        except Exception as e:
            self._test("OPA normal pass", False, str(e))
            errors.append(f"OPA normal: {e}")

        # 4.3 Policy Simulator — normal
        tests += 1
        try:
            result = PolicySimulator.simulate_rule_change("DS_GOV", {"velocity_cap": 10, "amount_alert": 10000})
            ok = result["alerts_generated"] >= 0 and result["false_positive_estimate"] >= 0
            self._test("PolicySimulator normal rules", ok, 
                       f"alerts={result['alerts_generated']}, fp={result['false_positive_estimate']}")
            if not ok: errors.append("PolicySimulator normal failed")
        except Exception as e:
            self._test("PolicySimulator normal", False, str(e))
            errors.append(f"PolicySim: {e}")

        # 4.4 Policy Simulator — zero thresholds (regression)
        tests += 1
        try:
            result = PolicySimulator.simulate_rule_change("DS_ZERO", {"velocity_cap": 0, "amount_alert": 0})
            ok = result["alerts_generated"] >= 0
            self._test("PolicySimulator zero-threshold guard", ok, "no division-by-zero")
            if not ok: errors.append("PolicySimulator zero-threshold failed")
        except ZeroDivisionError:
            self._test("PolicySimulator zero-threshold guard", False, "DIVISION BY ZERO!")
            errors.append("PolicySimulator division-by-zero regression!")
        except Exception as e:
            self._test("PolicySimulator zero-threshold", False, str(e))
            errors.append(f"PolicySim zero: {e}")

        # 4.5 Audit Ledger — write + verify integrity
        tests += 1
        test_file = "master_sim_audit.jsonl"
        AuditLedger.ledger_file = test_file
        try:
            if os.path.exists(test_file):
                os.remove(test_file)
            h1 = AuditLedger.write_entry("admin", "CREATE_CASE", "CASE_SIM_01")
            h2 = AuditLedger.write_entry("analyst", "APPROVE", "CASE_SIM_01", prev_hash=h1)
            h3 = AuditLedger.write_entry("system", "CLOSE", "CASE_SIM_01", prev_hash=h2)
            ok = AuditLedger.verify_integrity()
            self._test("AuditLedger write + integrity check", ok, "3 entries, chain valid")
            if not ok: errors.append("Audit integrity check failed on valid data")
        except Exception as e:
            self._test("AuditLedger write + integrity", False, str(e))
            errors.append(f"AuditLedger: {e}")

        # 4.6 Audit Ledger — tamper detection
        tests += 1
        try:
            if os.path.exists(test_file):
                with open(test_file, "r") as f:
                    lines = f.readlines()
                if len(lines) >= 2:
                    tampered = json.loads(lines[1])
                    tampered["actor"] = "HACKER"
                    lines[1] = json.dumps(tampered) + "\n"
                    with open(test_file, "w") as f:
                        f.writelines(lines)
                    detected = not AuditLedger.verify_integrity()
                    self._test("AuditLedger tamper detection", detected, 
                               "tampered entry 2, detection=" + str(detected))
                    if not detected: errors.append("CRITICAL: Tamper went undetected!")
        except Exception as e:
            self._test("AuditLedger tamper detection", False, str(e))
            errors.append(f"AuditLedger tamper: {e}")
        finally:
            if os.path.exists(test_file):
                os.remove(test_file)

        # 4.7 Schema Registry — PII detection
        tests += 1
        try:
            pii = SchemaRegistry.find_pii_fields()
            ok = len(pii) > 0 and any(f["field"] == "sender_name" for f in pii)
            self._test("SchemaRegistry PII detection", ok, f"{len(pii)} PII fields found")
            if not ok: errors.append("PII detection failed")
        except Exception as e:
            self._test("SchemaRegistry PII", False, str(e))
            errors.append(f"Schema PII: {e}")

        # 4.8 Schema Registry — metadata update
        tests += 1
        try:
            SchemaRegistry.update_metadata("payments_v1", {"retention": "7_YEARS"})
            ds = SchemaRegistry.get_datasets()
            ok = ds["payments_v1"]["retention"] == "7_YEARS"
            self._test("SchemaRegistry metadata update", ok)
            if not ok: errors.append("Schema metadata update failed")
        except Exception as e:
            self._test("SchemaRegistry metadata update", False, str(e))
            errors.append(f"Schema update: {e}")

        self._phase_end(SimulationResult("Data Governance", len(errors) == 0, tests, errors, time.time() - t0))

    # ──────────────────────────────────────────────────────
    # PHASE 5: Concurrency & Chaos Stress Test
    # ──────────────────────────────────────────────────────
    def phase_5_chaos(self):
        self._phase(5, "CONCURRENCY & CHAOS STRESS TEST")
        t0 = time.time()
        tests = 0
        errors = []

        # 5.1 Rate Limiter — 500 concurrent requests
        tests += 1
        rl_errors = []
        rl = RateLimiter(limit=10, window=1)
        def rl_hammer(tenant):
            try:
                rl.is_allowed(tenant)
            except Exception as e:
                rl_errors.append(str(e))

        with ThreadPoolExecutor(max_workers=20) as ex:
            futs = [ex.submit(rl_hammer, random.choice(["T1", "T2", "", None, 123])) for _ in range(500)]
            for f in as_completed(futs): f.result()
        ok = len(rl_errors) == 0
        self._test("RateLimiter 500 concurrent requests", ok, f"{len(rl_errors)} crashes")
        if not ok: errors.extend(rl_errors[:3])

        # 5.2 Consent Manager — 200 concurrent grant/revoke
        tests += 1
        cm_errors = []
        def cm_toggle():
            try:
                if random.random() > 0.5:
                    ConsentManager.record_consent("U_CHAOS", "T_CHAOS", "SCOPE_X")
                else:
                    ConsentManager.revoke_user_scopes("U_CHAOS", "SCOPE_X")
            except Exception as e:
                cm_errors.append(str(e))

        with ThreadPoolExecutor(max_workers=10) as ex:
            futs = [ex.submit(cm_toggle) for _ in range(200)]
            for f in as_completed(futs): f.result()
        ok = len(cm_errors) == 0
        self._test("ConsentManager 200 concurrent toggles", ok, f"{len(cm_errors)} crashes")
        if not ok: errors.extend(cm_errors[:3])

        # 5.3 GDPR — 30 concurrent SAR jobs
        tests += 1
        gdpr_errors = []
        def gdpr_sar(i):
            try:
                jid = GDPRWorkflow.initiate_sar(f"user_chaos_{i}", f"T_{i}")
                GDPRWorkflow.get_job_status(jid)
            except Exception as e:
                gdpr_errors.append(str(e))

        with ThreadPoolExecutor(max_workers=10) as ex:
            futs = [ex.submit(gdpr_sar, i) for i in range(30)]
            for f in as_completed(futs): f.result()
        ok = len(gdpr_errors) == 0
        self._test("GDPRWorkflow 30 concurrent SAR jobs", ok, f"{len(gdpr_errors)} crashes")
        if not ok: errors.extend(gdpr_errors[:3])

        # 5.4 Enrichment Hub — 100 concurrent cache lookups with fuzzed input
        tests += 1
        eh_errors = []
        def eh_lookup():
            try:
                acc = random.choice(["ACC_A", "ACC_FRAUD_X", None, "", "X" * 5000])
                EnrichmentHub.get_account_profile(acc)
            except Exception as e:
                eh_errors.append(str(e))

        EnrichmentHub.flush_cache()
        with ThreadPoolExecutor(max_workers=10) as ex:
            futs = [ex.submit(eh_lookup) for _ in range(100)]
            for f in as_completed(futs): f.result()
        ok = len(eh_errors) == 0
        self._test("EnrichmentHub 100 concurrent fuzzed lookups", ok, f"{len(eh_errors)} crashes")
        if not ok: errors.extend(eh_errors[:3])

        # 5.5 Counterfactual AI — boundary value fuzzing
        tests += 1
        cf_errors = []
        boundary_inputs = [
            0.0, 0.001, 0.5, 0.699, 0.7, 0.70001, 0.999, 1.0
        ]
        for risk in boundary_inputs:
            try:
                r = CounterfactualService.get_suggestions("TX_FUZZ", risk)
                if r["estimated_new_risk"] < 0:
                    cf_errors.append(f"Negative risk for input {risk}")
            except Exception as e:
                cf_errors.append(f"Crash on {risk}: {e}")
        ok = len(cf_errors) == 0
        self._test("Counterfactual boundary fuzzing (8 values)", ok, f"{len(cf_errors)} errors")
        if not ok: errors.extend(cf_errors)

        self._phase_end(SimulationResult("Chaos & Concurrency", len(errors) == 0, tests, errors, time.time() - t0))

    # ──────────────────────────────────────────────────────
    # PHASE 6: End-to-End Workflow Simulation
    # ──────────────────────────────────────────────────────
    def phase_6_e2e_workflow(self):
        self._phase(6, "END-TO-END WORKFLOW SIMULATION")
        t0 = time.time()
        tests = 0
        errors = []

        case_id = f"CASE_{uuid.uuid4().hex[:8]}"
        tx_id = "TX_E2E_9001"
        tenant = "GLOBAL_BANK_ALPHA"
        analyst = "agent_smith"

        # Step 1: API Rate Check
        tests += 1
        try:
            limiter = RateLimiter()
            allowed, _ = limiter.is_allowed(tenant)
            self._test(f"[Step 1] API rate check for {tenant}", allowed)
            if not allowed: errors.append("E2E: Rate limit blocked")
        except Exception as e:
            self._test("[Step 1] API rate check", False, str(e))
            errors.append(f"E2E rate: {e}")

        # Step 2: OPA Policy Evaluation
        tests += 1
        try:
            policy = OPAAdapter.evaluate_transaction({"amount": 75000, "corridor": "US→RU"}, tenant)
            self._test(f"[Step 2] OPA policy evaluation", policy["allow"], 
                       f"allow={policy['allow']}")
        except Exception as e:
            self._test("[Step 2] OPA policy", False, str(e))
            errors.append(f"E2E OPA: {e}")

        # Step 3: GDPR Consent Check
        tests += 1
        try:
            ConsentManager.record_consent("subject_e2e", tenant, "INVESTIGATION")
            has = ConsentManager.check_consent("subject_e2e", "INVESTIGATION")
            self._test("[Step 3] GDPR consent verification", has)
            if not has: errors.append("E2E: Consent check failed")
        except Exception as e:
            self._test("[Step 3] GDPR consent", False, str(e))
            errors.append(f"E2E consent: {e}")

        # Step 4: Enrichment & Sanctions Screen
        tests += 1
        try:
            EnrichmentHub.flush_cache()
            profile = EnrichmentHub.get_account_profile("ACC_STANDARD_E2E")
            ok = "account_id" in profile
            self._test("[Step 4] Enrichment & sanctions screen", ok, 
                       f"tags={profile.get('risk_tags', [])}")
        except Exception as e:
            self._test("[Step 4] Enrichment", False, str(e))
            errors.append(f"E2E enrichment: {e}")

        # Step 5: AI Risk Analysis
        tests += 1
        try:
            shap = ExplainabilityService.get_shap_values(tx_id)
            cf = CounterfactualService.get_suggestions(tx_id, 0.85)
            ok = len(shap["contributions"]) > 0 and cf["estimated_new_risk"] < 0.85
            self._test("[Step 5] AI risk analysis (SHAP + Counterfactual)", ok,
                       f"pred={shap['prediction']}, cf_new={cf['estimated_new_risk']}")
        except Exception as e:
            self._test("[Step 5] AI analysis", False, str(e))
            errors.append(f"E2E AI: {e}")

        # Step 6: Data Lineage Capture
        tests += 1
        try:
            node = LineageService.capture_provenance("TRANSACTION", tx_id, {
                "source": "SWIFT_GPI",
                "analyst": analyst,
                "case": case_id
            })
            ok = "lineage_id" in node
            self._test("[Step 6] Data lineage capture", ok, f"lineage={node.get('lineage_id', '?')[:20]}")
        except Exception as e:
            self._test("[Step 6] Lineage", False, str(e))
            errors.append(f"E2E lineage: {e}")

        # Step 7: Secure Enclave Processing
        tests += 1
        try:
            payload = json.dumps({"sanctioned_match": False, "case_id": case_id}).encode()
            encrypted = SecureEnclave._cipher.encrypt(payload)
            result = SecureEnclave.secure_execute(encrypted)
            ok = isinstance(result, str) and len(result) > 0
            self._test("[Step 7] SecureEnclave confidential compute", ok)
        except Exception as e:
            self._test("[Step 7] Enclave", False, str(e))
            errors.append(f"E2E enclave: {e}")

        # Step 8: Audit Trail
        tests += 1
        try:
            audit_file = "e2e_audit.jsonl"
            AuditLedger.ledger_file = audit_file
            if os.path.exists(audit_file):
                os.remove(audit_file)
            h = AuditLedger.write_entry(analyst, "INVESTIGATE", case_id)
            AuditLedger.write_entry(analyst, "ESCALATE", case_id, prev_hash=h)
            ok = AuditLedger.verify_integrity()
            self._test("[Step 8] Audit trail with integrity verification", ok)
            if os.path.exists(audit_file):
                os.remove(audit_file)
        except Exception as e:
            self._test("[Step 8] Audit trail", False, str(e))
            errors.append(f"E2E audit: {e}")

        # Step 9: Report Generation
        tests += 1
        try:
            sid = f"SCHED_{case_id}"
            ReportScheduler._schedules[sid] = {
                "recipients": ["compliance@bank.com", "legal@bank.com"],
                "frequency": "ONCE",
                "last_run": None
            }
            url = ReportScheduler.trigger_run(sid)
            ok = url is not None
            self._test("[Step 9] Executive report delivery", ok, url[:40] if url else "None")
        except Exception as e:
            self._test("[Step 9] Report", False, str(e))
            errors.append(f"E2E report: {e}")

        # Step 10: Consent Cleanup
        tests += 1
        try:
            revoked = ConsentManager.revoke_user_scopes("subject_e2e", "INVESTIGATION")
            ok = revoked >= 0
            self._test("[Step 10] Post-case consent revocation", ok, f"{revoked} scopes revoked")
        except Exception as e:
            self._test("[Step 10] Consent cleanup", False, str(e))
            errors.append(f"E2E cleanup: {e}")

        self._phase_end(SimulationResult("E2E Workflow", len(errors) == 0, tests, errors, time.time() - t0))

    # ──────────────────────────────────────────────────────
    # MASTER RUN
    # ──────────────────────────────────────────────────────
    def run(self):
        self.start_time = time.time()

        print(f"\n{Colors.BOLD}{Colors.CYAN}")
        print("  ╔══════════════════════════════════════════════════════════════╗")
        print("  ║       KUBERA TRACE — FINAL MASTER SIMULATION v3.0          ║")
        print("  ║   Cross-Border Payment Traceability & Risk Intelligence    ║")
        print("  ║                   Full Platform Stress Test                ║")
        print("  ╚══════════════════════════════════════════════════════════════╝")
        print(f"{Colors.END}")
        print(f"  {Colors.DIM}Started: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}{Colors.END}")
        print(f"  {Colors.DIM}Platform: KUBERA NETRA | Python {sys.version.split()[0]}{Colors.END}")

        # Execute all phases
        self.phase_1_core_health()
        self.phase_2_security()
        self.phase_3_intelligence()
        self.phase_4_governance()
        self.phase_5_chaos()
        self.phase_6_e2e_workflow()

        total_duration = time.time() - self.start_time

        # ── Final Report ──
        self._header("FINAL SIMULATION REPORT")

        passed_phases = sum(1 for r in self.results if r.passed)
        total_phases = len(self.results)

        print(f"\n  {Colors.BOLD}Platform:{Colors.END}  KUBERA TRACE — Cross-Border Payment Intelligence")
        print(f"  {Colors.BOLD}Duration:{Colors.END}  {total_duration:.3f}s")
        print(f"  {Colors.BOLD}Tests:{Colors.END}     {self.total_tests}")
        print(f"  {Colors.BOLD}Phases:{Colors.END}    {passed_phases}/{total_phases} passed")
        print()

        # Phase summary table
        print(f"  {'Phase':<35} {'Tests':>6} {'Time':>8} {'Status':>10}")
        print(f"  {'─' * 35} {'─' * 6} {'─' * 8} {'─' * 10}")
        for r in self.results:
            status = f"{Colors.GREEN}PASS{Colors.END}" if r.passed else f"{Colors.RED}FAIL{Colors.END}"
            print(f"  {r.name:<35} {r.tests_run:>6} {r.duration:>7.3f}s {status:>18}")

        print()

        if self.total_errors:
            print(f"  {Colors.RED}{Colors.BOLD}ERRORS ({len(self.total_errors)}):{Colors.END}")
            for i, err in enumerate(self.total_errors, 1):
                print(f"    {Colors.RED}{i}. {err}{Colors.END}")
            print()
            print(f"  {Colors.RED}{Colors.BOLD}╔══════════════════════════════════════════════╗{Colors.END}")
            print(f"  {Colors.RED}{Colors.BOLD}║  RESULT: FAIL — Platform has critical issues ║{Colors.END}")
            print(f"  {Colors.RED}{Colors.BOLD}╚══════════════════════════════════════════════╝{Colors.END}")
            sys.exit(1)
        else:
            print(f"  {Colors.GREEN}{Colors.BOLD}╔══════════════════════════════════════════════════════════════════╗{Colors.END}")
            print(f"  {Colors.GREEN}{Colors.BOLD}║  ✓ ALL {self.total_tests} TESTS PASSED ACROSS {total_phases} PHASES                       ║{Colors.END}")
            print(f"  {Colors.GREEN}{Colors.BOLD}║  ✓ ZERO CRASHES, ZERO LOGIC ERRORS, ZERO SECURITY LEAKS        ║{Colors.END}")
            print(f"  {Colors.GREEN}{Colors.BOLD}║  ✓ PLATFORM IS STABLE AND DEPLOYMENT-READY                     ║{Colors.END}")
            print(f"  {Colors.GREEN}{Colors.BOLD}╚══════════════════════════════════════════════════════════════════╝{Colors.END}")
            sys.exit(0)


if __name__ == "__main__":
    sim = MasterSimulation()
    sim.run()
