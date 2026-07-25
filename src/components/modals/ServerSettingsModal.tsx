import React, { useState } from 'react';
import { X, Hash, Shield, Plus, Trash2 } from 'lucide-react';
import { MeshServer } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  server: MeshServer;
}

export const ServerSettingsModal: React.FC<Props> = ({ isOpen, onClose, server }) => {
  const [activeTab, setActiveTab] = useState<'channels' | 'roles'>('channels');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0b0f19] border border-emerald-500/30 rounded-lg p-6 font-mono relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-base font-bold text-emerald-400 mb-4">SERVER ADMINISTRATION // {server.name}</h2>

        <div className="flex space-x-4 border-b border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('channels')}
            className={`pb-2 text-xs font-bold transition-all ${
              activeTab === 'channels' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-500'
            }`}
          >
            Channels & Categories
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`pb-2 text-xs font-bold transition-all ${
              activeTab === 'roles' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-500'
            }`}
          >
            Role Permissions Matrix
          </button>
        </div>

        {activeTab === 'channels' ? (
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {server.categories.map((cat) => (
              <div key={cat.id} className="p-3 bg-[#06090e] border border-slate-800 rounded">
                <div className="text-xs font-bold text-slate-400 mb-2 flex justify-between items-center">
                  <span>CATEGORY: {cat.name}</span>
                  <button className="text-emerald-400 text-[10px] flex items-center space-x-1">
                    <Plus className="w-3 h-3" />
                    <span>Add Channel</span>
                  </button>
                </div>
                <div className="space-y-1">
                  {cat.channels.map((chan) => (
                    <div key={chan.id} className="flex justify-between items-center text-xs text-slate-300 px-2 py-1 bg-slate-900/50 rounded">
                      <span className="flex items-center space-x-1">
                        <Hash className="w-3.5 h-3.5 text-slate-500" />
                        <span>{chan.name}</span>
                      </span>
                      <button className="text-slate-600 hover:text-rose-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {server.roles.map((role) => (
              <div key={role.id} className="p-3 bg-[#06090e] border border-slate-800 rounded flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-400">{role.name}</span>
                <span className="text-[10px] text-slate-500">FULL ACCESS</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
