from datetime import datetime
import uuid

class LineageService:
    """
    Tracks the origin and transformation history of payment records.
    Essential for regulatory compliance and error forensics.
    """
    
    @staticmethod
    def capture_provenance(resource_type: str, resource_id: str, source_metadata: dict):
        """
        Generates a lineage entry for a new or derived record.
        """
        lineage_node = {
            "lineage_id": str(uuid.uuid4()),
            "timestamp": datetime.utcnow().isoformat(),
            "target": {
                "type": resource_type,
                "id": resource_id
            },
            "provenance": {
                "source": source_metadata.get("source", "KAFKA_STREAM"),
                "ingested_by": source_metadata.get("actor", "SYSTEM_USER"),
                "version": source_metadata.get("schema_version", "v1.0")
            }
        }
        
        # In prod, this would write to a specialized Graph DB (Neo4j) or Audit Table
        return lineage_node

    @staticmethod
    def get_path_to_origin(target_id: str):
        """
        Simulates retrieving a trace of how a record was generated.
        """
        return [
            {"step": "Raw Ingestion", "source": "SWIFT-MT103", "ts": "2026-02-15T10:00:00Z"},
            {"step": "Enrichment", "logic": "Entity Matching", "ts": "2026-02-15T10:00:02Z"},
            {"step": "Risk Scoring", "model": "GNN-v4.2", "ts": "2026-02-15T10:00:05Z"}
        ]
