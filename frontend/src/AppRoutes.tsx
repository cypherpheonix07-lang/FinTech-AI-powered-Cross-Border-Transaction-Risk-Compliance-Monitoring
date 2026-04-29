import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const AegisCommandCenter = lazy(() => import('./pages/AegisCommandCenter'));
const NeuralCommandPage = lazy(() => import('./pages/NeuralCommandPage'));
const QuantumDimensionPage = lazy(() => import('./pages/QuantumDimensionPage'));
const PlanetarySystemsPage = lazy(() => import('./pages/PlanetarySystemsPage'));
const ExoticParadigmsPage = lazy(() => import('./pages/ExoticParadigmsPage'));
const AIOrchestrationPage = lazy(() => import('./pages/AIOrchestrationPage'));
const GovernanceCompliancePage = lazy(() => import('./pages/GovernanceCompliancePage'));
const EcosystemIntegrationPage = lazy(() => import('./pages/EcosystemIntegrationPage'));
const VisualizationPage = lazy(() => import('./pages/VisualizationPage'));
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
const MerchantHubPage = lazy(() => import('./pages/MerchantHubPage'));
const DeveloperConsolePage = lazy(() => import('./pages/DeveloperConsolePage'));
const BusinessAnalyticsPage = lazy(() => import('./pages/BusinessAnalyticsPage'));
const IdentityProtectionPage = lazy(() => import('./pages/IdentityProtectionPage'));
const LegacyPlanningPage = lazy(() => import('./pages/LegacyPlanningPage'));
const QuantumSafeSecurityPage = lazy(() => import('./pages/QuantumSafeSecurityPage'));
const NeuralInterfaceBankingPage = lazy(() => import('./pages/NeuralInterfaceBankingPage'));
const HolographicFinancialAdvisorPage = lazy(() => import('./pages/HolographicFinancialAdvisorPage'));
const BioFinanceHealthVaultPage = lazy(() => import('./pages/BioFinanceHealthVaultPage'));
const IdentityReputationPage = lazy(() => import('./pages/IdentityReputationPage'));
const PredictionMarketsPage = lazy(() => import('./pages/PredictionMarketsPage'));
const SyntheticAssetsPage = lazy(() => import('./pages/SyntheticAssetsPage'));
const StructuredProductsPage = lazy(() => import('./pages/StructuredProductsPage'));
const RiskParityPage = lazy(() => import('./pages/RiskParityPage'));
const InsuranceLinkedSecuritiesPage = lazy(() => import('./pages/InsuranceLinkedSecuritiesPage'));
const PrivateMarketsPage = lazy(() => import('./pages/PrivateMarketsPage'));
const RealAssetsInfrastructurePage = lazy(() => import('./pages/RealAssetsInfrastructurePage'));
const CommoditiesResourcesPage = lazy(() => import('./pages/CommoditiesResourcesPage'));
const FXCurrenciesPage = lazy(() => import('./pages/FXCurrenciesPage'));
const TokenizationRWAPage = lazy(() => import('./pages/TokenizationRWAPage'));
const CBDCIntegrationPage = lazy(() => import('./pages/CBDCIntegrationPage'));
const StablecoinYieldPage = lazy(() => import('./pages/StablecoinYieldPage'));
const AlgorithmicStablecoinPage = lazy(() => import('./pages/AlgorithmicStablecoinPage'));
const CrossChainInteroperabilityPage = lazy(() => import('./pages/CrossChainInteroperabilityPage'));
const Layer2ScalingPage = lazy(() => import('./pages/Layer2ScalingPage'));
const LightningNetworkPage = lazy(() => import('./pages/LightningNetworkPage'));
const PrivacyCoinsPage = lazy(() => import('./pages/PrivacyCoinsPage'));
const SSIManagementPage = lazy(() => import('./pages/SSIManagementPage'));
const VerifiableCredentialsPage = lazy(() => import('./pages/VerifiableCredentialsPage'));
const DIDResolutionPage = lazy(() => import('./pages/DIDResolutionPage'));
const BiometricCryptosystemsPage = lazy(() => import('./pages/BiometricCryptosystemsPage'));
const MPCWalletsPage = lazy(() => import('./pages/MPCWalletsPage'));
const ThresholdSignaturesPage = lazy(() => import('./pages/ThresholdSignaturesPage'));
const QKDNetworksPage = lazy(() => import('./pages/QKDNetworksPage'));
const TransparencyCorePortal = lazy(() => import('./pages/TransparencyCorePortal'));
const GovernanceOwnershipVault = lazy(() => import('./pages/GovernanceOwnershipVault'));
const SpaceEconomyDashboard = lazy(() => import('./pages/SpaceEconomyDashboard'));
const AtmosphericFinanceTerminal = lazy(() => import('./pages/AtmosphericFinanceTerminal'));
const MultiverseArbitrageDashboard = lazy(() => import('./pages/MultiverseArbitrageDashboard'));
const AGIAlignmentTerminal = lazy(() => import('./pages/AGIAlignmentTerminal'));
const LedgerForensics = lazy(() => import('./pages/LedgerForensics'));
const SocialBankingDashboard = lazy(() => import('./pages/SocialBankingDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[#020202]">
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-600/20 rounded-full" />
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
        </div>
      </div>
      <p className="text-xs font-black text-blue-500 uppercase tracking-[0.5em] animate-pulse italic">Initializing Nexus...</p>
    </div>
  </div>
);

export const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route index element={<AegisCommandCenter />} />
      <Route path="dashboard" element={<AegisCommandCenter />} />
      
      {/* Core Banking & Assets */}
      <Route path="transactions" element={<TransactionsPage />} />
      <Route path="recipients" element={<RecipientsPage />} />
      <Route path="cards" element={<CardsPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="settings" element={<SecuritySettingsPage />} />
      <Route path="support" element={<SupportPage />} />
      <Route path="crypto" element={<CryptoAssetsPage />} />
      <Route path="metals" element={<PreciousMetalsPage />} />
      <Route path="real-estate" element={<RealEstatePage />} />
      <Route path="real-assets" element={<RealAssetsInfrastructurePage />} />
      
      {/* AI & Automation */}
      <Route path="ai-orchestration" element={<AIOrchestrationPage />} />
      <Route path="ai-coach" element={<AICoachPage />} />
      <Route path="automation" element={<AutomationRulesPage />} />
      <Route path="personalize" element={<PersonalizationHubPage />} />
      <Route path="advanced-analytics" element={<AdvancedAnalyticsPage />} />
      
      {/* Social & Governance */}
      <Route path="social" element={<SocialBankingPage />} />
      <Route path="collaborative" element={<CollaborativeFinancePage />} />
      <Route path="governance" element={<GovernancePolicyPage />} />
      <Route path="governance-compliance" element={<GovernanceCompliancePage />} />
      <Route path="governance-vault" element={<GovernanceOwnershipVault />} />
      
      {/* Quantum & Security */}
      <Route path="quantum" element={<QuantumCorePage />} />
      <Route path="quantum-safe-security" element={<QuantumSafeSecurityPage />} />
      <Route path="qkd-networks" element={<QKDNetworksPage />} />
      <Route path="pq-crypto" element={<QuantumSafeSecurityPage />} />
      <Route path="biometric" element={<BiometricSecurityPage />} />
      <Route path="privacy-shield" element={<PrivacyShieldPage />} />
      <Route path="hardware-security" element={<HardwareSecurityPage />} />
      <Route path="compliance" element={<ComplianceSuitePage />} />
      <Route path="emergency" element={<EmergencyCrisisPage />} />
      
      {/* Frontiers & Exotic */}
      <Route path="space-economy" element={<SpaceEconomyPage />} />
      <Route path="space-frontier" element={<SpaceEconomyDashboard />} />
      <Route path="metaverse-banking" element={<MetaverseBankingPage />} />
      <Route path="multiverse-arbitrage" element={<MultiverseArbitrageDashboard />} />
      <Route path="agi-terminal" element={<AGIAlignmentTerminal />} />
      <Route path="natural-resources" element={<NaturalResourcesPage />} />
      <Route path="ip-digital-rights" element={<IPDigitalRightsPage />} />
      
      {/* Neural & Bio */}
      <Route path="neural-interface-banking" element={<NeuralInterfaceBankingPage />} />
      <Route path="bci-finance" element={<BCIFinancePage />} />
      <Route path="bio-finance-vault" element={<BioFinanceHealthVaultPage />} />
      <Route path="holographic-advisor" element={<HolographicFinancialAdvisorPage />} />
      
      {/* Advanced Finance */}
      <Route path="tokenization-rwa" element={<TokenizationRWAPage />} />
      <Route path="cbdc-integration" element={<CBDCIntegrationPage />} />
      <Route path="stablecoin-yield" element={<StablecoinYieldPage />} />
      <Route path="cross-chain-interoperability" element={<CrossChainInteroperabilityPage />} />
      <Route path="layer2-scaling" element={<Layer2ScalingPage />} />
      <Route path="privacy-coins" element={<PrivacyCoinsPage />} />
      
      {/* Identity & Reputation */}
      <Route path="identity-protection" element={<IdentityProtectionPage />} />
      <Route path="identity-reputation" element={<IdentityReputationPage />} />
      <Route path="ssi-management" element={<SSIManagementPage />} />
      <Route path="verifiable-credentials" element={<VerifiableCredentialsPage />} />
      <Route path="did-resolution" element={<DIDResolutionPage />} />
      
      {/* Misc */}
      <Route path="dev-console" element={<DeveloperConsolePage />} />
      <Route path="merchant-hub" element={<MerchantHubPage />} />
      <Route path="academy" element={<EducationHubPage />} />
      <Route path="rewards" element={<GamificationPage />} />
      <Route path="ledger-forensics" element={<LedgerForensics />} />
      
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);
