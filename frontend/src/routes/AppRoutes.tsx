import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import LoginPage from '@/pages/LoginPage';
import LogoutPage from '@/pages/LogoutPage';
import MFAChallengePage from '@/pages/MFAChallengePage';
import DashboardPage from '@/pages/DashboardPage';
import TransactionDetailPage from '@/pages/TransactionDetailPage';
import AdminPage from '@/pages/AdminPage';
import TenantPage from '@/pages/TenantPage';
import TenantDetailPage from '@/pages/TenantDetailPage';
import AuditPage from '@/pages/AuditPage';
import SimulationPage from '@/pages/SimulationPage';
import NotFound from '@/pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/mfa" element={<MFAChallengePage />} />
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions/:id" element={<TransactionDetailPage />} />
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPage /></ProtectedRoute>} />
        <Route path="/tenants" element={<TenantPage />} />
        <Route path="/tenants/:id" element={<TenantDetailPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/simulation" element={<SimulationPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
