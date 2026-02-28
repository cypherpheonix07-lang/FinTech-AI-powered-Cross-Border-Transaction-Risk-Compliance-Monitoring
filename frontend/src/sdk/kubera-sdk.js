/**
 * KUBERA TRACE — BRIGADE SDK (JavaScript)
 * Assumptions:
 * - VITE_API_BASE environment variable points to the platform gateway.
 * - Current browser session holds valid Auth0 tokens.
 */

class KuberaSDK {
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || import.meta.env.VITE_API_BASE || 'http://localhost:8000';
    this.tenantId = config.tenantId || localStorage.getItem('kubera_tenant_id');
    this.retryLimit = 3;
  }

  /**
   * Internal fetch wrapper with rate-limit handling and retries.
   */
  async _request(endpoint, options = {}) {
    let attempt = 0;
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      'X-Tenant-ID': this.tenantId,
      'X-SDK-Version': 'js-1.0.0',
      ...options.headers
    };

    while (attempt < this.retryLimit) {
      try {
        const response = await fetch(url, { ...options, headers });
        
        // Handle Rate Limiting (429)
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After') || 2;
          console.warn(`[Kubera] Rate limited. Retrying in ${retryAfter}s...`);
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          attempt++;
          continue;
        }

        if (!response.ok) throw new Error(`Kubera API Error: ${response.statusText}`);
        return await response.json();
      } catch (error) {
        attempt++;
        if (attempt === this.retryLimit) throw error;
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  // --- Public Methods ---

  /**
   * Single transaction trace.
   */
  async traceTx(txId) {
    return this._request(`/trace/${txId}`);
  }

  /**
   * Bulk ingestion via CSV blob.
   */
  async ingestCSV(csvData) {
    return this._request('/ingest/bulk', {
      method: 'POST',
      body: JSON.stringify({ data: csvData, format: 'csv' })
    });
  }

  /**
   * Subscribe to real-time graph events (WebSocket Wrapper).
   */
  subscribeGraphEvents(onEvent) {
    const wsUrl = this.baseUrl.replace('http', 'ws') + '/ws/graph-events';
    const ws = new WebSocket(wsUrl);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onEvent(data);
    };

    return {
      unsubscribe: () => ws.close()
    };
  }
}

export default KuberaSDK;
