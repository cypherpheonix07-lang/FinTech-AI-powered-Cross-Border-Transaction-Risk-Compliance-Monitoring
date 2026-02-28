import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/types';
import { authApi } from '@/services/api';
import type { RootState } from '@/store';

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
  mfaRequired: false,
  mfaSessionId: null,
};

// Restore user from localStorage
const storedUser = localStorage.getItem('user');
if (storedUser) {
  try { initialState.user = JSON.parse(storedUser); } catch { /* ignore */ }
}

export const loginThunk = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
  const result = await authApi.login(email, password);
  return result;
});

export const refreshTokenThunk = createAsyncThunk('auth/refreshToken', async (_, { getState }) => {
  const { auth } = getState() as RootState;
  const result = await authApi.refreshToken(auth.refreshToken || '');
  return result;
});

export const verifyMfaThunk = createAsyncThunk('auth/verifyMfa', async ({ sessionId, code }: { sessionId: string; code: string }) => {
  return authApi.verifyMfa(sessionId, code);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.mfaRequired = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.mfaRequired) {
          state.mfaRequired = true;
          return;
        }
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAdmin = (state: RootState) => state.auth.user?.role === 'admin';
export default authSlice.reducer;
