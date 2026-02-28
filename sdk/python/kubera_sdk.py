"""
KUBERA TRACE — BRIGADE SDK (Python)
Assumptions:
- Requests library is available.
- Platform API enforces X-Tenant-ID header.
"""

import requests
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("kubera_sdk")

class KuberaClient:
    def __init__(self, base_url="http://localhost:8000", tenant_id=None, api_key=None):
        self.base_url = base_url.rstrip('/')
        self.tenant_id = tenant_id
        self.api_key = api_key
        self.session = requests.Session()
        self.session.headers.update({
            "Content-Type": "application/json",
            "X-Tenant-ID": str(tenant_id),
            "X-SDK-Version": "py-1.0.0"
        })

    def _request(self, method, endpoint, **kwargs):
        url = f"{self.base_url}{endpoint}"
        retries = 3
        
        for attempt in range(retries):
            try:
                response = self.session.request(method, url, **kwargs)
                
                # Handle Rate Limiting
                if response.status_code == 429:
                    wait = int(response.headers.get("Retry-After", 2))
                    logger.warning(f"Rate limited. Waiting {wait}s.")
                    time.sleep(wait)
                    continue
                
                response.raise_for_status()
                return response.json()
            except requests.exceptions.RequestException as e:
                if attempt == retries - 1:
                    raise e
                time.sleep(2 ** attempt)

    def trace_transaction(self, tx_id):
        """Perform a path trace for a specific transaction ID."""
        return self._request("GET", f"/trace/{tx_id}")

    def ingest_record(self, record_dict):
        """Ingest a single payment record into the platform."""
        return self._request("POST", "/ingest/stream", json=record_dict)

    def get_risk_assessment(self, account_id):
        """Retrieve the current risk profile for an account."""
        return self._request("GET", f"/risk/account/{account_id}")
