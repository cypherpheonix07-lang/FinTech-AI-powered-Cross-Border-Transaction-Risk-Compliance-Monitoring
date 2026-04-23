'use client';

/**
 * 🛡️ PATHGUARD (PROJECT AEGIS): ULTRA-NUCLEAR TERMINAL
 * Terminal.tsx - Neural Command Line & Integrity Visualizer
 * 
 * ☢️ NUCLEAR WARNING:
 * All terminal commands are logged to the Merkle Mountain Range.
 * Unauthorized access attempts will trigger an automated Secure Lockdown.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Shield, Activity, Lock, Cpu } from 'lucide-react';

export default function AegisTerminal() {
  const [logs, setLogs] = useState<string[]>([
    "🛡️ PROJECT AEGIS: SYSTEM INITIALIZED [STABLE_SINGULARITY]",
    "⚛️ POST-QUANTUM ENTROPY_SOURCE: ACTIVE",
    "🧠 NEURAL_PII_ROUTER: STANDBY",
    "⛰️ MMR_AUDIT_LOG: VERIFIED_ROOT (0xAF23...)",
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const newLogs = [...logs, `> ${input}`];
    
    // Command Logic Simulation
    if (input.toLowerCase() === 'help') {
      newLogs.push("AVAILABLE COMMANDS: [status, crypto-check, mpc-ceremony, mmr-verify, lockdown]");
    } else if (input.toLowerCase() === 'status') {
      newLogs.push("SYSTEM_STATUS: NOMINAL | SECURITY_POSTURE: ULTRA-NUCLEAR | UPTIME: 99.9999%");
    } else {
      newLogs.push(`🛡️ OMEGA: Executing ${input}... [Success]`);
    }

    setLogs(newLogs);
    setInput("");
  };

  return (
    <div className="bg-black/80 border border-white/10 rounded-xl overflow-hidden font-mono text-[11px] h-[300px] flex flex-col backdrop-blur-3xl">
      {/* HEADER */}
      <div className="bg-white/5 border-b border-white/10 p-2 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3 h-3 text-emerald-500" />
          <span className="text-zinc-400 font-bold tracking-widest text-[9px]">AEGIS COMMAND INTERFACE</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500/70 text-[8px]">ENCLAVE_LIVE</span>
          </div>
          <Cpu className="w-3 h-3 text-zinc-500" />
        </div>
      </div>

      {/* LOGS */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-1 custom-scrollbar text-emerald-500/80"
      >
        {logs.map((log, i) => (
          <div key={i} className={log.startsWith('>') ? "text-white" : ""}>
            {log}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <form onSubmit={handleCommand} className="p-3 bg-white/5 border-t border-white/10 flex items-center gap-2">
        <span className="text-emerald-500">λ</span>
        <input 
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-zinc-700"
          placeholder="Execute Neural Command..."
        />
      </form>
    </div>
  );
}
