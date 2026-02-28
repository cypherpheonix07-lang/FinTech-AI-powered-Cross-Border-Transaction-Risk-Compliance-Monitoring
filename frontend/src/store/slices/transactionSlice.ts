import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Transaction } from '@/types';
import { transactionApi } from '@/services/api';
import type { RootState } from '@/store';

interface TransactionState {
  items: Transaction[];
  selected: Transaction | null;
  total: number;
  page: number;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  items: [],
  selected: null,
  total: 0,
  page: 1,
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk('transactions/fetch', async ({ tenantId, page }: { tenantId?: string; page?: number }) => {
  return transactionApi.getTransactions(tenantId, page);
});

export const fetchTransaction = createAsyncThunk('transactions/fetchOne', async (id: string) => {
  return transactionApi.getTransaction(id);
});

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addRealtimeTransaction(state, action) {
      state.items.unshift(action.payload);
      if (state.items.length > 50) state.items.pop();
      state.total += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => { state.loading = true; })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchTransactions.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed'; })
      .addCase(fetchTransaction.pending, (state) => { state.loading = true; })
      .addCase(fetchTransaction.fulfilled, (state, action) => { state.loading = false; state.selected = action.payload; })
      .addCase(fetchTransaction.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed'; });
  },
});

export const { addRealtimeTransaction } = transactionSlice.actions;
export const selectTransactions = (state: RootState) => state.transactions;
export default transactionSlice.reducer;
