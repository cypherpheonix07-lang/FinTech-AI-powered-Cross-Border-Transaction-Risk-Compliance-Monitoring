import { store } from '@/store';
import { addAlert } from '@/store/slices/alertSlice';
import { addRealtimeTransaction } from '@/store/slices/transactionSlice';
import { generateTransactions } from './mockData';

class MockWebSocket {
  private interval: NodeJS.Timeout | null = null;
  private isConnected = false;
  private tenantId?: string;

  connect(tenantId?: string) {
    if (this.isConnected && this.tenantId === tenantId) return;
    this.tenantId = tenantId;
    this.isConnected = true;
    console.log(`[MockWS] Connected to real-time risk feed ${tenantId ? `for tenant ${tenantId}` : ''}`);

    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (Math.random() > 0.7) {
        this.simulateNewTransaction();
      }
      if (Math.random() > 0.9) {
        this.simulateNewAlert();
      }
    }, 5000);
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isConnected = false;
    console.log('[MockWS] Disconnected');
  }

  private simulateNewTransaction() {
    const tx = generateTransactions(1, this.tenantId)[0];
    store.dispatch(addRealtimeTransaction(tx));
    
    if (tx.riskScore > 70) {
      store.dispatch(addAlert({
        id: `alert-${Date.now()}`,
        severity: tx.riskScore > 85 ? 'critical' : 'warning',
        message: `High risk transaction detected: ${tx.id.split('-')[0]} from ${tx.senderCountry} to ${tx.receiverCountry}`,
        source: 'Real-time Guard',
        timestamp: new Date().toISOString(),
        acknowledged: false
      }));
    }
  }

  private simulateNewAlert() {
    const alerts = [
      'System latency spike detected in Singapore node',
      'Model performance degradation on Corridor-EX-4',
      'Unusual volume spike from Tenant-Blue',
      'Failed webhook delivery to Swift Network',
    ];
    
    store.dispatch(addAlert({
      id: `alert-${Date.now()}`,
      severity: 'info',
      message: alerts[Math.floor(Math.random() * alerts.length)],
      source: 'System Monitor',
      timestamp: new Date().toISOString(),
      acknowledged: false
    }));
  }
}

export const wsClient = new MockWebSocket();
