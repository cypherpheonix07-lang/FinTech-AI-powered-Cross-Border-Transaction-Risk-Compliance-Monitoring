/**
 * scripts/mock-enhanced-server.js
 * Enhanced mock server for Kubera Trace Phase 2.
 * Supports: SSE, WebSockets (Collab), XAI (SHAP), and Scenario Building.
 */

import http from 'http';
import { WebSocketServer } from 'ws'; // Note: User needs to install 'ws'

const PORT = 8000;
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // SHAP Explainability
  if (req.url.startsWith('/explain/tx/')) {
    const txId = req.url.split('/').pop();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      tx_id: txId,
      overall_risk: 0.85,
      natural_language: `Transaction ${txId} shows indicators of structured layering across high-risk corridors.`,
      features: [
        { name: "Hop Velocity", importance: 0.62 },
        { name: "Jurisdiction Risk", importance: 0.28 },
        { name: "Amount Anomaly", importance: 0.15 },
        { name: "Historical Baseline", importance: -0.12 }
      ]
    }));
    return;
  }

  // Scenario Simulator
  if (req.url === '/simulate/scenario' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      csv: "account_id,amount,bank,country,timestamp\nMULE_1,50000,BankX,UK,2026-02-15T10:00:00Z\nMULE_2,49000,BankY,Switzerland,2026-02-15T11:00:00Z"
    }));
    return;
  }

  // Legacy SSE
  if (req.url === '/sse/graph') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
    setInterval(() => {
      res.write(`data: ${JSON.stringify({ type: 'node_created', payload: { id: `MOCK_${Math.floor(Math.random()*1000)}`, bank: 'Central', country: 'Germany', risk: Math.random() } })}\n\n`);
    }, 15000);
    return;
  }

  res.writeHead(404); res.end();
});

// Setup WebSocket for Collaboration
const wss = new WebSocketServer({ server });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('WS: Analyst connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    // Broadcast to all other analysts
    clients.forEach(client => {
      if (client !== ws && client.readyState === 1) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on('close', () => clients.delete(ws));
});

server.listen(PORT, () => {
  console.log(`Kubera Enhanced Intelligence Server running at http://localhost:${PORT}`);
});
