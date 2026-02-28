import { useAppDispatch, useAppSelector } from '@/store';
import { selectSimulation, startSimulation, stopSimulation, updateSimulationStats, setSimulationMode } from '@/store/slices/simulationSlice';
import { useEffect, useRef } from 'react';
import { Play, Square, Zap, AlertTriangle, Activity } from 'lucide-react';
import type { SimulationState } from '@/types';

export default function SimulationPage() {
  const dispatch = useAppDispatch();
  const { simulation } = useAppSelector(selectSimulation);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = () => {
    dispatch(startSimulation(simulation.mode));
  };

  const handleStop = () => {
    dispatch(stopSimulation());
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (simulation.isRunning) {
      intervalRef.current = setInterval(() => {
        const tps = simulation.mode === 'stress' ? 50 : simulation.mode === 'adversarial' ? 20 : 10;
        dispatch(updateSimulationStats({
          transactionsPerSecond: tps + Math.floor(Math.random() * 10),
          elapsed: simulation.elapsed + 1,
          generated: simulation.generated + tps,
          flagged: simulation.flagged + Math.floor(Math.random() * 3),
        }));
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [simulation.isRunning, simulation.elapsed, simulation.generated, simulation.flagged, simulation.mode, dispatch]);

  const modes: { value: SimulationState['mode']; label: string; icon: typeof Play; desc: string }[] = [
    { value: 'normal', label: 'Normal', icon: Play, desc: '~10 TPS, standard risk distribution' },
    { value: 'stress', label: 'Stress Test', icon: Zap, desc: '~50 TPS, high volume simulation' },
    { value: 'adversarial', label: 'Adversarial', icon: AlertTriangle, desc: '~20 TPS, elevated risk patterns' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Simulation Control</h1>
        <p className="text-sm text-muted-foreground">Generate test transactions for risk model evaluation</p>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map(m => (
          <button key={m.value} onClick={() => !simulation.isRunning && dispatch(setSimulationMode(m.value))}
            className={`glass-card p-5 text-left transition-all ${simulation.mode === m.value ? 'border-primary ring-1 ring-primary/30' : 'hover:border-border/80'} ${simulation.isRunning ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
            <div className="flex items-center gap-2 mb-2">
              <m.icon className={`w-4 h-4 ${simulation.mode === m.value ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="font-semibold text-sm text-foreground">{m.label}</span>
            </div>
            <p className="text-xs text-muted-foreground">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {!simulation.isRunning ? (
          <button onClick={handleStart} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
            <Play className="w-4 h-4" /> Start Simulation
          </button>
        ) : (
          <button onClick={handleStop} className="flex items-center gap-2 px-6 py-2.5 bg-destructive text-destructive-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
            <Square className="w-4 h-4" /> Stop
          </button>
        )}
        {simulation.isRunning && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
            <Activity className="w-3.5 h-3.5 text-success animate-pulse-glow" />
            <span className="text-xs font-medium text-success">Running</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'TPS', value: simulation.transactionsPerSecond },
          { label: 'Elapsed', value: `${simulation.elapsed}s` },
          { label: 'Generated', value: simulation.generated.toLocaleString() },
          { label: 'Flagged', value: simulation.flagged.toLocaleString() },
        ].map(s => (
          <div key={s.label} className="glass-card p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.label}</div>
            <div className="stat-value text-foreground font-mono">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
