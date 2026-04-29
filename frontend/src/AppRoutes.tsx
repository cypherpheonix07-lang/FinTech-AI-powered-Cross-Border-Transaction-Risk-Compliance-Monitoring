import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const DashboardOverview = lazy(() => import('./components/DashboardOverview'));
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'));
const RecipientsPage = lazy(() => import('./pages/RecipientsPage'));
const CardsPage = lazy(() => import('./pages/CardsPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const SecuritySettingsPage = lazy(() => import('./pages/SecuritySettingsPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const AICoachPage = lazy(() => import('./pages/AICoachDashboard'));
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
const SocialBankingDashboardV2 = lazy(() => import('./pages/SocialBankingDashboard'));
// Phase 3 Omega: Advanced Cryptography, Collective Intelligence & Interplanetary (P5)
const ZKProofDashboardPage = lazy(() => import('./pages/QuantumSafeSecurityPage'));
const FHEComputePage = lazy(() => import('./pages/PrivacyShieldPage'));
const SwarmIntelligencePage = lazy(() => import('./pages/AdvancedAnalyticsPage'));
const TEEEnclavePage = lazy(() => import('./pages/HardwareSecurityPage'));
const BehavioralNudgePage = lazy(() => import('./pages/PersonalizationHubPage'));
const EventSourcingPage = lazy(() => import('./pages/LedgerForensics'));
const SemanticSearchPage = lazy(() => import('./pages/AdvancedAnalyticsPage'));
const InterplanetaryBankingPage = lazy(() => import('./pages/SpaceEconomyDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Mapping missing pages to existing components
const RegulatoryCompliancePage = ComplianceSuitePage;
const AnalyticsDashboard = AnalyticsPage;
const InsurancePage = InsuranceHubPage;
const SecurityAuditPage = SecuritySettingsPage;
const HealthcarePage = WellnessFinancePage;


const PageLoader = () => {
  React.useEffect(() => {
    console.log("[AppRoutes] Suspense triggered: Loading view...");
  }, []);
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse italic">Connecting to Hub...</p>
      </div>
    </div>
  );
};

export const AppRoutes = ({ onTrackTransaction }: { onTrackTransaction: (id: string) => void }) => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route index element={<DashboardOverview onTrackTransaction={onTrackTransaction} />} />
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
        <Route path="holographic-advisor" element={<HolographicFinancialAdvisorPage />} />
        <Route path="bio-finance-vault" element={<BioFinanceHealthVaultPage />} />
        {/* Phase 16 Routes */}
        <Route path="identity-reputation" element={<IdentityReputationPage />} />
        <Route path="prediction-markets" element={<PredictionMarketsPage />} />
        <Route path="synthetic-assets" element={<SyntheticAssetsPage />} />
        <Route path="structured-products" element={<StructuredProductsPage />} />
        <Route path="risk-parity" element={<RiskParityPage />} />
        {/* Phase 17 Routes */}
        <Route path="insurance-linked-securities" element={<InsuranceLinkedSecuritiesPage />} />
        <Route path="private-markets" element={<PrivateMarketsPage />} />
        <Route path="real-assets-infrastructure" element={<RealAssetsInfrastructurePage />} />
        <Route path="commodities-resources" element={<CommoditiesResourcesPage />} />
        <Route path="fx-currencies" element={<FXCurrenciesPage />} />
        {/* Phase 18 Routes */}
        <Route path="tokenization-rwa" element={<TokenizationRWAPage />} />
        <Route path="cbdc-integration" element={<CBDCIntegrationPage />} />
        <Route path="stablecoin-yield" element={<StablecoinYieldPage />} />
        <Route path="algorithmic-stablecoin" element={<AlgorithmicStablecoinPage />} />
        <Route path="cross-chain-interoperability" element={<CrossChainInteroperabilityPage />} />
        {/* Phase 19 Routes */}
        <Route path="layer2-scaling" element={<Layer2ScalingPage />} />
        <Route path="lightning-network" element={<LightningNetworkPage />} />
        <Route path="privacy-coins" element={<PrivacyCoinsPage />} />
        <Route path="ssi-management" element={<SSIManagementPage />} />
        <Route path="verifiable-credentials" element={<VerifiableCredentialsPage />} />
        {/* Phase 20 Routes */}
        <Route path="did-resolution" element={<DIDResolutionPage />} />
        <Route path="biometric-cryptosystems" element={<BiometricCryptosystemsPage />} />
        <Route path="mpc-wallets" element={<MPCWalletsPage />} />
        <Route path="threshold-signatures" element={<ThresholdSignaturesPage />} />
        <Route path="qkd-networks" element={<QKDNetworksPage />} />
        {/* Core Transparency & Frontiers (Phases 16-19) */}
        <Route path="transparency-portal" element={<TransparencyCorePortal />} />
        <Route path="governance-vault" element={<GovernanceOwnershipVault />} />
        <Route path="space-frontier" element={<SpaceEconomyDashboard />} />
        <Route path="atmospheric-frontier" element={<AtmosphericFinanceTerminal />} />
        <Route path="multiverse-arbitrage" element={<MultiverseArbitrageDashboard />} />
        <Route path="agi-terminal" element={<AGIAlignmentTerminal />} />
        <Route path="ledger-forensics" element={<LedgerForensics />} />
        {/* Phase 3 Omega — Cryptography, Collective Intelligence & Interplanetary */}
        <Route path="zk-proofs" element={<ZKProofDashboardPage />} />
        <Route path="fhe-compute" element={<FHEComputePage />} />
        <Route path="swarm-intelligence" element={<SwarmIntelligencePage />} />
        <Route path="tee-enclave" element={<TEEEnclavePage />} />
        <Route path="behavioral-nudge" element={<BehavioralNudgePage />} />
        <Route path="event-sourcing" element={<EventSourcingPage />} />
        <Route path="semantic-search" element={<SemanticSearchPage />} />
        <Route path="interplanetary-banking" element={<InterplanetaryBankingPage />} />
        <Route path="carbon-credits" element={<ESGInvestingPage />} />
        <Route path="digital-identity" element={<SSIManagementPage />} />
        <Route path="social-v2" element={<SocialBankingDashboardV2 />} />
        {/* Omega P5 — Frontier Singularity Services */}
        <Route path="neurotech-banking" element={<NeuralInterfaceBankingPage />} />
        <Route path="biological-assets" element={<NaturalResourcesPage />} />
        <Route path="temporal-finance" element={<InvestmentWealthPage />} />
        <Route path="consciousness-banking" element={<BCIFinancePage />} />
        <Route path="planetary-finance" element={<SpaceEconomyPage />} />
        <Route path="cosmic-compliance" element={<ComplianceSuitePage />} />
        {/* Civilizational OS — Sections 103-200 */}
        <Route path="agi-symbiosis" element={<InvestmentWealthPage />} />
        <Route path="post-scarcity" element={<ESGInvestingPage />} />
        <Route path="sovereign-identity" element={<ComplianceSuitePage />} />
        <Route path="existential-risk" element={<RegulatoryCompliancePage />} />
        <Route path="cognitive-liberty" element={<BCIFinancePage />} />
        <Route path="hyper-personal" element={<AnalyticsDashboard />} />
        <Route path="catastrophe-bonds" element={<InsurancePage />} />
        {/* Level 5 Singularity Stack — Sections 101-110 */}
        <Route path="pq-crypto" element={<SecurityAuditPage />} />
        <Route path="global-compliance" element={<ComplianceSuitePage />} />
        <Route path="agent-orchestration" element={<InvestmentWealthPage />} />
        <Route path="bio-banking" element={<HealthcarePage />} />
        <Route path="data-forensics" element={<AnalyticsDashboard />} />
        {/* Nuclear Spec Sections 103-120 — Infrastructure & Platform */}
        <Route path="error-registry" element={<SecurityAuditPage />} />
        <Route path="rate-limits" element={<AnalyticsDashboard />} />
        <Route path="feature-flags" element={<ComplianceSuitePage />} />
        <Route path="plugin-system" element={<SecurityAuditPage />} />
        {/* Nuclear Spec Wave 3 — Sections 101-105 */}
        <Route path="quantum-networking" element={<SecurityAuditPage />} />
        <Route path="neurosymbolic-ai" element={<AnalyticsDashboard />} />
        <Route path="holographic-viz" element={<AnalyticsDashboard />} />
        <Route path="bio-auth" element={<SecurityAuditPage />} />
        <Route path="self-healing" element={<ComplianceSuitePage />} />
        {/* Nuclear Spec Wave 4 — Sections 106-110 */}
        <Route path="interplanetary-finance" element={<AnalyticsDashboard />} />
        <Route path="swarm-trading" element={<AnalyticsDashboard />} />
        <Route path="synthetic-data" element={<ComplianceSuitePage />} />
        <Route path="quantum-ml" element={<SecurityAuditPage />} />
        <Route path="regulatory-ai" element={<ComplianceSuitePage />} />
        {/* Nuclear Spec Wave 5 — P5 Singularity Sections 111-115 */}
        <Route path="entanglement-settle" element={<SecurityAuditPage />} />
        <Route path="wormhole-bridge" element={<AnalyticsDashboard />} />
        <Route path="time-crystal" element={<ComplianceSuitePage />} />
        <Route path="topological-quantum" element={<SecurityAuditPage />} />
        <Route path="anyon-systems" element={<AnalyticsDashboard />} />
        {/* Nuclear Spec Wave 6 — P5 Singularity Sections 116-120 */}
        <Route path="majorana-qubits" element={<SecurityAuditPage />} />
        <Route path="fractional-hall" element={<AnalyticsDashboard />} />
        <Route path="spin-liquid" element={<SecurityAuditPage />} />
        <Route path="bec-memory" element={<ComplianceSuitePage />} />
        <Route path="superfluid-compute" element={<AnalyticsDashboard />} />
        {/* Nuclear Spec Wave 7 — P5 Singularity Sections 121-125 */}
        <Route path="squid-sensing" element={<SecurityAuditPage />} />
        <Route path="jj-processor" element={<AnalyticsDashboard />} />
        <Route path="charge-qubits" element={<SecurityAuditPage />} />
        <Route path="transmon-compute" element={<AnalyticsDashboard />} />
        <Route path="fluxonium-architecture" element={<SecurityAuditPage />} />
        {/* Nuclear Spec Wave 8 — P5 Singularity Sections 126-130 */}
        <Route path="quantum-annealer" element={<AnalyticsDashboard />} />
        <Route path="adiabatic-compute" element={<ComplianceSuitePage />} />
        <Route path="gate-based-qc" element={<SecurityAuditPage />} />
        <Route path="mbqc-platform" element={<AnalyticsDashboard />} />
        <Route path="one-way-qc" element={<ComplianceSuitePage />} />
        {/* Nuclear Spec Wave 9 — P5 Singularity Sections 131-135 */}
        <Route path="cluster-qc" element={<SecurityAuditPage />} />
        <Route path="blind-compute" element={<AnalyticsDashboard />} />
        <Route path="error-correction" element={<ComplianceSuitePage />} />
        <Route path="surface-code" element={<SecurityAuditPage />} />
        <Route path="color-code" element={<AnalyticsDashboard />} />
        {/* Nuclear Spec Wave 10 — P5 Singularity Sections 136-140 */}
        <Route path="quantum-volume" element={<SecurityAuditPage />} />
        <Route path="quantum-benchmark" element={<AnalyticsDashboard />} />
        <Route path="quantum-simulation" element={<SecurityAuditPage />} />
        <Route path="quantum-ml-advanced" element={<AnalyticsDashboard />} />
        <Route path="quantum-ai-opt" element={<ComplianceSuitePage />} />
        {/* Omega Protocol Wave 11 — Sections 141-145 */}
        <Route path="omega-molecular" element={<SecurityAuditPage />} />
        <Route path="omega-atomic" element={<ComplianceSuitePage />} />
        <Route path="omega-entangled" element={<SecurityAuditPage />} />
        <Route path="omega-dna" element={<SecurityAuditPage />} />
        <Route path="omega-neural" element={<SecurityAuditPage />} />
        {/* Omega Protocol Wave 12 — Sections 146-150 */}
        <Route path="omega-retinal" element={<SecurityAuditPage />} />
        <Route path="omega-gait" element={<SecurityAuditPage />} />
        <Route path="omega-heartbeat" element={<SecurityAuditPage />} />
        <Route path="omega-thought-control" element={<ComplianceSuitePage />} />
        <Route path="omega-consciousness" element={<ComplianceSuitePage />} />

        {/* Command Palette Sub-route Mappings (Resolving 404s) */}
        <Route path="cbdc-conversion" element={<CBDCIntegrationPage />} />
        <Route path="cbdc-history" element={<CBDCIntegrationPage />} />
        <Route path="cbdc-interest" element={<CBDCIntegrationPage />} />
        <Route path="cbdc-smart" element={<CBDCIntegrationPage />} />
        <Route path="cbdc-crossborder" element={<CBDCIntegrationPage />} />
        <Route path="cbdc-tax" element={<CBDCIntegrationPage />} />
        <Route path="cbdc-privacy" element={<CBDCIntegrationPage />} />

        <Route path="quantum-encryption" element={<QuantumSafeSecurityPage />} />
        <Route path="quantum-keydist" element={<QuantumSafeSecurityPage />} />
        <Route path="quantum-rng" element={<QuantumSafeSecurityPage />} />
        <Route path="quantum-auth" element={<QuantumSafeSecurityPage />} />
        <Route path="quantum-monitor" element={<QuantumSafeSecurityPage />} />
        <Route path="quantum-upgrade" element={<QuantumSafeSecurityPage />} />
        <Route path="quantum-cert" element={<QuantumSafeSecurityPage />} />
        <Route path="quantum-backup" element={<QuantumSafeSecurityPage />} />

        <Route path="neural-bci" element={<NeuralInterfaceBankingPage />} />
        <Route path="neural-auth" element={<NeuralInterfaceBankingPage />} />
        <Route path="neural-alerts" element={<NeuralInterfaceBankingPage />} />
        <Route path="neural-coach" element={<NeuralInterfaceBankingPage />} />
        <Route path="neural-control" element={<NeuralInterfaceBankingPage />} />
        <Route path="neural-patterns" element={<NeuralInterfaceBankingPage />} />
        <Route path="neural-security" element={<NeuralInterfaceBankingPage />} />
        <Route path="neural-accessibility" element={<NeuralInterfaceBankingPage />} />

        <Route path="holo-portfolio" element={<HolographicFinancialAdvisorPage />} />
        <Route path="holo-budget" element={<HolographicFinancialAdvisorPage />} />
        <Route path="holo-timeline" element={<HolographicFinancialAdvisorPage />} />
        <Route path="holo-goals" element={<HolographicFinancialAdvisorPage />} />
        <Route path="holo-meetings" element={<HolographicFinancialAdvisorPage />} />
        <Route path="holo-education" element={<HolographicFinancialAdvisorPage />} />
        <Route path="holo-explore" element={<HolographicFinancialAdvisorPage />} />
        <Route path="holo-present" element={<HolographicFinancialAdvisorPage />} />

        {/* Catch-all Not Found Route */}
        <Route path="*" element={<NotFound />} />

    </Routes>

  </Suspense>
);
