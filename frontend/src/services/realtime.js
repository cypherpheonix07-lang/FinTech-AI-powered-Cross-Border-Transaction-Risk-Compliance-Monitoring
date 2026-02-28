/**
 * services/realtime.js
 * Extended to support WebSockets for live collaboration (annotations, presence).
 */

class RealtimeService {
  constructor() {
    this.eventSource = null;
    this.ws = null;
    this.listeners = new Set();
    this.collabListeners = new Set();
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    this.wsUrl = this.baseUrl.replace('http', 'ws');
  }

  connect() {
    this.connectSSE();
    this.connectWS();
  }

  connectSSE() {
    if (this.eventSource) return;
    this.eventSource = new EventSource(`${this.baseUrl}/sse/graph`);
    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.listeners.forEach(cb => cb(data));
    };
  }

  connectWS() {
    if (this.ws) return;
    this.ws = new WebSocket(`${this.wsUrl}/ws/collab`);
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.collabListeners.forEach(cb => cb(data));
    };

    this.ws.onclose = () => {
      this.ws = null;
      setTimeout(() => this.connectWS(), 3000);
    };
  }

  sendCollabEvent(type, payload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload, timestamp: new Date().toISOString() }));
    }
  }

  subscribe(cb) { this.listeners.add(cb); return () => this.listeners.delete(cb); }
  subscribeCollab(cb) { this.collabListeners.add(cb); return () => this.collabListeners.delete(cb); }

  disconnect() {
    if (this.eventSource) this.eventSource.close();
    if (this.ws) this.ws.close();
  }
}

const realtimeService = new RealtimeService();
export default realtimeService;
