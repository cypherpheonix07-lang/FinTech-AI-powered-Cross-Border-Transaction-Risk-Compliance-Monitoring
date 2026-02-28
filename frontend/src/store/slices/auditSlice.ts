import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { AuditLog } from '@/types';
import { auditApi } from '@/services/api';
import type { RootState } from '@/store';

interface AuditFilters {
  action: string;
  resource: string;
  startDate: string;
  endDate: string;
}

interface AuditState {
  logs: AuditLog[];
  total: number;
  page: number;
  filters: AuditFilters;
  loading: boolean;
  error: string | null;
}

const initialState: AuditState = {
  logs: [],
  total: 0,
  page: 1,
  filters: { action: '', resource: '', startDate: '', endDate: '' },
  loading: false,
  error: null,
};

export const fetchAuditLogs = createAsyncThunk('audit/fetch', async (_, { getState }) => {
  const { audit } = getState() as RootState;
  return auditApi.getAuditLogs(audit.filters, audit.page);
});

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    setAuditFilters(state, action: PayloadAction<Partial<AuditFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    setAuditPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogs.pending, (state) => { state.loading = true; })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => { state.loading = false; state.logs = action.payload.data; state.total = action.payload.total; })
      .addCase(fetchAuditLogs.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed'; });
  },
});

export const { setAuditFilters, setAuditPage } = auditSlice.actions;
export const selectAudit = (state: RootState) => state.audit;
export default auditSlice.reducer;
