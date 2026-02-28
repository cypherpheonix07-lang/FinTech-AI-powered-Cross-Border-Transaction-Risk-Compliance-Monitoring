import express from 'express';
import { WebSocketServer } from 'ws';
import crypto from 'crypto';
import http from 'http';

const app = express();
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Tenant-ID, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const PORT = 8000;

// 1. Data Store (Mock)
const tenants = [{ id: 'TENANT_GOLD', name: 'Global Bank Alpha', plan: 'enterprise' }];
const auditLedger = [];
const datasets = [
  { id: 'payments_v1', name: 'Global Payment Streams', size: '1.4 TB', owner: 'Core_Payments' },
  { id: 'risk_scores_v1', name: 'Risk Inference Logs', size: '420 GB', owner: 'Intelligence_Ops' }
];

// 2. Multi-Tenancy Middleware
app.use((req, res, next) => {
  const tenantId = req.headers['x-tenant-id'];
  const bypassPaths = ['/tenants', '/auth', '/sse/graph-events', '/simulate/scenario'];
  if (!tenantId && !bypassPaths.some(p => req.path.startsWith(p))) {
    // We allow bypassing for now to prevent local dev frustration, but log it
    console.log(`[WARN] Missing X-Tenant-ID for path: ${req.path}`);
  }
  next();
});

// 3. API - Tenancy & Auth
app.post('/auth/login', (req, res) => {
  res.json({ token: 'mock_token_123', tenantId: 'TENANT_GOLD' });
});

app.post('/tenants', (req, res) => {
  const newTenant = { id: `T_${Date.now()}`, ...req.body };
  tenants.push(newTenant);
  res.status(201).json(newTenant);
});

// 4. API - ML, Explainability & Counterfactuals
app.get('/ml/models', (req, res) => {
  res.json([
    { id: 'GNN_V4', type: 'Path_Classifier', status: 'production' },
    { id: 'HYBRID_V1', type: 'Anomaly_Detector', status: 'staging' }
  ]);
});

app.get('/explain/tx/:id', (req, res) => {
  res.json({
    tx_id: req.params.id,
    risk_score: 0.82,
    overall_risk: 0.82,
    natural_language: `Transaction ${req.params.id} shows indicators of structured layering.`,
    features: [
      { name: 'Jurisdiction Risk', importance: 0.35 },
      { name: 'Entity Velocity', importance: 0.22 },
      { name: 'Amount Anomaly', importance: 0.15 }
    ],
    summary: 'High correlation with known layering patterns in correspondent accounts.'
  });
});

app.get('/explain/counterfactual/:id', (req, res) => {
    res.json({
        target_risk: 0.3,
        estimated_new_risk: 0.28,
        suggestions: [
            { feature: 'Velocity', current_value: '10', suggested_value: '2', impact: 0.3 },
            { feature: 'Jurisdiction', current_value: 'KYC-L3', suggested_value: 'KYC-L1', impact: 0.15 }
        ]
    });
});

// 5. API - Scenario Builder
app.post('/simulate/scenario', (req, res) => {
  res.json({
    status: 'success',
    csv: "account_id,amount,bank,country,timestamp\nMULE_1,50000,BankX,UK,2026-02-15T10:00:00Z\nMULE_2,49000,BankY,Switzerland,2026-02-15T11:00:00Z\nRING_A,120000,BankZ,Panama,2026-02-15T12:00:00Z"
  });
});

// 6. API - Catalog
app.get('/catalog/datasets', (req, res) => {
  res.json(datasets);
});

// 7. API - Audit & Policy
app.get('/audit/:tenantId', (req, res) => {
  res.json(auditLedger.filter(l => l.tenant === req.params.tenantId));
});

app.post('/reports/schedule', (req, res) => {
    res.json({ status: 'ACTIVE', scheduleId: 'SCHED_' + crypto.randomBytes(4).toString('hex') });
});

// 8. Server Start
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`\x1b[32m✔ Kubera Unified Mock Platform running at http://localhost:${PORT}\x1b[0m`);
});

// 9. WebSocket - Collaboration
const wss = new WebSocketServer({ server, path: '/ws/annotations' });
wss.on('connection', (ws) => {
  console.log('WS: Analyst connected to collab channel');
  ws.on('message', (data) => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === 1) client.send(data.toString());
    });
  });
});

// 10. SSE - Real-time Graph Ingestion
app.get('/sse/graph-events', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    
    const interval = setInterval(() => {
        const event = {
            type: 'INGEST_SUCCESS',
            tenant: 'TENANT_GOLD',
            data: { id: `TX_${Math.floor(Math.random()*1000)}`, source: 'KAFKA', risk: Math.random() }
        };
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    }, 5000);

    req.on('close', () => clearInterval(interval));
});
