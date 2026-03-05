import React from 'react';
import QuantumDashboard from '../components/security/QuantumDashboard';
import VirtualPortfolio from '../components/metaverse/VirtualPortfolio';
import SpaceDashboard from '../components/space_economy/SpaceDashboard';
import NeuralInterface from '../components/bci/NeuralInterface';
import ResiliencePlanner from '../components/climate/ResiliencePlanner';
import { Navbar } from '../components/layout/Navbar';

const AdvancedFeaturesPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-400 to-emerald-400 mb-4">
            PathGuard Phase 11: Future Horizons
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl">
            Demonstrating Ultra-Advanced concepts including Quantum Security, Metaverse Wealth, Space Economy, Brain-Computer Interfaces, and Climate Resilience.
          </p>
        </header>

        <div className="space-y-16">
          <section id="quantum-security">
            <QuantumDashboard />
          </section>

          <section id="metaverse-banking">
            <VirtualPortfolio />
          </section>

          <section id="space-economy">
            <SpaceDashboard />
          </section>

          <section id="bci-auth">
            <NeuralInterface />
          </section>

          <section id="climate-resilience">
            <ResiliencePlanner />
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdvancedFeaturesPage;
