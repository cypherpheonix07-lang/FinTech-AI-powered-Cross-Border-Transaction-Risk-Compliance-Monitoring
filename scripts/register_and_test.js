// scripts/register_and_test.js
// Usage: node scripts/register_and_test.js
// It will: register admin (idempotent), login, create a transaction, start simulation, list transactions.
const axios = require("axios");
const fs = require("fs");

const BACKEND = process.env.BACKEND_URL || "http://localhost:4000";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin_demo@demo.com";
const ADMIN_PWD = process.env.ADMIN_PWD || "Passw0rd!";
const TENANT_NAME = process.env.TENANT_NAME || "DemoCorpAuto";

const client = axios.create({
  baseURL: BACKEND,
  headers: { "Content-Type": "application/json" },
  timeout: 20000
});

async function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function register() {
  try {
    const resp = await client.post("/api/auth/register", { tenantName: TENANT_NAME, email: ADMIN_EMAIL, password: ADMIN_PWD });
    console.log("Registered:", resp.data?.data?.user?.email || resp.data);
    return resp.data.data.tokens.access;
  } catch (e) {
    // if exists, try login
    console.log("Register failed (maybe exists). Trying login...");
    return null;
  }
}

async function login() {
  const resp = await client.post("/api/auth/login", { email: ADMIN_EMAIL, password: ADMIN_PWD });
  return resp.data.data.tokens.access;
}

async function createTransaction(token, amount = 50000) {
  const c = axios.create({ baseURL: BACKEND, headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }});
  const payload = {
    accountId: `acct_auto_${Date.now()}`,
    senderCountry: "IN",
    receiverCountry: "US",
    amount: amount,
    currency: "USD",
    identifier: `phone_auto_${Math.floor(Math.random()*100000)}`,
    frequency_per_hour: 1
  };
  const resp = await c.post("/api/transactions", payload);
  console.log("Create tx response:", resp.status, resp.data?.data?.risk?.finalRiskScore || resp.data);
  return resp.data;
}

async function startSimulation(token) {
  const c = axios.create({ baseURL: BACKEND, headers: { Authorization: "Bearer " + token }});
  const resp = await c.post("/api/simulation/start", { ratePerSecond: 3, durationSec: 30, mode: "suspicious" });
  console.log("Started simulation:", resp.data);
}

async function listTransactions(token) {
  const c = axios.create({ baseURL: BACKEND, headers: { Authorization: "Bearer " + token }});
  const resp = await c.get("/api/transactions?page=1&perPage=10");
  console.log("Recent transactions:", (resp.data.data.items || []).slice(0,5).map(t=> ({ id: t.id, amount: t.amount })));
}

(async () => {
  try {
    let token = await register();
    if (!token) {
      // try login
      try {
        token = await login();
      } catch(e) {
         console.error("Login failed:", e.message);
         // If login fails, maybe wait a bit and retry?
      }
    }
    if (!token) {
      console.error("Could not register or login; aborting.");
      process.exit(1);
    }
    console.log("Using access token (first 20 chars):", token.slice(0,20));
    await createTransaction(token, 90000);
    await wait(1500);
    await startSimulation(token);
    await wait(3000);
    await listTransactions(token);
    console.log("Basic automated tests finished. Check dashboard for live events.");
  } catch (err) {
    console.error("Automated test failed:", err.response ? err.response.data : err.message || err);
    process.exit(1);
  }
})();
