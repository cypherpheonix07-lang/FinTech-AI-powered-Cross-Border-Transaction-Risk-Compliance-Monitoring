import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../../app/store';

/**
 * AuthGate.jsx
 * Protects routes and redirects unauthenticated users to the login page.
 */
const AuthGate = () => {
  const isAuthenticated = useStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default AuthGate;
