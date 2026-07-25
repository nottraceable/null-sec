import React from 'react';
import { Settings, Shield } from 'lucide-react';

interface Props {
  alias: string;
  peerId: string;
  onOpenSettings: () => void;
}

export const ProfilePill: React.FC<Props> = ({ alias, peerId, onOpenSettings }) => {
  const truncatedPeerId = `${peerId.substring(0, 6)}...${peerId.substring(peerId.length - 4)}`;

  return (
    <div className="p-3 bg-[#06090e] border-t border-emerald-500/20 flex items-center justify-between">
      <div className="flex items-center space-x-2.5 overflow-hidden">
        <div className="w-8 h-8 rounded bg-emerald-950 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs shrink-0">
          {alias.substring(0, 2).toUpperCase()}
        </div>
        <div className="truncate">
          <p className="text-xs font-bold text-slate-200 font-mono truncate">{alias}</p>
          <p className="text-[10px] text-slate-500 font-mono truncate">{truncatedPeerId}</p>
        </div>
      </div>

      <button
        onClick={onOpenSettings}
        className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-900 rounded transition-all shrink-0"
        title="User Settings"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
};
