import React, { createContext, useContext, useState, useEffect } from 'react';

type SystemMode = 'Planetary' | 'Orbital' | 'Quantum' | 'Bio' | 'Work' | 'Personal' | 'Multiverse' | 'Crisis' | 'Deep-Work' | 'Sleep';
type ThreatLevel = 'Stable' | 'Advisory' | 'Elevated' | 'Critical' | 'Omega';
type NeuralState = 'Calm' | 'Focused' | 'Stressed' | 'Fatigued' | 'REM';

interface NexusState {
  mode: SystemMode;
  threatLevel: ThreatLevel;
  neuralState: NeuralState;
  cognitiveLoad: number;
  stressLevel: number; // 0-100
  focusScore: number; // 0-100
  wealthTicker: number;
  biometricVerified: boolean;
  activeContext: string;
  isOmegaProtocol: boolean;
  protocolVersion: string;
  // Biometric Telemetry
  heartRate: number;
  retinalSync: boolean;
  neuralSignature: string;
  // Quantum & Network Telemetry
  networkLatency: number;
  quantumEncryptionLevel: number;
  activeNodes: number;
  globalFlowVolume: number;
  privacyScore: number;
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
    wealthTicker: 14204992.00,
    biometricVerified: true,
    activeContext: 'London_Office',
    isOmegaProtocol: false,
    protocolVersion: 'V4.0_AEGIS_PRIME',
    heartRate: 68,
    retinalSync: true,
    neuralSignature: 'SIG_AEGIS_0x84',
    networkLatency: 0.24,
    quantumEncryptionLevel: 99.9,
    activeNodes: 14204,
    globalFlowVolume: 842049.22,
    privacyScore: 98,
  });

  // Simulate complex telemetry fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        wealthTicker: prev.wealthTicker + (Math.random() * 20 - 10),
        networkLatency: 0.20 + Math.random() * 0.08,
        heartRate: 65 + Math.random() * 10,
        cognitiveLoad: Math.max(5, Math.min(95, prev.cognitiveLoad + (Math.random() * 4 - 2))),
        globalFlowVolume: prev.globalFlowVolume + (Math.random() * 5000 - 2500)
      }));
    }, 1500);
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
