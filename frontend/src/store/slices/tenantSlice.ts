import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Tenant } from '@/types';
import { tenantApi } from '@/services/api';
import type { RootState } from '@/store';

interface TenantState {
  tenants: Tenant[];
  activeTenantId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TenantState = { tenants: [], activeTenantId: null, loading: false, error: null };

export const fetchTenants = createAsyncThunk('tenants/fetch', async () => tenantApi.getTenants());

const tenantSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {
    setActiveTenant(state, action: PayloadAction<string>) {
      state.activeTenantId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenants.pending, (state) => { state.loading = true; })
      .addCase(fetchTenants.fulfilled, (state, action) => { state.loading = false; state.tenants = action.payload; if (!state.activeTenantId && action.payload.length) state.activeTenantId = action.payload[0].id; })
      .addCase(fetchTenants.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed'; });
  },
});

export const { setActiveTenant } = tenantSlice.actions;
export const selectTenants = (state: RootState) => state.tenants;
export const selectActiveTenant = (state: RootState) => state.tenants.tenants.find(t => t.id === state.tenants.activeTenantId);
export default tenantSlice.reducer;
