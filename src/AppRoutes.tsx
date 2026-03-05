import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const DashboardOverview = lazy(() => import('./components/DashboardOverview'));
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'));
const RecipientsPage = lazy(() => import('./pages/RecipientsPage'));
const CardsPage = lazy(() => import('./pages/CardsPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const SecuritySettingsPage = lazy(() => import('./pages/SecuritySettingsPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const AICoachPage = lazy(() => import('./pages/AICoachPage'));
const AutomationRulesPage = lazy(() => import('./pages/AutomationRulesPage'));
const PersonalizationHubPage = lazy(() => import('./pages/PersonalizationHubPage'));
const AdvancedAnalyticsPage = lazy(() => import('./pages/AdvancedAnalyticsPage'));
const SocialBankingPage = lazy(() => import('./pages/SocialBankingPage'));
const CollaborativeFinancePage = lazy(() => import('./pages/CollaborativeFinancePage'));
const EducationHubPage = lazy(() => import('./pages/EducationHubPage'));
const GamificationPage = lazy(() => import('./pages/GamificationPage'));
const CryptoAssetsPage = lazy(() => import('./pages/CryptoAssetsPage'));
const PreciousMetalsPage = lazy(() => import('./pages/PreciousMetalsPage'));
const ESGInvestingPage = lazy(() => import('./pages/ESGInvestingPage'));
const RealEstatePage = lazy(() => import('./pages/RealEstatePage'));
const QuantumCorePage = lazy(() => import('./pages/QuantumCorePage'));
const BiometricSecurityPage = lazy(() => import('./pages/BiometricSecurityPage'));
const PrivacyShieldPage = lazy(() => import('./pages/PrivacyShieldPage'));
const HardwareSecurityPage = lazy(() => import('./pages/HardwareSecurityPage'));
const ComplianceSuitePage = lazy(() => import('./pages/ComplianceSuitePage'));
const EmergencyCrisisPage = lazy(() => import('./pages/EmergencyCrisisPage'));
const GovernancePolicyPage = lazy(() => import('./pages/GovernancePolicyPage'));
const OpenBankingPage = lazy(() => import('./pages/OpenBankingPage'));
const InvestmentWealthPage = lazy(() => import('./pages/InvestmentWealthPage'));
const CreditLoanPage = lazy(() => import('./pages/CreditLoanPage'));
const InsuranceHubPage = lazy(() => import('./pages/InsuranceHubPage'));
const TravelLifestylePage = lazy(() => import('./pages/TravelLifestylePage'));
const WellnessFinancePage = lazy(() => import('./pages/WellnessFinancePage'));
const MetaverseBankingPage = lazy(() => import('./pages/MetaverseBankingPage'));
const SpaceEconomyPage = lazy(() => import('./pages/SpaceEconomyPage'));
const NaturalResourcesPage = lazy(() => import('./pages/NaturalResourcesPage'));
const IPDigitalRightsPage = lazy(() => import('./pages/IPDigitalRightsPage'));
const BCIFinancePage = lazy(() => import('./pages/BCIFinancePage'));
const MerchantHubPage = lazy(() => import('./pages/MerchantHubPage'));
const DeveloperConsolePage = lazy(() => import('./pages/DeveloperConsolePage'));
const BusinessAnalyticsPage = lazy(() => import('./pages/BusinessAnalyticsPage'));
const IdentityProtectionPage = lazy(() => import('./pages/IdentityProtectionPage'));
const LegacyPlanningPage = lazy(() => import('./pages/LegacyPlanningPage'));
const QuantumSafeSecurityPage = lazy(() => import('./pages/QuantumSafeSecurityPage'));
const NeuralInterfaceBankingPage = lazy(() => import('./pages/NeuralInterfaceBankingPage'));
const HolographicFinancialVisualizationPage = lazy(() => import('./pages/HolographicFinancialVisualizationPage'));
const PredictiveLifeEventPlanningPage = lazy(() => import('./pages/PredictiveLifeEventPlanningPage'));


const PageLoader = () => (
  <div className="h-full w-full flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse italic">Connecting to Hub...</p>
    </div>
  </div>
);

export const AppRoutes = ({ onTrackTransaction }: { onTrackTransaction: (id: string) => void }) => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<DashboardOverview onTrackTransaction={onTrackTransaction} />} />
      <Route path="transactions" element={<TransactionsPage />} />
      <Route path="recipients" element={<RecipientsPage />} />
      <Route path="cards" element={<CardsPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="settings" element={<SecuritySettingsPage />} />
      <Route path="support" element={<SupportPage />} />
      <Route path="ai-coach" element={<AICoachPage />} />
      <Route path="automation" element={<AutomationRulesPage />} />
      <Route path="personalize" element={<PersonalizationHubPage />} />
      <Route path="advanced-analytics" element={<AdvancedAnalyticsPage />} />
      <Route path="social" element={<SocialBankingPage />} />
      <Route path="collaborative" element={<CollaborativeFinancePage />} />
      <Route path="academy" element={<EducationHubPage />} />
      <Route path="rewards" element={<GamificationPage />} />
      <Route path="crypto" element={<CryptoAssetsPage />} />
      <Route path="metals" element={<PreciousMetalsPage />} />
      <Route path="esg" element={<ESGInvestingPage />} />
      <Route path="real-estate" element={<RealEstatePage />} />
      <Route path="quantum" element={<QuantumCorePage />} />
      <Route path="biometric" element={<BiometricSecurityPage />} />
      <Route path="privacy-shield" element={<PrivacyShieldPage />} />
      <Route path="hardware-security" element={<HardwareSecurityPage />} />
      <Route path="compliance" element={<ComplianceSuitePage />} />
      <Route path="emergency" element={<EmergencyCrisisPage />} />
      <Route path="governance" element={<GovernancePolicyPage />} />
      <Route path="open-banking" element={<OpenBankingPage />} />
      <Route path="investment-wealth" element={<InvestmentWealthPage />} />
      <Route path="credit-loan" element={<CreditLoanPage />} />
      <Route path="insurance-hub" element={<InsuranceHubPage />} />
      <Route path="travel-lifestyle" element={<TravelLifestylePage />} />
      <Route path="wellness-finance" element={<WellnessFinancePage />} />
      <Route path="metaverse-banking" element={<MetaverseBankingPage />} />
      <Route path="space-economy" element={<SpaceEconomyPage />} />
      <Route path="natural-resources" element={<NaturalResourcesPage />} />
      <Route path="ip-digital-rights" element={<IPDigitalRightsPage />} />
      <Route path="bci-finance" element={<BCIFinancePage />} />
      <Route path="merchant-hub" element={<MerchantHubPage />} />
      <Route path="dev-console" element={<DeveloperConsolePage />} />
      <Route path="business-analytics" element={<BusinessAnalyticsPage />} />
      <Route path="identity-protection" element={<IdentityProtectionPage />} />
      <Route path="legacy-planning" element={<LegacyPlanningPage />} />
        <Route path="quantum-safe-security" element={<QuantumSafeSecurityPage />} />
        <Route path="neural-interface-banking" element={<NeuralInterfaceBankingPage />} />
        <Route path="holographic-financial-visualization" element={<HolographicFinancialVisualizationPage />} />
        <Route path="predictive-life-event-planning" element={<PredictiveLifeEventPlanningPage />} />
    </Routes>
  </Suspense>
);
