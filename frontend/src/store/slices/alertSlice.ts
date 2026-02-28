import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Alert } from '@/types';
import type { RootState } from '@/store';

interface AlertState {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
}

const initialState: AlertState = {
  alerts: [],
  loading: false,
  error: null,
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlerts(state, action: PayloadAction<Alert[]>) {
      state.alerts = action.payload;
    },
    addAlert(state, action: PayloadAction<Alert>) {
      state.alerts.unshift(action.payload);
      if (state.alerts.length > 100) state.alerts.pop();
    },
    acknowledgeAlert(state, action: PayloadAction<string>) {
      const alert = state.alerts.find(a => a.id === action.payload);
      if (alert) alert.acknowledged = true;
    },
  },
});

export const { setAlerts, addAlert, acknowledgeAlert } = alertSlice.actions;
export const selectAlerts = (state: RootState) => state.alerts.alerts;
export default alertSlice.reducer;
