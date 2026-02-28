/**
 * scripts/mock-server.js
 * A dedicated mock server for Kubera Trace frontend validation.
 * Supports: SSE (realtime graph), clustering endpoints, and export triggers.
 */

import http from 'http';

const PORT = 8000;

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Realtime SSE Endpoint
  if (req.url === '/sse/graph') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    console.log('SSE: Client connected');

    // Send initial test event
    const sendEvent = (type, payload) => {
      res.write(`data: ${JSON.stringify({ type, payload })}\n\n`);
    };

    // Periodic mock events
    const interval = setInterval(() => {
      const isNode = Math.random() > 0.5;
      if (isNode) {
        sendEvent('node_created', {
          id: `ACC_${Math.floor(Math.random() * 90000)}`,
          bank: 'Mock Central',
          country: 'Germany',
          risk: Math.random()
        });
      } else {
        sendEvent('edge_created', {
          from: 'ACC_1',
          to: 'ACC_2',
          tx_id: `TX_${Math.floor(Math.random() * 90000)}`,
          amount: Math.floor(Math.random() * 50000)
        });
      }
    }, 10000);

    req.on('close', () => {
      clearInterval(interval);
      console.log('SSE: Client disconnected');
    });
    return;
  }

  // Clustering Endpoint
  if (req.url.startsWith('/graph/cluster')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      clusters: [
        { id: 'cluster:bank:HSBC', size: 12, risk: 0.2 },
        { id: 'cluster:country:Russia', size: 8, risk: 0.8 }
      ]
    }));
    return;
  }

  // Export Endpoint
  if (req.url.startsWith('/export/path')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ downloadUrl: '/mock/download/report.pdf' }));
    return;
  }

  // Default Ingest
  if (req.url === '/ingest/csv' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      total_records: 1540,
      unique_accounts: 842,
      time_elapsed: "0.8s"
    }));
    return;
  }

  // Default Fallback
  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Kubera Mock Intelligence Server running at http://localhost:${PORT}`);
});
