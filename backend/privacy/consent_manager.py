from datetime import datetime, timezone
import uuid

class ConsentManager:
    """
    Manages granular data processing permissions.
    Ensures every enrichment and trace operation has active legal consent.
    """
    
    # Mock database: {consent_id: {data}}
    _storage = {}

    @classmethod
    def record_consent(cls, user_id: str, tenant_id: str, scope: str):
        """
        Registers a new consent grant for a specific processing scope.
        Scopes: 'TRACING', 'ML_TRAINING', 'THIRD_PARTY_SHARING', 'PROFILING'
        """
        consent_id = f"CON_{uuid.uuid4().hex[:8]}"
        consent_record = {
            "id": consent_id,
            "user_id": user_id,
            "tenant_id": tenant_id,
            "scope": scope,
            "granted_at": datetime.now(timezone.utc).isoformat(),
            "status": "ACTIVE"
        }
        cls._storage[consent_id] = consent_record
        return consent_record

    @classmethod
    def check_consent(cls, user_id: str, scope: str) -> bool:
        """
        Verifies if a specific user has granted permission for a data scope.
        """
        for c in cls._storage.values():
            if c["user_id"] == user_id and c["scope"] == scope and c["status"] == "ACTIVE":
                return True
        return False

    @classmethod
    def revoke_consent(cls, consent_id: str):
        if consent_id in cls._storage:
            cls._storage[consent_id]["status"] = "REVOKED"
            cls._storage[consent_id]["revoked_at"] = datetime.now(timezone.utc).isoformat()
            return True
        return False

    @classmethod
    def revoke_user_scopes(cls, user_id: str, scope: str):
        """
        Revokes all active consents for a user within a specific scope.
        """
        revoked_count = 0
        for cid, record in cls._storage.items():
            if record["user_id"] == user_id and record["scope"] == scope and record["status"] == "ACTIVE":
                record["status"] = "REVOKED"
                record["revoked_at"] = datetime.now(timezone.utc).isoformat()
                revoked_count += 1
        return revoked_count
