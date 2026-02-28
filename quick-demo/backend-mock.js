// backend-mock.js
const express = require('express');
const axios = require('axios');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let transactions = []; // in-memory
const ML_URL = process.env.ML_URL || 'http://localhost:8000/api/fraud/check';

app.post('/api/transactions', async (req, res) => {
  const payload = req.body;
  payload.transaction_id = payload.transaction_id || `tx_${Date.now()}`;
  transactions.unshift({ id: payload.transaction_id, payload, status: 'pending' });

  // call ML mock
  try {
    const mlResp = await axios.post(ML_URL, payload, { timeout: 5000 });
    const risk = mlResp.data.data;
    const tx = { id: payload.transaction_id, payload, risk, createdAt: new Date().toISOString() };
    transactions[0] = tx;
    // emit to all connected clients (tenant/subscribers could be implemented)
    io.emit('transaction-created', tx);
    if (risk.final_risk_score >= 71) {
      io.emit('risk-alert', { transaction: tx });
    }
    res.json({ success: true, data: tx });
  } catch (err) {
    // fallback: return conservative heuristic
    const fallback = {
      transaction_id: payload.transaction_id,
      anomaly_score: 0.05,
      supervised_prob: 0.02,
      final_risk_score: 5,
      risk_level: "LOW",
      graph_flag: false
    };
    transactions[0] = { id: payload.transaction_id, payload, risk: fallback, createdAt: new Date().toISOString() };
    io.emit('transaction-created', transactions[0]);
    res.json({ success: true, data: transactions[0], fallback: true });
  }
});

app.get('/api/transactions', (_req, res) => {
  res.json({ success: true, data: transactions.slice(0, 50) });
});

app.get('/api/health', (_req, res) => res.json({ success: true, data: { status: 'ok', mode: 'mock-backend' } }));

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('subscribe', (payload) => {
    console.log('subscribe', payload);
    // in production join rooms
  });
});

const port = process.env.BACKEND_PORT || 4000;
server.listen(port, () => {
  console.log(`Mock backend listening on ${port}`);
});
