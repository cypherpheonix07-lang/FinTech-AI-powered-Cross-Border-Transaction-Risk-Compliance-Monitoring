import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import transactionReducer from './slices/transactionSlice';
import riskReducer from './slices/riskSlice';
import tenantReducer from './slices/tenantSlice';
import auditReducer from './slices/auditSlice';
import simulationReducer from './slices/simulationSlice';
import alertReducer from './slices/alertSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    risk: riskReducer,
    tenants: tenantReducer,
    audit: auditReducer,
    simulation: simulationReducer,
    alerts: alertReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
