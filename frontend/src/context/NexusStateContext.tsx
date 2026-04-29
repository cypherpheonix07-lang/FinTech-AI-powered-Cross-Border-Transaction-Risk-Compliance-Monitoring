import React, { createContext, useContext, useState, useEffect } from 'react';

type SystemMode = 
  | 'Planetary' | 'Orbital' | 'Quantum' | 'Bio' | 'Work' | 'Personal' 
  | 'Multiverse' | 'Crisis' | 'Deep-Work' | 'Sleep' | 'Nirvana' | 'God-Mode'
  | 'Omega-Point' | 'Temporal-Shift';

type ThreatLevel = 'Stable' | 'Advisory' | 'Elevated' | 'Critical' | 'Omega' | 'Singularity' | 'Ontological-Breach';
type NeuralState = 'Calm' | 'Focused' | 'Stressed' | 'Fatigued' | 'REM' | 'Flow' | 'Ascended' | 'Unity';

interface NexusState {
  mode: SystemMode;
  threatLevel: ThreatLevel;
  neuralState: NeuralState;
  
  // 🧠 Consciousness & Bio Metrics
  cognitiveLoad: number;
  stressLevel: number; 
  focusScore: number; 
  heartRate: number;
  neuralSignature: string;
  consciousnessBandwidth: number; // 0-100%
  
  // 💰 Omni-Value Metrics
  wealthTicker: number; // Fiat/Crypto
  energyCredits: number; // kWh
  karmaScore: number; // 0-1000
  reputationIndex: number; // 0-100
  timeCapital: number; // Years/Days/Sec remaining
  
  // ⚛️ Quantum & Temporal Metrics
  networkLatency: number;
  quantumEncryptionLevel: number;
  probabilityCoherence: number; // 0-100%
  timelineBranch: string; // 'Alpha', 'Beta', 'Gamma'
  temporalDrift: number; // ms
  
  // 🚀 System & Protocol
  activeNodes: number;
  globalFlowVolume: number;
  privacyScore: number;
  isOmegaProtocol: boolean;
  protocolVersion: string;
  autopoieticHealth: number; // 0-100% (self-healing)
  hiveMindSync: number; // 0-100%
}

interface NexusContextType {
  state: NexusState;
  setMode: (mode: SystemMode) => void;
  setThreatLevel: (level: ThreatLevel) => void;
  setNeuralState: (state: NeuralState) => void;
  toggleOmegaProtocol: () => void;
  updateTelemetry: (telemetry: Partial<NexusState>) => void;
}

const NexusContext = createContext<NexusContextType | undefined>(undefined);

export const NexusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<NexusState>({
    mode: 'Planetary',
    threatLevel: 'Stable',
    neuralState: 'Calm',
    cognitiveLoad: 12,
    stressLevel: 8,
    focusScore: 94,
    heartRate: 68,
    neuralSignature: 'SIG_OMNI_0x∞',
    consciousnessBandwidth: 92,
    wealthTicker: 14204992.00,
    energyCredits: 8420.5,
    karmaScore: 742,
    reputationIndex: 98.4,
    timeCapital: 42.4, // Years
    networkLatency: 0.24,
    quantumEncryptionLevel: 99.999,
    probabilityCoherence: 98.2,
    timelineBranch: 'Alpha-Prime',
    temporalDrift: 0.002,
    activeNodes: 14204,
    globalFlowVolume: 842049.22,
    privacyScore: 100,
    isOmegaProtocol: false,
    protocolVersion: 'V2.0_OMNI_OMNIPOTENT',
    autopoieticHealth: 99.4,
    hiveMindSync: 88.2,
  });

  // Simulate Multi-Dimensional Telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        wealthTicker: prev.wealthTicker + (Math.random() * 50 - 25),
        energyCredits: prev.energyCredits + (Math.random() * 2 - 1),
        networkLatency: 0.10 + Math.random() * 0.14,
        heartRate: 60 + Math.random() * 15,
        cognitiveLoad: Math.max(5, Math.min(95, prev.cognitiveLoad + (Math.random() * 6 - 3))),
        probabilityCoherence: Math.max(90, Math.min(100, prev.probabilityCoherence + (Math.random() * 2 - 1))),
        temporalDrift: Math.max(0, prev.temporalDrift + (Math.random() * 0.001 - 0.0005)),
        globalFlowVolume: prev.globalFlowVolume + (Math.random() * 10000 - 5000),
        hiveMindSync: Math.max(80, Math.min(100, prev.hiveMindSync + (Math.random() * 0.5 - 0.25)))
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const setMode = (mode: SystemMode) => setState(prev => ({ ...prev, mode }));
  const setThreatLevel = (threatLevel: ThreatLevel) => setState(prev => ({ ...prev, threatLevel }));
  const setNeuralState = (neuralState: NeuralState) => setState(prev => ({ ...prev, neuralState }));
  const toggleOmegaProtocol = () => setState(prev => ({ ...prev, isOmegaProtocol: !prev.isOmegaProtocol }));
  const updateTelemetry = (telemetry: Partial<NexusState>) => setState(prev => ({ ...prev, ...telemetry }));

  return (
    <NexusContext.Provider value={{ state, setMode, setThreatLevel, setNeuralState, toggleOmegaProtocol, updateTelemetry }}>
      {children}
    </NexusContext.Provider>
  );
};

export const useNexus = () => {
  const context = useContext(NexusContext);
  if (!context) throw new Error('useNexus must be used within a NexusProvider');
  return context;
};
