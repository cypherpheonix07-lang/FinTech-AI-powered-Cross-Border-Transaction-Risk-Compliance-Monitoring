import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AuthGate from '../components/layout/AuthGate';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const UploadPage = lazy(() => import('../pages/UploadPage'));
const GraphExplorer = lazy(() => import('../pages/GraphExplorer'));
const TraceAnalysis = lazy(() => import('../pages/TraceAnalysis'));
const RiskAnalytics = lazy(() => import('../pages/RiskAnalytics'));
const Auth = lazy(() => import('../pages/Auth'));
const Cases = lazy(() => import('../pages/Cases'));
const ExplainDetail = lazy(() => import('../pages/ExplainDetail'));
const ScenarioBuilder = lazy(() => import('../pages/ScenarioBuilder'));

// Phase 3: Enterprise Evolution
const InvestigatorWorkspace = lazy(() => import('../pages/InvestigatorWorkspace'));
const ScenarioCatalog = lazy(() => import('../pages/ScenarioCatalog'));
const TenantAdmin = lazy(() => import('../pages/TenantAdmin'));
const BillingAdmin = lazy(() => import('../pages/BillingAdmin'));

// Phase 4: Advanced Ecosystem
const ExecutiveDashboard = lazy(() => import('../pages/ExecutiveDashboard'));
const DataCatalog = lazy(() => import('../pages/DataCatalog'));
const Marketplace = lazy(() => import('../pages/Marketplace'));
const PolicySimulator = lazy(() => import('../pages/PolicySimulator'));
const ForensicsPortal = lazy(() => import('../pages/ForensicsPortal'));

// Privacy & Compliance
const ConsentAdmin = lazy(() => import('../pages/ConsentAdmin'));
const SARForm = lazy(() => import('../components/privacy/SARForm'));


const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full text-slate-400">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary mr-3"></div>
    Loading...
  </div>
);

const AppRouter = () => {
  return (
    <Routes>
      <Route 
        path="/auth" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Auth />
          </Suspense>
        } 
      />
      
      <Route element={<AuthGate />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route 
            path="dashboard" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Dashboard />
              </Suspense>
            } 
          />
          <Route 
            path="upload" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <UploadPage />
              </Suspense>
            } 
          />
          <Route 
            path="explorer" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <GraphExplorer />
              </Suspense>
            } 
          />
          <Route 
            path="trace" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <TraceAnalysis />
              </Suspense>
            } 
          />
          <Route 
            path="risk" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <RiskAnalytics />
              </Suspense>
            } 
          />
          <Route 
            path="cases" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Cases />
              </Suspense>
            } 
          />
          <Route 
            path="explain/:txId" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ExplainDetail />
              </Suspense>
            } 
          />
          <Route 
            path="scenario" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ScenarioBuilder />
              </Suspense>
            } 
          />
          <Route 
            path="workspace" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <InvestigatorWorkspace />
              </Suspense>
            } 
          />
          <Route 
            path="scenarios" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ScenarioCatalog />
              </Suspense>
            } 
          />
          <Route 
            path="admin/tenants" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <TenantAdmin />
              </Suspense>
            } 
          />
          <Route 
            path="admin/billing" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <BillingAdmin />
              </Suspense>
            } 
          />
          <Route 
            path="executive" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ExecutiveDashboard />
              </Suspense>
            } 
          />
          <Route 
            path="catalog" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <DataCatalog />
              </Suspense>
            } 
          />
          <Route 
            path="marketplace" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Marketplace />
              </Suspense>
            } 
          />
          <Route 
            path="policy-simulator" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <PolicySimulator />
              </Suspense>
            } 
          />
          <Route 
            path="forensics" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ForensicsPortal />
              </Suspense>
            } 
          />
          <Route 
            path="privacy/consent" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ConsentAdmin />
              </Suspense>
            } 
          />
          <Route 
            path="privacy/sar" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <SARForm />
              </Suspense>
            } 
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
