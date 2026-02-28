from typing import Dict, Optional
import time

class EnrichmentHub:
    """
    Central hub for identity enrichment and sanctions screening.
    Caches external provider responses (LSEG, Refinitiv) to speed up trace path scoring.
    """
    
    # Internal Cache: {account_id: {data, expires_at}}
    _cache = {}

    @classmethod
    def get_account_profile(cls, account_id: str) -> Dict:
        """
        Retrieves enrichment data for a node. 
        Hydrates risk tags such as 'PEP', 'SANCTIONED', 'SHELL_COMPANY'.
        """
        # Guard against None/empty input
        if not account_id or not isinstance(account_id, str):
            return {"account_id": str(account_id), "risk_tags": [], "kyc_status": "UNKNOWN"}

        now = time.time()
        
        # 1. Check Cache
        if account_id in cls._cache:
            entry = cls._cache[account_id]
            if entry["expires_at"] > now:
                return entry["data"]

        # 2. Simulate External API Call (Hydration)
        profile = cls._simulate_external_fetch(account_id)
        
        # 3. Cache with ETag/TTL (1 hour)
        cls._cache[account_id] = {
            "data": profile,
            "expires_at": now + 3600
        }
        
        return profile

    @staticmethod
    def _simulate_external_fetch(account_id: str) -> Dict:
        """
        Simulates call to a global sanctions watch-list provider.
        """
        risk_tags = []
        if "FRAUD" in account_id.upper(): risk_tags.append("HIGH_RISK_ENTITY")
        if "SANCTION" in account_id.upper(): risk_tags.append("SANCTIONED")
        
        return {
            "account_id": account_id,
            "legal_name": f"Entity_{account_id}",
            "jurisdiction": "Unknown",
            "risk_tags": risk_tags,
            "last_verified": time.ctime(),
            "provider_ref": f"REF_{int(time.time()/1000)}"
        }
        
    @classmethod
    def flush_cache(cls):
        cls._cache.clear()
        return True
