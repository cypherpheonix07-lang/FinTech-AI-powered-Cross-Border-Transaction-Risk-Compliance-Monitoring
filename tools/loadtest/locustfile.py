from locust import HttpUser, task, between
import random
import uuid

class KuberaLoadTester(HttpUser):
    """
    Simulates high-concurrency analyst activity and streaming ingestion.
    """
    wait_time = between(1, 3) # Realistic delay between clicks
    
    def on_start(self):
        # Set persistent tenant context for the user
        self.tenant_id = f"TENANT_STRESS_{random.randint(1,5)}"
        self.headers = {"X-Tenant-ID": self.tenant_id}

    @task(3)
    def trace_transaction(self):
        """Simulates analyst investigating a path."""
        tx_id = f"TX_{random.randint(1, 1000)}"
        self.client.get(f"/trace/{tx_id}", headers=self.headers)

    @task(5)
    def ingestion_burst(self):
        """Simulates high-velocity transaction feed."""
        tx_data = {
            "id": str(uuid.uuid4()),
            "amount": random.uniform(10, 5000),
            "currency": "USD",
            "source": "SWIFT-GPI-STRESS"
        }
        self.client.post("/ingest/stream", json=tx_data, headers=self.headers)

    @task(1)
    def model_inference(self):
        """Simulates heavy GNN model scoring."""
        self.client.post("/predict/path-risk", json={
            "nodes": [{"id": "A"}, {"id": "B"}],
            "edges": [{"from": "A", "to": "B"}],
            "tenant_id": self.tenant_id
        }, headers=self.headers)
