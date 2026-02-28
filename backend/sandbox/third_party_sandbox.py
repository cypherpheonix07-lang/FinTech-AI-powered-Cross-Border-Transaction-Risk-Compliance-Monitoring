import uuid
from typing import Dict

class ThirdPartySandbox:
    """
    Manages isolated environments for third-party developers.
    Ensures marketplace apps only access 'SANDBOX' tenant datasets.
    """
    
    _apps = {} # client_id: {data}

    @classmethod
    def register_app(cls, name: str, developer_id: str, scopes: list):
        """
        Creates a new marketplace application entry.
        """
        client_id = f"KUB_{uuid.uuid4().hex[:12]}"
        client_secret = f"sk_{uuid.uuid4().hex}"
        
        app_entry = {
            "name": name,
            "dev_id": developer_id,
            "client_id": client_id,
            "client_secret": client_secret,
            "scopes": scopes,
            "tenant_affinity": "TENANT_SANDBOX_01",
            "status": "APPROVED"
        }
        
        cls._apps[client_id] = app_entry
        return {"client_id": client_id, "client_secret": client_secret}

    @classmethod
    def validate_call(cls, client_id: str, scope_needed: str):
        """
        Verifies if an app has permission to execute a specific platform call.
        """
        app = cls._apps.get(client_id)
        if not app:
            return False, "Application invalid or deactivated."
            
        if scope_needed not in app["scopes"]:
            return False, f"Missing required scope: {scope_needed}"
            
        return True, app["tenant_affinity"]

    @classmethod
    def get_market_apps(cls):
        return [
            {"name": "ChainGraph Visualizer", "category": "Visualization", "installs": 142},
            {"name": "Swift-MT-Parser", "category": "Ingestion", "installs": 88},
            {"name": "Mule-Scout-Bot", "category": "Risk", "installs": 310}
        ]
