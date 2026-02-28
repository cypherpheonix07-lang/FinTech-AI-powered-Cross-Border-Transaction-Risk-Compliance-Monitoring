"""
Expanded test suite covering all backend modules.
Run with: pytest backend/tests/test_ecosystem.py -v
"""
import pytest
import os
import json
from backend.api_gateway.rate_limiter import RateLimiter
from backend.privacy.consent_manager import ConsentManager
from backend.security.secure_enclave import SecureEnclave
from backend.services.counterfactuals import CounterfactualService
from backend.policy.simulator import PolicySimulator
from backend.enrichment.enrichment_hub import EnrichmentHub
from backend.audit.append_ledger import AuditLedger
from backend.privacy.gdpr_workflow import GDPRWorkflow
from backend.sandbox.third_party_sandbox import ThirdPartySandbox
from backend.policy.opa_adapter import OPAAdapter
from backend.services.explainability import ExplainabilityService
from backend.services.lineage import LineageService
from backend.catalog.schema_registry import SchemaRegistry


# ── Rate Limiter ──
def test_rate_limiter_sliding_window():
    limiter = RateLimiter(limit=2, window=10)
    assert limiter.is_allowed("tenant_a")[0] is True
    assert limiter.is_allowed("tenant_a")[0] is True
    assert limiter.is_allowed("tenant_a")[0] is False  # Limit reached


def test_rate_limiter_thread_safety():
    """Regression: ensures no crash under concurrent access."""
    import threading
    limiter = RateLimiter(limit=100, window=1)
    errors = []

    def hammer():
        try:
            for _ in range(50):
                limiter.is_allowed("T_THREAD")
        except Exception as e:
            errors.append(str(e))

    threads = [threading.Thread(target=hammer) for _ in range(10)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    assert len(errors) == 0, f"Thread-safety failures: {errors}"


# ── Consent Manager ──
def test_consent_lifecycle():
    user = "user_99"
    ConsentManager.record_consent(user, "T1", "TRACING")
    assert ConsentManager.check_consent(user, "TRACING") is True
    assert ConsentManager.check_consent(user, "ML_TRAINING") is False


def test_consent_revoke_by_scope():
    """Regression: revoke_user_scopes should work by user+scope."""
    user = "user_revoke_test"
    ConsentManager.record_consent(user, "T1", "MARKETING")
    assert ConsentManager.check_consent(user, "MARKETING") is True
    ConsentManager.revoke_user_scopes(user, "MARKETING")
    assert ConsentManager.check_consent(user, "MARKETING") is False


# ── Secure Enclave ──
def test_secure_enclave_attestation():
    doc = SecureEnclave.attune_enclave()
    assert doc["status"] == "ATTESTED"
    assert "pcr0" in doc


def test_secure_enclave_roundtrip():
    """Regression: time import was missing, causing NameError."""
    payload = json.dumps({"sanctioned_match": True}).encode()
    encrypted = SecureEnclave._cipher.encrypt(payload)
    result = SecureEnclave.secure_execute(encrypted)
    assert isinstance(result, str), "Should return encrypted string"
    decrypted = json.loads(SecureEnclave._cipher.decrypt(result.encode()))
    assert decrypted["risk_score"] == 0.95


# ── Counterfactuals ──
def test_counterfactual_logic():
    result = CounterfactualService.get_suggestions("TX_X", 0.85)
    assert result["estimated_new_risk"] < 0.85
    assert len(result["suggestions"]) > 0


def test_counterfactual_rejects_invalid_types():
    """Regression: None/str inputs used to crash with TypeError."""
    with pytest.raises(ValueError):
        CounterfactualService.get_suggestions("TX", None)
    with pytest.raises(ValueError):
        CounterfactualService.get_suggestions("TX", "HIGH")
    with pytest.raises(ValueError):
        CounterfactualService.get_suggestions("TX", -1.0)


# ── Policy Simulator ──
def test_policy_simulator_zero_threshold():
    """Regression: division-by-zero when thresholds are 0."""
    result = PolicySimulator.simulate_rule_change("DS", {"velocity_cap": 0, "amount_alert": 0})
    assert result["alerts_generated"] >= 0
    assert result["false_positive_estimate"] >= 0


# ── Audit Ledger ──
def test_audit_ledger_write_and_verify():
    """Regression: verify_integrity was a stub returning True."""
    test_file = "test_ledger_unit.jsonl"
    AuditLedger.ledger_file = test_file
    if os.path.exists(test_file):
        os.remove(test_file)

    h1 = AuditLedger.write_entry("admin", "CREATE", "RES_1")
    h2 = AuditLedger.write_entry("user", "READ", "RES_2", prev_hash=h1)
    assert AuditLedger.verify_integrity() is True

    # Tamper and verify detection
    with open(test_file, "r") as f:
        lines = f.readlines()
    entry = json.loads(lines[0])
    entry["actor"] = "TAMPERED"
    lines[0] = json.dumps(entry) + "\n"
    with open(test_file, "w") as f:
        f.writelines(lines)
    assert AuditLedger.verify_integrity() is False

    os.remove(test_file)


# ── GDPR Workflow ──
def test_gdpr_legal_hold():
    result = GDPRWorkflow.initiate_deletion("user_x", legal_hold=True)
    assert "error" in result


def test_gdpr_deletion():
    result = GDPRWorkflow.initiate_deletion("user_y")
    assert "job_id" in result
    assert result["status"] == "QUEUED"


# ── Sandbox ──
def test_sandbox_scope_escalation():
    """Ensures apps cannot access scopes they weren't granted."""
    creds = ThirdPartySandbox.register_app("TestApp", "dev_1", ["READ"])
    ok, _ = ThirdPartySandbox.validate_call(creds["client_id"], "READ")
    assert ok is True
    ok, _ = ThirdPartySandbox.validate_call(creds["client_id"], "ADMIN_WRITE")
    assert ok is False


# ── OPA ──
def test_opa_high_value_block():
    result = OPAAdapter.evaluate_transaction({"amount": 2000000}, "T1")
    assert result["allow"] is False


# ── Enrichment ──
def test_enrichment_fraud_tagging():
    profile = EnrichmentHub.get_account_profile("ACC_FRAUD_X")
    assert "HIGH_RISK_ENTITY" in profile["risk_tags"]
    EnrichmentHub.flush_cache()


# ── Schema Registry ──
def test_pii_detection():
    pii = SchemaRegistry.find_pii_fields()
    assert any(f["field"] == "sender_name" for f in pii)
