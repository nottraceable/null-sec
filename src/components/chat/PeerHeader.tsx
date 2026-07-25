import React from 'react';
import { Lock, Cpu, Network, ShieldCheck } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  isChannel?: boolean;
  onionHops?: number;
}

export const PeerHeader: React.FC<Props> = ({ title, subtitle, isChannel, onionHops = 3 }) => {
  return (
    <div className="h-14 px-6 border-b border-emerald-500/20 bg-[#090d16]/90 flex items-center justify-between backdrop-blur-md">
      <div className="flex items-center space-x-3">
        <span className="text-emerald-400 text-lg font-mono font-bold">
          {isChannel ? '#' : '@'}
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-100 tracking-wide font-mono">{title}</h2>
          {subtitle && <p className="text-[10px] text-slate-400 font-mono">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Onion Circuit Badge */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-cyan-950/40 border border-cyan-500/30 rounded text-[11px] font-mono text-cyan-400">
          <Network className="w-3.5 h-3.5" />
          <span>{onionHops}-HOP ONION ROUTE</span>
        </div>

        {/* E2EE Signal Double Ratchet Status */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-950/40 border border-emerald-500/30 rounded text-[11px] font-mono text-emerald-400">
          <Lock className="w-3.5 h-3.5" />
          <span>DOUBLE RATCHET E2EE</span>
        </div>
      </div>
    </div>
  );
};
