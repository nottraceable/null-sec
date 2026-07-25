import React from 'react';
import { ChatMessage } from '../../types';
import { ShieldCheck, FileKey } from 'lucide-react';

interface Props {
  messages: ChatMessage[];
  currentPeerId: string;
}

export const MessageThread: React.FC<Props> = ({ messages, currentPeerId }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2">
          <FileKey className="w-8 h-8 opacity-40 text-emerald-400" />
          <p className="text-xs uppercase tracking-widest">P2P Session Initialized // Zero Storage Log</p>
        </div>
      ) : (
        messages.map((msg) => {
          const isSelf = msg.sender_peer_id === currentPeerId;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-2 mb-1 text-[10px] text-slate-500">
                <span className="font-bold text-emerald-500">{msg.sender_alias}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
                <span className="text-[9px] px-1 bg-slate-900 border border-slate-800 rounded text-slate-400">
                  {msg.padded_size_bytes}B PADDED
                </span>
              </div>

              <div
                className={`max-w-xl p-3.5 rounded-lg border text-xs leading-relaxed ${
                  isSelf
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200 rounded-tr-none'
                    : 'bg-[#0d1320] border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                {msg.content}
              </div>

              {msg.is_verified_ratchet && (
                <div className="flex items-center space-x-1 mt-1 text-[9px] text-emerald-500/70">
                  <ShieldCheck className="w-3 h-3" />
                  <span>MAC Validated</span>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
