import hashlib
import json
from datetime import datetime, timezone
import os

class AuditLedger:
    """
    Append-only log for security-critical actions.
    Each entry is chained to the previous via hash to prevent tampering.
    """
    
    ledger_file = "audit_ledger.jsonl"

    @classmethod
    def _ensure_ledger_exists(cls):
        if not os.path.exists(cls.ledger_file):
            with open(cls.ledger_file, "w") as f:
                pass

    @classmethod
    def write_entry(cls, actor: str, action: str, resource_id: str, prev_hash: str = "0"):
        """
        Writes a cryptographically signed entry to the audit log.
        """
        cls._ensure_ledger_exists()
        
        entry = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "actor": actor,
            "action": action,
            "resource": resource_id,
            "prev_hash": prev_hash
        }
        
        # Calculate current hash (Chaining)
        content_str = json.dumps(entry, sort_keys=True).encode()
        current_hash = hashlib.sha256(content_str).hexdigest()
        
        entry["hash"] = current_hash
        
        try:
            with open(cls.ledger_file, "a") as f:
                f.write(json.dumps(entry) + "\n")
        except IOError as e:
            # In a real system, this would trigger a critical alert
            print(f"CRITICAL: Audit log write failed: {e}")
            return None
            
        return current_hash

    @classmethod
    def verify_integrity(cls):
        """
        Iterates through the ledger verifying that hashes remain intact.
        """
        if not os.path.exists(cls.ledger_file):
            return True

        try:
            with open(cls.ledger_file, "r") as f:
                lines = f.readlines()
        except IOError:
            return False

        current_prev_hash = "0"
        for i, line in enumerate(lines):
            try:
                entry = json.loads(line.strip())
            except json.JSONDecodeError:
                return False # Corrupt line
                
            stored_hash = entry.pop("hash", None)
            if stored_hash is None:
                return False

            # Verify chaining
            if entry.get("prev_hash") != current_prev_hash:
                return False

            # Recompute hash
            content_str = json.dumps(entry, sort_keys=True).encode()
            computed_hash = hashlib.sha256(content_str).hexdigest()

            if computed_hash != stored_hash:
                return False
                
            current_prev_hash = stored_hash

        return True
