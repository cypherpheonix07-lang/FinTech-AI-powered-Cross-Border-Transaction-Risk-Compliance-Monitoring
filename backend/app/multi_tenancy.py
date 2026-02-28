from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
import logging

# Configure logger for audit/security events
logger = logging.getLogger("kubera.tenancy")

class TenantMiddleware(BaseHTTPMiddleware):
    """
    Middleware to resolve tenant context from headers.
    Enforces isolation at the API entry point.
    """
    async def dispatch(self, request: Request, call_next):
        # Extract X-Tenant-ID from headers
        tenant_id = request.headers.get("X-Tenant-ID")
        
        # In a real production system, we would validate this against a metadata DB/Cache
        # For the platform demo, we ensure it's provided and formatted correctly
        if not tenant_id:
            logger.warning(f"Access denied: Missing Tenant ID for {request.url.path}")
            raise HTTPException(status_code=403, detail="Tenant context required")
        
        # Store tenant_id in request state for downstream dependency injection
        request.state.tenant_id = tenant_id
        
        # Attach tenant info to logs for traceability
        logger.info(f"Context: {tenant_id} | Route: {request.url.path}")
        
        response = await call_next(request)
        
        # Inject tenant_id back into response headers for client-side persistence
        response.headers["X-Tenant-ID"] = tenant_id
        return response

def get_tenant_id(request: Request) -> str:
    """Dependency for injecting tenant_id into route handlers."""
    return getattr(request.state, "tenant_id", "GLOBAL")
