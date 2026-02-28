import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

interface UiState {
  sidebarCollapsed: boolean;
  notifications: Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; message: string }>;
}

const initialState: UiState = { sidebarCollapsed: false, notifications: [] };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) { state.sidebarCollapsed = !state.sidebarCollapsed; },
    addNotification(state, action: PayloadAction<UiState['notifications'][0]>) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const { toggleSidebar, addNotification, removeNotification } = uiSlice.actions;
export const selectUi = (state: RootState) => state.ui;
export default uiSlice.reducer;
