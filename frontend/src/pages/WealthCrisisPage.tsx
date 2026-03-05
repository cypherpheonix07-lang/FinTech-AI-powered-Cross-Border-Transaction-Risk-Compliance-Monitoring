import React from 'react';
import TaxStrategyDashboard from '../components/wealth/TaxStrategyDashboard';
import LegacyTrustPlanner from '../components/wealth/LegacyTrustPlanner';
import SovereignFundDashboard from '../components/institutional/SovereignFundDashboard';
import InflationShield from '../components/crisis/InflationShield';
import GovernancePortal from '../components/dao/GovernancePortal';
import { Navbar } from '../components/layout/Navbar';

const WealthCrisisPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-500 mb-4">
            PathGuard Phase 13: Wealth & Crisis Management
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl">
            Simulating complex tax routing, multi-generational legacy trusts, sovereign capital deployment, inflation-shield defenses, and decentralized protocol governance.
          </p>
        </header>

        <div className="space-y-16">
          <section id="tax-optimization">
            <TaxStrategyDashboard />
          </section>

          <section id="legacy-planning">
            <LegacyTrustPlanner />
          </section>

          <section id="sovereign-wealth">
            <SovereignFundDashboard />
          </section>

          <section id="inflation-shield">
            <InflationShield />
          </section>

          <section id="dao-governance">
            <GovernancePortal />
          </section>
        </div>
      </main>
    </div>
  );
};

export default WealthCrisisPage;
