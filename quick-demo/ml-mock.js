// ml-mock.js
const express = require('express');
const app = express();
app.use(express.json());

function scoreTransaction(body) {
  const amt = Number(body.amount || 0);
  // simple deterministic rule + randomness for demo
  const anomaly = amt > 50000 ? 0.9 + Math.random()*0.09 : Math.random()*0.3;
  const supervised = amt > 30000 ? 0.7 + Math.random()*0.2 : Math.random()*0.4;
  const graphFlag = (body.identifier && body.identifier.includes("ring")) ? true : false;
  const raw = Math.min(1, (0.35*(graphFlag?1:0) + 0.35*(anomaly) + 0.3*(supervised)));
  const score = Math.round(raw * 100);
  return {
    transaction_id: body.transaction_id || `tx_demo_${Date.now()}`,
    anomaly_score: Number(anomaly.toFixed(4)),
    supervised_prob: Number(supervised.toFixed(4)),
    final_risk_score: score,
    risk_level: score >= 71 ? "HIGH" : (score >= 31 ? "MEDIUM" : "LOW"),
    graph_flag: graphFlag
  };
}

app.post('/api/fraud/check', (req, res) => {
  const out = scoreTransaction(req.body);
  res.json({ success: true, data: out });
});

app.get('/api/health', (_req, res) => res.json({ success: true, data: { status: 'ok', mode: 'mock-ml' } }));

const port = 8000;
app.listen(port, () => console.log(`Mock ML listening on ${port}`));
