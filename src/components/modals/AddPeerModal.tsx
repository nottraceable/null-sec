import React, { useState } from 'react';
import { X, UserPlus, Shield } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddPeer: (peerId: string) => void;
}

export const AddPeerModal: React.FC<Props> = ({ isOpen, onClose, onAddPeer }) => {
  const [peerId, setPeerId] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0b0f19] border border-emerald-500/30 rounded-lg p-6 font-mono relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-base font-bold text-emerald-400 mb-4 flex items-center space-x-2">
          <UserPlus className="w-5 h-5" />
          <span>ADD P2P FRIEND</span>
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (peerId.trim()) {
              onAddPeer(peerId.trim());
              setPeerId('');
              onClose();
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Peer Multiaddr or Public Key ID</label>
            <input
              type="text"
              value={peerId}
              onChange={(e) => setPeerId(e.target.value)}
              placeholder="12D3K3wX..."
              className="w-full px-3 py-2 bg-[#06090e] border border-slate-800 rounded text-xs text-emerald-300 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-700 text-slate-400 text-xs rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs rounded">
              Send Peer Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
