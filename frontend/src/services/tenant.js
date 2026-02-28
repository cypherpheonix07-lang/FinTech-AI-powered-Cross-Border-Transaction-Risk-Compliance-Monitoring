import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const tenantApi = axios.create({ baseURL: API_BASE });

/**
 * TenantService.js
 * Handles multi-tenant lifecycle and header orchestration.
 */
export const tenantService = {
  // Current active tenant ID (stored in localStorage for session persistence)
  getTenantId: () => localStorage.getItem('kubera_tenant_id') || 'TENANT_GOLD',
  
  setTenantId: (id) => localStorage.setItem('kubera_tenant_id', id),

  // Axios interceptor to inject X-Tenant-ID into every request
  injectTenantHeader: (config) => {
    const tid = tenantService.getTenantId();
    if (tid) {
      config.headers['X-Tenant-ID'] = tid;
    }
    return config;
  },

  // Admin Actions
  createTenant: async (data) => {
    const res = await tenantApi.post(`/tenants`, data);
    return res.data;
  },

  getAnalytics: async (tid) => {
    const res = await tenantApi.get(`/metrics/tenant/${tid}`);
    return res.data;
  }
};

// Attach the interceptor so X-Tenant-ID is actually sent with every request
tenantApi.interceptors.request.use(tenantService.injectTenantHeader);

export default tenantService;
