import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RiskSummary, CorridorRisk } from '@/types';
import { riskApi } from '@/services/api';
import type { RootState } from '@/store';

interface RiskState {
  summary: RiskSummary | null;
  corridors: CorridorRisk[];
  loading: boolean;
  error: string | null;
}

const initialState: RiskState = { summary: null, corridors: [], loading: false, error: null };

export const fetchRiskSummary = createAsyncThunk('risk/fetchSummary', async (tenantId?: string) => riskApi.getRiskSummary(tenantId));
export const fetchCorridorRisks = createAsyncThunk('risk/fetchCorridors', async () => riskApi.getCorridorRisks());

const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiskSummary.pending, (state) => { state.loading = true; })
      .addCase(fetchRiskSummary.fulfilled, (state, action) => { state.loading = false; state.summary = action.payload; })
      .addCase(fetchRiskSummary.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed'; })
      .addCase(fetchCorridorRisks.fulfilled, (state, action) => { state.corridors = action.payload; });
  },
});

export const selectRisk = (state: RootState) => state.risk;
export default riskSlice.reducer;
