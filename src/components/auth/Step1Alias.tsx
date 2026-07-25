import React, { useState } from 'react';
import { Terminal, Shield, ArrowRight } from 'lucide-react';

interface Props {
  onNext: (alias: string) => void;
}

export const Step1Alias: React.FC<Props> = ({ onNext }) => {
  const [alias, setAlias] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alias.trim() || alias.length < 3) {
      setError('ALIAS MUST BE AT LEAST 3 CHARACTERS.');
      return;
    }
    if (!/^[a-zA-Z0-0_-]+$/.test(alias)) {
      setError('ONLY ALPHANUMERIC, UNDERSCORES & DASHES ALLOWED.');
      return;
    }
    setError('');
    onNext(alias.trim());
  };

  return (
    <div className="w-full max-w-md p-8 bg-[#0b0f19] border border-emerald-500/30 rounded-lg shadow-2xl backdrop-blur-md">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-emerald-950/80 border border-emerald-500/40 rounded">
          <Terminal className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wider text-emerald-400">NULL SEC // IDENTITY</h1>
          <p className="text-xs text-slate-400">STEP 01: SOVEREIGN HANDLE</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-emerald-500 mb-2 uppercase tracking-widest">
            Choose Local Peer Handle
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-emerald-600 font-mono">@</span>
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="cypher_ghost"
              className="w-full pl-8 pr-4 py-3 bg-[#06090e] border border-emerald-500/30 rounded text-emerald-300 placeholder-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 font-mono text-sm"
              autoFocus
            />
          </div>
          {error && <p className="mt-2 text-xs text-rose-500 font-mono">{error}</p>}
        </div>

        <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded flex items-start space-x-3">
          <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            Your handle is linked to your Ed25519 identity key. No central database validates or claims this name.
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-black font-bold uppercase tracking-widest text-xs rounded transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-emerald-950"
        >
          <span>Generate Key Matrix</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
