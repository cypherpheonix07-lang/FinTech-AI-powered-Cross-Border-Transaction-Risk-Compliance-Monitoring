"""
KUBERA TRACE — 10-STAGE CHAOS SIMULATION ENGINE v2.0
Comprehensive backend resilience testing: fuzzing, concurrency, edge-cases.
"""
import random
import time
import logging
import sys
import os
import json
import threading
from concurrent.futures import ThreadPoolExecutor

# Ensure backend modules can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from backend.api_gateway.rate_limiter import RateLimiter
from backend.services.counterfactuals import CounterfactualService
from backend.privacy.consent_manager import ConsentManager
from backend.security.secure_enclave import SecureEnclave
from backend.policy.simulator import PolicySimulator
from backend.enrichment.enrichment_hub import EnrichmentHub
from backend.audit.append_ledger import AuditLedger
from backend.privacy.gdpr_workflow import GDPRWorkflow
from backend.sandbox.third_party_sandbox import ThirdPartySandbox
from backend.policy.opa_adapter import OPAAdapter
from backend.services.explainability import ExplainabilityService
from backend.services.lineage import LineageService
from backend.catalog.schema_registry import SchemaRegistry

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - [CHAOS] - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("simulation_chaos.log", mode='w'),
        logging.StreamHandler(sys.stdout)
    ]
)

class ChaosEngine:
    def __init__(self):
        self.errors_found = []
        self.tests_run = 0
        self.rate_limiter = RateLimiter(limit=10, window=1)

    # ═══════════════════════════════════════════════════
    # STAGE 1: Rate Limiter Fuzzing
    # ═══════════════════════════════════════════════════
    def stage_1_rate_limiter(self):
        logging.info(">>> Stage 1: Rate Limiter Fuzzing (Thread-Safety + Input Fuzzing)")

        tenants = ["T_VALID", "T_MALICIOUS", "", None, 123, "T_OVERFLOW" * 100, True, 0, -1]

        def make_request(tenant):
            try:
                allowed, remaining = self.rate_limiter.is_allowed(tenant)
                if not isinstance(allowed, bool):
                    self.errors_found.append(f"RateLimiter type error: is_allowed returned {type(allowed)}")
                return True
            except Exception as e:
                self.errors_found.append(f"RateLimiter Crash on '{tenant}': {e}")
                return False

        with ThreadPoolExecutor(max_workers=20) as executor:
            for _ in range(500):
                t = random.choice(tenants)
                executor.submit(make_request, t)
                self.tests_run += 1

        logging.info("Stage 1 Complete.")

    # ═══════════════════════════════════════════════════
    # STAGE 2: Counterfactual AI Fuzzing
    # ═══════════════════════════════════════════════════
    def stage_2_counterfactuals(self):
        logging.info(">>> Stage 2: Counterfactual AI Fuzzing (Boundary + Type Attacks)")

        inputs = [
            ("TX_NORMAL", 0.5),
            ("TX_ZERO", 0.0),
            ("TX_NEG", -1.0),
            ("TX_MAX", 1.0),
            ("TX_OVER", 999.9),
            ("TX_NULL", None),
            ("TX_STR", "HIGH_RISK"),
            ("TX_EDGE", 0.7),        # Boundary threshold
            ("TX_EDGE2", 0.70001),   # Just above threshold
            ("TX_TINY", 0.001),
        ]

        for tx_id, risk in inputs:
            try:
                self.tests_run += 1
                result = CounterfactualService.get_suggestions(tx_id, risk)

                if isinstance(risk, (int, float)) and 0 <= risk <= 1.0:
                    if result['estimated_new_risk'] > result['current_risk'] and risk > 0.7:
                        self.errors_found.append(f"Logic: Risk increased for {tx_id}")
                    if result['estimated_new_risk'] < 0 and risk >= 0:
                        self.errors_found.append(f"Logic: Risk below zero for {tx_id}")

            except (ValueError, TypeError):
                continue  # Expected validation
            except Exception as e:
                self.errors_found.append(f"Counterfactual Crash on ({tx_id}, {risk}): {e}")

        logging.info("Stage 2 Complete.")

    # ═══════════════════════════════════════════════════
    # STAGE 3: Consent Manager Concurrency
    # ═══════════════════════════════════════════════════
    def stage_3_consent(self):
        logging.info(">>> Stage 3: Consent Manager Concurrency (Race Conditions)")

        user_id = "U_CONCURRENT"
        scope = "DATA_SALE"

        def toggle_consent():
            try:
                action = random.choice(["GRANT", "REVOKE"])
                if action == "GRANT":
                    ConsentManager.record_consent(user_id, "T_CHAOS", scope)
                else:
                    ConsentManager.revoke_user_scopes(user_id, scope)
            except Exception as e:
                self.errors_found.append(f"Consent Error: {e}")

        with ThreadPoolExecutor(max_workers=10) as executor:
            for _ in range(100):
                executor.submit(toggle_consent)
                self.tests_run += 1

        try:
            status = ConsentManager.check_consent(user_id, scope)
            logging.info(f"Final Consent Status: {status}")
        except Exception as e:
            self.errors_found.append(f"Consent Check Failed: {e}")

        logging.info("Stage 3 Complete.")

    # ═══════════════════════════════════════════════════
    # STAGE 4: SecureEnclave — Encryption Roundtrip
    # ═══════════════════════════════════════════════════
    def stage_4_enclave(self):
        logging.info(">>> Stage 4: SecureEnclave (Attestation + Encrypt/Decrypt Roundtrip)")

        self.tests_run += 1
        try:
            doc = SecureEnclave.attune_enclave()
            assert doc["status"] == "ATTESTED", f"Attestation failed: {doc}"
            assert "pcr0" in doc, "Missing PCR0"
        except Exception as e:
            self.errors_found.append(f"Enclave Attestation Crash: {e}")

        # Test encrypt-decrypt roundtrip
        test_payloads = [
            {"sanctioned_match": True},
            {"sanctioned_match": False},
            {"sanctioned_match": True, "extra_field": "noise"},
            {},
        ]
        for payload in test_payloads:
            self.tests_run += 1
            try:
                encrypted = SecureEnclave._cipher.encrypt(json.dumps(payload).encode())
                result = SecureEnclave.secure_execute(encrypted)
                if isinstance(result, dict) and "error" in result:
                    self.errors_found.append(f"Enclave execution error: {result['error']}")
                elif isinstance(result, str):
                    # Decrypt and validate
                    decrypted = json.loads(SecureEnclave._cipher.decrypt(result.encode()))
                    if "risk_score" not in decrypted:
                        self.errors_found.append("Enclave missing risk_score in result")
            except Exception as e:
                self.errors_found.append(f"Enclave Roundtrip Crash on {payload}: {e}")

        # Fuzz with bad input
        bad_inputs = [b"not_encrypted", "", None, 12345]
        for bad in bad_inputs:
            self.tests_run += 1
            try:
                result = SecureEnclave.secure_execute(bad)
                # Should return error dict, not crash
                if not isinstance(result, dict) or "error" not in result:
                    self.errors_found.append(f"Enclave didn't gracefully handle bad input: {bad}")
            except Exception as e:
                self.errors_found.append(f"Enclave Crash on bad input {bad}: {e}")

        logging.info("Stage 4 Complete.")

    # ═══════════════════════════════════════════════════
    # STAGE 5: AuditLedger Integrity
    # ═══════════════════════════════════════════════════
    def stage_5_audit_ledger(self):
        logging.info(">>> Stage 5: AuditLedger (Write + Verify Integrity)")

        # Clean up any previous test file
        test_ledger = "test_audit_ledger.jsonl"
        AuditLedger.ledger_file = test_ledger
        if os.path.exists(test_ledger):
            os.remove(test_ledger)

        self.tests_run += 1
        try:
            h1 = AuditLedger.write_entry("admin", "CREATE_CASE", "CASE_001")
            h2 = AuditLedger.write_entry("analyst", "VIEW_TRACE", "TX_500", prev_hash=h1)
            h3 = AuditLedger.write_entry("system", "RISK_SCORE", "TX_500", prev_hash=h2)

            if not AuditLedger.verify_integrity():
                self.errors_found.append("AuditLedger integrity check failed on valid data")
        except Exception as e:
            self.errors_found.append(f"AuditLedger Crash: {e}")

        # Test tamper detection
        self.tests_run += 1
        try:
            with open(test_ledger, "r") as f:
                lines = f.readlines()
            if len(lines) >= 2:
                tampered = json.loads(lines[1])
                tampered["actor"] = "EVIL_HACKER"
                lines[1] = json.dumps(tampered) + "\n"
                with open(test_ledger, "w") as f:
                    f.writelines(lines)

                if AuditLedger.verify_integrity():
                    self.errors_found.append("AuditLedger FAILED to detect tampered entry!")
        except Exception as e:
            self.errors_found.append(f"AuditLedger tamper test crash: {e}")

        # Clean up
        if os.path.exists(test_ledger):
            os.remove(test_ledger)

        logging.info("Stage 5 Complete.")

    # ═══════════════════════════════════════════════════
    # STAGE 6: PolicySimulator Edge Cases
    # ═══════════════════════════════════════════════════
    def stage_6_policy_simulator(self):
        logging.info(">>> Stage 6: PolicySimulator (Division-by-Zero + Edge Values)")

        test_rules = [
            {"velocity_cap": 0, "amount_alert": 0},        # Was div-by-zero
            {"velocity_cap": -5, "amount_alert": -100},     # Negative
            {"velocity_cap": 10, "amount_alert": 10000},    # Normal
            {"velocity_cap": 1000000, "amount_alert": 999999999},  # Extreme
            {},  # Empty rules — should use defaults
        ]

        for rules in test_rules:
            self.tests_run += 1
            try:
                result = PolicySimulator.simulate_rule_change("DS_TEST", rules)
                if result["alerts_generated"] < 0:
                    self.errors_found.append(f"PolicySim: Negative alerts for {rules}")
                if result["false_positive_estimate"] < 0:
                    self.errors_found.append(f"PolicySim: Negative FP for {rules}")
            except ZeroDivisionError:
                self.errors_found.append(f"PolicySim: Division-by-zero on {rules}")
            except Exception as e:
                self.errors_found.append(f"PolicySim Crash on {rules}: {e}")

        logging.info("Stage 6 Complete.")

    # ═══════════════════════════════════════════════════
    # STAGE 7: EnrichmentHub Cache Stampede
    # ═══════════════════════════════════════════════════
    def stage_7_enrichment(self):
        logging.info(">>> Stage 7: EnrichmentHub (Cache Stampede + PII Detection)")

        accounts = [
            "ACC_NORMAL_001",
            "ACC_FRAUD_DETECTED",
            "ACC_SANCTION_LISTED",
            "",
            None,
            "A" * 10000,  # Overflow
        ]

        def fetch_profile(acc):
            try:
                profile = EnrichmentHub.get_account_profile(acc)
                if "account_id" not in profile:
                    self.errors_found.append(f"Enrichment missing account_id for {acc}")
            except Exception as e:
                self.errors_found.append(f"Enrichment Crash on '{acc}': {e}")

        with ThreadPoolExecutor(max_workers=10) as executor:
            for _ in range(50):
                acc = random.choice(accounts)
                executor.submit(fetch_profile, acc)
                self.tests_run += 1

        # Verify FRAUD tag detection
        self.tests_run += 1
        try:
            profile = EnrichmentHub.get_account_profile("ACC_FRAUD_HIGH")
            if "HIGH_RISK_ENTITY" not in profile.get("risk_tags", []):
                self.errors_found.append("Enrichment failed to tag FRAUD account")
        except Exception as e:
            self.errors_found.append(f"Enrichment tag verification crash: {e}")

        # Flush cache test
        self.tests_run += 1
        try:
            EnrichmentHub.flush_cache()
            assert len(EnrichmentHub._cache) == 0
        except Exception as e:
            self.errors_found.append(f"Enrichment flush crash: {e}")

        logging.info("Stage 7 Complete.")

    # ═══════════════════════════════════════════════════
    # STAGE 8: GDPR Workflow Concurrency
    # ═══════════════════════════════════════════════════
    def stage_8_gdpr(self):
        logging.info(">>> Stage 8: GDPRWorkflow (Concurrent SAR + Deletion + Legal Hold)")

        # Test legal hold block
        self.tests_run += 1
        try:
            result = GDPRWorkflow.initiate_deletion("user_hold", legal_hold=True)
            if "error" not in result:
                self.errors_found.append("GDPR: Legal hold did not block deletion")
        except Exception as e:
            self.errors_found.append(f"GDPR legal hold crash: {e}")

        # Test concurrent SAR jobs
        job_ids = []
        def start_sar(i):
            try:
                jid = GDPRWorkflow.initiate_sar(f"user_{i}", f"TENANT_{i}")
                job_ids.append(jid)
                status = GDPRWorkflow.get_job_status(jid)
                if status.get("status") not in ["PROCESSING", "COMPLETED"]:
                    self.errors_found.append(f"GDPR SAR invalid status: {status}")
            except Exception as e:
                self.errors_found.append(f"GDPR SAR crash: {e}")

        with ThreadPoolExecutor(max_workers=5) as executor:
            for i in range(20):
                executor.submit(start_sar, i)
                self.tests_run += 1

        # Test deletion
        self.tests_run += 1
        try:
            result = GDPRWorkflow.initiate_deletion("user_del_test")
            if "job_id" not in result:
                self.errors_found.append("GDPR: Deletion didn't return job_id")
        except Exception as e:
            self.errors_found.append(f"GDPR deletion crash: {e}")

        # Test missing job
        self.tests_run += 1
        try:
            status = GDPRWorkflow.get_job_status("NONEXISTENT_JOB")
            if "error" not in status:
                self.errors_found.append("GDPR: Missing job didn't return error")
        except Exception as e:
            self.errors_found.append(f"GDPR missing job crash: {e}")

        logging.info("Stage 8 Complete.")

    # ═══════════════════════════════════════════════════
    # STAGE 9: ThirdPartySandbox Scope Escalation
    # ═══════════════════════════════════════════════════
    def stage_9_sandbox(self):
        logging.info(">>> Stage 9: ThirdPartySandbox (Registration + Scope Escalation)")

        self.tests_run += 1
        try:
            creds = ThirdPartySandbox.register_app("TestApp", "dev_001", ["READ_TRACES"])
            cid = creds["client_id"]

            # Valid scope
            ok, _ = ThirdPartySandbox.validate_call(cid, "READ_TRACES")
            if not ok:
                self.errors_found.append("Sandbox: Valid scope was denied")

            # Scope escalation attempt
            ok, msg = ThirdPartySandbox.validate_call(cid, "ADMIN_WRITE")
            if ok:
                self.errors_found.append("Sandbox: CRITICAL - Scope escalation succeeded!")

            # Invalid client
            ok, msg = ThirdPartySandbox.validate_call("FAKE_CLIENT", "READ_TRACES")
            if ok:
                self.errors_found.append("Sandbox: CRITICAL - Invalid client was allowed!")

        except Exception as e:
            self.errors_found.append(f"Sandbox Crash: {e}")

        # Market listing test
        self.tests_run += 1
        try:
            apps = ThirdPartySandbox.get_market_apps()
            if not isinstance(apps, list) or len(apps) == 0:
                self.errors_found.append("Sandbox: Market listing returned empty/invalid")
        except Exception as e:
            self.errors_found.append(f"Sandbox market crash: {e}")

        logging.info("Stage 9 Complete.")

    # ═══════════════════════════════════════════════════
    # STAGE 10: OPA + Explainability + Lineage + Schema
    # ═══════════════════════════════════════════════════
    def stage_10_integration(self):
        logging.info(">>> Stage 10: OPA + Explainability + Lineage + Schema (Cross-Module)")

        # OPA boundary tests
        opa_tests = [
            ({"amount": 500}, True),          # Below threshold
            ({"amount": 1000001}, False),      # Above threshold
            ({"amount": 0}, True),
            ({"amount": -100}, True),
            ({}, True),                        # No amount field
        ]
        for tx, expected_allow in opa_tests:
            self.tests_run += 1
            try:
                result = OPAAdapter.evaluate_transaction(tx, "TENANT_01")
                if result["allow"] != expected_allow:
                    self.errors_found.append(f"OPA: Expected allow={expected_allow} for {tx}, got {result}")
            except Exception as e:
                self.errors_found.append(f"OPA Crash on {tx}: {e}")

        # Explainability
        self.tests_run += 1
        try:
            shap = ExplainabilityService.get_shap_values("TX_001")
            if "contributions" not in shap or len(shap["contributions"]) == 0:
                self.errors_found.append("Explainability: Missing SHAP contributions")
            if shap["prediction"] <= shap["base_value"]:
                pass  # Valid scenario
        except Exception as e:
            self.errors_found.append(f"Explainability Crash: {e}")

        # Lineage
        self.tests_run += 1
        try:
            node = LineageService.capture_provenance("TRANSACTION", "TX_001", {"source": "TEST"})
            if "lineage_id" not in node:
                self.errors_found.append("Lineage: Missing lineage_id")
            path = LineageService.get_path_to_origin("TX_001")
            if not isinstance(path, list) or len(path) == 0:
                self.errors_found.append("Lineage: Empty path to origin")
        except Exception as e:
            self.errors_found.append(f"Lineage Crash: {e}")

        # Schema Registry
        self.tests_run += 1
        try:
            datasets = SchemaRegistry.get_datasets()
            if "payments_v1" not in datasets:
                self.errors_found.append("Schema: Missing payments_v1 dataset")
            pii = SchemaRegistry.find_pii_fields()
            if len(pii) == 0:
                self.errors_found.append("Schema: No PII fields detected")
            # Test update
            SchemaRegistry.update_metadata("payments_v1", {"retention": "10_YEARS"})
            updated = SchemaRegistry.get_datasets()["payments_v1"]
            if updated["retention"] != "10_YEARS":
                self.errors_found.append("Schema: Metadata update failed")
        except Exception as e:
            self.errors_found.append(f"Schema Crash: {e}")

        logging.info("Stage 10 Complete.")

    # ═══════════════════════════════════════════════════
    # MAIN RUNNER
    # ═══════════════════════════════════════════════════
    def run(self):
        logging.info("=" * 60)
        logging.info("KUBERA TRACE: 10-STAGE CHAOS SIMULATION v2.0")
        logging.info("=" * 60)
        start_time = time.time()

        self.stage_1_rate_limiter()
        self.stage_2_counterfactuals()
        self.stage_3_consent()
        self.stage_4_enclave()
        self.stage_5_audit_ledger()
        self.stage_6_policy_simulator()
        self.stage_7_enrichment()
        self.stage_8_gdpr()
        self.stage_9_sandbox()
        self.stage_10_integration()

        duration = time.time() - start_time

        logging.info("=" * 60)
        logging.info("SIMULATION REPORT")
        logging.info("=" * 60)
        logging.info(f"Total Tests Executed: {self.tests_run}")
        logging.info(f"Execution Time: {duration:.2f}s")

        if self.errors_found:
            logging.error(f"CRITICAL ISSUES FOUND ({len(self.errors_found)}):")
            for i, err in enumerate(self.errors_found, 1):
                logging.error(f"  {i}. {err}")
            sys.exit(1)
        else:
            logging.info("SUCCESS: All 10 stages passed. Zero crashes. Zero logic errors.")
            sys.exit(0)

if __name__ == "__main__":
    engine = ChaosEngine()
    engine.run()
