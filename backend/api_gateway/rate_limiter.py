import time
import logging
import threading

# Assumption: Redis is available at localhost:6379
# This mock implementatio simulates the sliding window algorithm logic.

class RateLimiter:
    """
    Sliding window rate limiter using Redis ZSETs.
    Prevents noisy tenants from degrading platform performance.
    """
    
    def __init__(self, limit=100, window=60):
        self.limit = limit # requests
        self.window = window # seconds
        self.storage = {} # Mocking Redis: {tenant_id: [timestamps]}
        self._lock = threading.Lock()

    def is_allowed(self, tenant_id: str) -> bool:
        now = time.time()
        
        with self._lock:
            if tenant_id not in self.storage:
                self.storage[tenant_id] = []
                
            # Clean expired timestamps (Sliding Window)
            self.storage[tenant_id] = [ts for ts in self.storage[tenant_id] if ts > now - self.window]
            
            if len(self.storage[tenant_id]) < self.limit:
                self.storage[tenant_id].append(now)
                return True, self.limit - len(self.storage[tenant_id])
            
            return False, 0

    def get_headers(self, allowed: bool, remaining: int):
        return {
            "X-Rate-Limit-Limit": str(self.limit),
            "X-Rate-Limit-Remaining": str(remaining),
            "X-Rate-Limit-Reset": str(self.window)
        }

# Usage Example in Middleware:
# allowed, remaining = limiter.is_allowed(tenant_id)
# if not allowed: raise HTTPException(429, headers=limiter.get_headers(False, 0))
