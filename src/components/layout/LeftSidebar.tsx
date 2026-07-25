import React from 'react';
import { MeshServer, PeerUser } from '../../types';
import { MessageSquare, Plus, Compass, Server as ServerIcon } from 'lucide-react';

interface Props {
  servers: MeshServer[];
  peers: PeerUser[];
  activeTab: 'dms' | string;
  onSelectTab: (tab: 'dms' | string) => void;
  onOpenAddPeer: () => void;
  onOpenJoinServer: () => void;
  onOpenCreateServer: () => void;
}

export const LeftSidebar: React.FC<Props> = ({
  servers,
  peers,
  activeTab,
  onSelectTab,
  onOpenAddPeer,
  onOpenJoinServer,
  onOpenCreateServer,
}) => {
  return (
    <div className="w-16 bg-[#04060a] border-r border-emerald-500/20 flex flex-col items-center py-4 space-y-4">
      {/* App Logo */}
      <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-sm shadow-md">
        NS
      </div>

      <div className="w-8 h-[1px] bg-slate-800" />

      {/* DM Switcher */}
      <button
        onClick={() => onSelectTab('dms')}
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
          activeTab === 'dms'
            ? 'bg-emerald-600 text-black font-bold'
            : 'text-slate-400 hover:bg-slate-900 hover:text-emerald-400'
        }`}
        title="Direct Messages"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* Mesh Server Icons */}
      <div className="flex-1 w-full space-y-3 overflow-y-auto flex flex-col items-center">
        {servers.map((server) => (
          <button
            key={server.id}
            onClick={() => onSelectTab(server.id)}
            className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold text-xs uppercase transition-all ${
              activeTab === server.id
                ? 'bg-cyan-600 text-black border-cyan-400 shadow-md shadow-cyan-950'
                : 'bg-[#090d16] border-slate-800 text-slate-300 hover:border-emerald-500/40'
            }`}
            title={server.name}
          >
            {server.name.substring(0, 2)}
          </button>
        ))}
      </div>

      <div className="w-8 h-[1px] bg-slate-800" />

      {/* Action Buttons */}
      <button
        onClick={onOpenCreateServer}
        className="w-10 h-10 rounded-lg border border-dashed border-emerald-500/40 flex items-center justify-center text-emerald-400 hover:bg-emerald-950/40 transition-all"
        title="Create Server"
      >
        <Plus className="w-5 h-5" />
      </button>

      <button
        onClick={onOpenJoinServer}
        className="w-10 h-10 rounded-lg border border-dashed border-cyan-500/40 flex items-center justify-center text-cyan-400 hover:bg-cyan-950/40 transition-all"
        title="Join Server"
      >
        <Compass className="w-5 h-5" />
      </button>
    </div>
  );
};
