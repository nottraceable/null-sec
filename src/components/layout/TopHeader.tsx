import React, { useState } from 'react';
import { Cpu, Radio, Shield, Activity, RefreshCw } from 'lucide-react';

interface Props {
  connectedPeersCount: number;
}

export const TopHeader: React.FC<Props> = ({ connectedPeersCount }) => {
  const [decoyEnabled, setDecoyEnabled] = useState(true);

  return (
    <header className="h-10 border-b border-emerald-500/20 bg-[#06090e] px-4 flex items-center justify-between font-mono text-[11px] select-none">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold tracking-widest">NULL SEC // P2P SWARM</span>
        </div>

        <div className="flex items-center space-x-2 text-slate-400">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>Active Peers: <strong className="text-cyan-400">{connectedPeersCount}</strong></span>
        </div>
      </div>

      <div className="flex items-center space-x-5">
        {/* Decoy Cover Traffic Switch */}
        <button
          onClick={() => setDecoyEnabled(!decoyEnabled)}
          className={`flex items-center space-x-1.5 px-2 py-0.5 rounded border transition-all ${
            decoyEnabled
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400'
              : 'bg-slate-900 border-slate-700 text-slate-500'
          }`}
        >
          <Activity className="w-3 h-3" />
          <span>DECOY TRAFFIC: {decoyEnabled ? 'ON' : 'OFF'}</span>
        </button>

        <div className="flex items-center space-x-1.5 text-slate-400">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>DHT: KADEMLIA</span>
        </div>
      </div>
    </header>
  );
};
