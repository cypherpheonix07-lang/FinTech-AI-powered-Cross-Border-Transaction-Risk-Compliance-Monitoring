from typing import List, Dict

class SchemaRegistry:
    """
    Central repository for platform data schemas and metadata.
    Enforces data governance, ownership, and retention tags.
    """
    
    _catalog = {
        "payments_v1": {
            "owner": "Payments_Core_Team",
            "retention": "7_YEARS",
            "fields": [
                {"name": "tx_id", "type": "UUID", "pii": False, "desc": "Unique trace identifier"},
                {"name": "sender_name", "type": "STRING", "pii": True, "desc": "Legal name of the originator"},
                {"name": "amount_usd", "type": "DECIMAL", "pii": False, "desc": "Transaction value in USD"}
            ]
        },
        "risk_scores_v1": {
            "owner": "Risk_ML_Team",
            "retention": "3_YEARS",
            "fields": [
                {"name": "score", "type": "FLOAT", "pii": False, "desc": "Normalized risk probability"},
                {"name": "model_version", "type": "STRING", "pii": False, "desc": "Inference engine version"}
            ]
        }
    }

    @classmethod
    def get_datasets(cls) -> Dict:
        return cls._catalog

    @classmethod
    def update_metadata(cls, dataset_name: str, updates: Dict):
        if dataset_name in cls._catalog:
            cls._catalog[dataset_name].update(updates)
            return True
        return False

    @classmethod
    def find_pii_fields(cls) -> List[Dict]:
        pii_fields = []
        for d_name, d_meta in cls._catalog.items():
            for f in d_meta["fields"]:
                if f.get("pii"):
                    pii_fields.append({"dataset": d_name, "field": f["name"]})
        return pii_fields
