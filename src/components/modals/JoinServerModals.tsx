import React, { useState } from 'react';
import { X, Compass } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onJoinServer: (multiaddr: string) => void;
}

export const JoinServerModal: React.FC<Props> = ({ isOpen, onClose, onJoinServer }) => {
  const [addr, setAddr] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md bg-[#0b0f19] border border-cyan-500/30 rounded-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-base font-bold text-cyan-400 mb-4 flex items-center space-x-2">
          <Compass className="w-5 h-5" />
          <span>JOIN DECENTRALIZED MESH SERVER</span>
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (addr.trim()) {
              onJoinServer(addr.trim());
              setAddr('');
              onClose();
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Server Multiaddr Connection String</label>
            <input
              type="text"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              placeholder="/ip4/127.0.0.1/tcp/4001/p2p/12D3K3..."
              className="w-full px-3 py-2 bg-[#06090e] border border-slate-800 rounded text-xs text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-700 text-slate-400 text-xs rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs rounded">
              Connect to Mesh
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
