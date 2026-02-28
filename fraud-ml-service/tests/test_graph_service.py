import unittest
from unittest.mock import MagicMock, patch
from app.graph_service import GraphService

class TestGraphService(unittest.TestCase):
    @patch("app.graph_service.GraphDatabase")
    def setUp(self, mock_db):
        self.gs = GraphService()
        self.gs.driver = MagicMock()

    def test_get_account_features_ring(self):
        # Mocking the session and result
        mock_session = self.gs.driver.session.return_value.__enter__.return_value
        
        # Configure results for the 3 queries: cluster, ring, id_count
        mock_run = mock_session.execute_read.return_value
        
        # We need to mock the internal return of the execute_read lambda/function
        # For simplicity, we can mock the get_account_features to return a specific dict
        # but let's try to mock the tx.run inside
        
        def side_effect(fn, *args, **kwargs):
            mock_tx = MagicMock()
            # Mock results for each query
            mock_res_cluster = MagicMock()
            mock_res_cluster.single.return_value = {"cluster_size": 10}
            
            mock_res_ring = MagicMock()
            mock_res_ring.single.return_value = {"ring_detected": True}
            
            mock_res_id = MagicMock()
            mock_res_id.single.return_value = {"id_count": 3}
            
            mock_tx.run.side_effect = [mock_res_cluster, mock_res_ring, mock_res_id]
            return fn(mock_tx, *args, **kwargs)

        mock_session.execute_read.side_effect = side_effect
        
        features = self.gs.get_account_features("Acc123")
        
        self.assertEqual(features["cluster_size"], 10)
        self.assertTrue(features["ring_detected"])
        self.assertEqual(features["shared_id_count"], 3)

if __name__ == "__main__":
    unittest.main()
