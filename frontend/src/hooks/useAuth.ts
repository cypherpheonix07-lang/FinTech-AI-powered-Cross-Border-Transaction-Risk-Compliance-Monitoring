import { useAppSelector, useAppDispatch } from '@/store';
import { selectAuth, loginThunk, logout, clearError } from '@/store/slices/authSlice';
import { useCallback } from 'react';

export function useAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const login = useCallback((email: string, password: string) => {
    return dispatch(loginThunk({ email, password })).unwrap();
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    ...auth,
    login,
    logout: handleLogout,
    clearError: handleClearError,
  };
}
