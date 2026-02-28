from neo4j import GraphDatabase
import os
import logging

logger = logging.getLogger(__name__)

class GraphService:
    def __init__(self):
        self.uri = os.getenv("NEO4J_URI", "bolt://neo4j:7687")
        self.user = os.getenv("NEO4J_USER", "neo4j")
        self.password = os.getenv("NEO4J_PASSWORD", "password")
        self.driver = None
        
        try:
            self.driver = GraphDatabase.driver(self.uri, auth=(self.user, self.password))
            # Verify connectivity
            self.driver.verify_connectivity()
            logger.info("Connected to Neo4j at %s", self.uri)
        except Exception as e:
            logger.error("Failed to connect to Neo4j: %s", e)

    def close(self):
        if self.driver:
            self.driver.close()

    def get_account_features(self, account_number: str):
        """
        Retrieves graph-based features for an account:
        - cluster_size: number of accounts sharing identifiers with this one
        - ring_detected: if the account is part of a circular transfer pattern
        - shared_id_count: number of shared identifiers
        """
        if not self.driver:
            return {"cluster_size": 0, "ring_detected": False, "shared_id_count": 0}

        with self.driver.session() as session:
            return session.execute_read(self._get_features_tx, account_number)

    def _get_features_tx(self, tx, account_number: str):
        # 1. Cluster size (accounts reachable via shared identifiers)
        cluster_query = """
        MATCH (a:Account {accountNumber: $acc})-[:HAS_IDENTIFIER*1..2]-(other:Account)
        RETURN count(DISTINCT other) as cluster_size
        """
        
        # 2. Ring detection (simplified circularity check)
        ring_query = """
        MATCH (a:Account {accountNumber: $acc})
        MATCH path = (a)-[:SENT*3..5]->(a)
        RETURN count(path) > 0 as ring_detected
        """
        
        # 3. Shared ID count
        id_query = """
        MATCH (a:Account {accountNumber: $acc})-[:HAS_IDENTIFIER]->(id:Identifier)
        RETURN count(id) as id_count
        """

        cluster_res = tx.run(cluster_query, acc=account_number).single()
        ring_res = tx.run(ring_query, acc=account_number).single()
        id_res = tx.run(id_query, acc=account_number).single()

        return {
            "cluster_size": cluster_res["cluster_size"] if cluster_res else 0,
            "ring_detected": ring_res["ring_detected"] if ring_res else False,
            "shared_id_count": id_res["id_count"] if id_res else 0
        }

# Singleton instance
_graph_service = None

def get_graph_service():
    global _graph_service
    if _graph_service is None:
        _graph_service = GraphService()
    return _graph_service
