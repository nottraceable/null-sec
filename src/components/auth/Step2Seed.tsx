import React, { useState } from 'react';
import { ShieldAlert, Copy, Check, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface Props {
  seedWords: string[];
  onNext: () => void;
}

export const Step2Seed: React.FC<Props> = ({ seedWords, onNext }) => {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(seedWords.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl p-8 bg-[#0b0f19] border border-emerald-500/30 rounded-lg shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-wider text-emerald-400">20-WORD RECOVERY SEED</h1>
          <p className="text-xs text-slate-400">STEP 02: BIP-39 MASTER ENTROPY</p>
        </div>
        <button
          onClick={() => setRevealed(!revealed)}
          className="p-2 border border-emerald-500/30 rounded text-emerald-400 hover:bg-emerald-950/40"
        >
          {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      <div className="mb-6 p-4 bg-rose-950/30 border border-rose-500/40 rounded flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <p className="text-xs text-rose-200 leading-relaxed">
          WARNING: Store these 20 words offline. There are NO servers or password reset emails. If lost, your cryptographic identity and local keys are lost forever.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {seedWords.map((word, index) => (
          <div
            key={index}
            className="p-2.5 bg-[#06090e] border border-slate-800 rounded flex items-center space-x-2 font-mono text-xs"
          >
            <span className="text-slate-600 select-none w-5">{String(index + 1).padStart(2, '0')}.</span>
            <span className={`font-semibold ${revealed ? 'text-emerald-300' : 'blur-sm select-none text-slate-500'}`}>
              {word}
            </span>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleCopy}
          className="flex-1 py-3 border border-emerald-500/40 hover:bg-emerald-950/30 text-emerald-400 font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center space-x-2"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy Seed Phrase'}</span>
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center space-x-2 shadow-lg"
        >
          <span>Verify Seed</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
