import React from 'react';
import GeopoliticalDashboard from '../components/intelligence/GeopoliticalDashboard';
import SupplyChainDashboard from '../components/trade_finance/SupplyChainDashboard';
import AltInvestments from '../components/investments/AltInvestments';
import AlgoTerminal from '../components/trading/AlgoTerminal';
import PrivacyShield from '../components/privacy/PrivacyShield';
import { Navbar } from '../components/layout/Navbar';

const IntelligenceTradingPage = () => {
  return (
    <div className="min-h-screen bg-black text-slate-200">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 mb-4">
            PathGuard Phase 12: Advanced Intelligence & Trading
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl">
            Institutional-grade Geopolitical Risk Monitoring, Supply Chain Finance, Fractional Alt Investments, Algorithmic Execution, and Cryptographic Privacy guarantees.
          </p>
        </header>

        <div className="space-y-16">
          <section id="geopolitical-risk">
            <GeopoliticalDashboard />
          </section>

          <section id="supply-chain">
            <SupplyChainDashboard />
          </section>

          <section id="alternative-investments">
            <AltInvestments />
          </section>

          <section id="algo-trading">
            <AlgoTerminal />
          </section>

          <section id="privacy-tech">
            <PrivacyShield />
          </section>
        </div>
      </main>
    </div>
  );
};

export default IntelligenceTradingPage;
