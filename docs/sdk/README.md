# Kubera SDK Integration Guide

Empower your financial applications with deep traceability using the **Kubera SDK**.

## JavaScript SDK (Frontend)

Ideal for internal investigator portals and real-time dashboards.

```javascript
import KuberaSDK from './sdk/kubera-sdk';

const kubera = new KuberaSDK({ 
  tenantId: 'MY_INSTITUTION_ID' 
});

// Trace a transaction
const path = await kubera.traceTx('TX_12345');

// Subscribe to Live Graph Events
const subscription = kubera.subscribeGraphEvents((event) => {
  console.log('New Node Ingested:', event.data.id);
});
```

## Python SDK (Backend)

Ideal for batch ingestion pipelines and core-banking event listeners.

```python
from kubera_sdk import KuberaClient

client = KuberaClient(
    base_url="https://api.kubera-trace.io",
    tenant_id="CORP_BANK_01"
)

# Ingest a payment from your core engine
client.ingest_record({
    "id": "PAY_998",
    "amount": 50000,
    "currency": "EUR",
    "source": "SWIFT-GPI"
})
```

## Best Practices
1. **Tenant Isolation**: Always provide a valid `tenant_id` to ensure data affinity.
2. **Error Handling**: The SDK handles 429 (Rate Limits) automatically with backoff.
3. **Caching**: Risk scores are cached with a 15-minute TTL.
