import React, { useState } from 'react';
import { KeyRound, ShieldCheck, AlertCircle } from 'lucide-react';

interface Props {
  seedWords: string[];
  onComplete: () => void;
  onBack: () => void;
}

export const Step3Verify: React.FC<Props> = ({ seedWords, onComplete, onBack }) => {
  // Test indices: 2nd, 8th, and 15th word verification
  const testIndices = [1, 7, 14];
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});
  const [error, setError] = useState('');

  const handleInputChange = (idx: number, val: string) => {
    setInputs((prev) => ({ ...prev, [idx]: val.trim().toLowerCase() }));
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    for (const idx of testIndices) {
      if ((inputs[idx] || '') !== seedWords[idx].toLowerCase()) {
        setError(`WORD #${idx + 1} IS INCORRECT. CHECK YOUR RECOVERY SLIP.`);
        return;
      }
    }
    setError('');
    onComplete();
  };

  return (
    <div className="w-full max-w-md p-8 bg-[#0b0f19] border border-emerald-500/30 rounded-lg shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-emerald-950/80 border border-emerald-500/40 rounded">
          <KeyRound className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wider text-emerald-400">VERIFY SEED</h1>
          <p className="text-xs text-slate-400">STEP 03: CONFIRM ENTROPY POSITIONS</p>
        </div>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        {testIndices.map((idx) => (
          <div key={idx}>
            <label className="block text-xs font-semibold text-emerald-500 mb-1 font-mono uppercase">
              Enter Word #{idx + 1}
            </label>
            <input
              type="text"
              value={inputs[idx] || ''}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              placeholder={`Word #${idx + 1}`}
              className="w-full px-4 py-2.5 bg-[#06090e] border border-emerald-500/30 rounded text-emerald-300 placeholder-slate-600 focus:outline-none focus:border-emerald-400 font-mono text-sm"
            />
          </div>
        ))}

        {error && (
          <div className="p-3 bg-rose-950/30 border border-rose-500/40 rounded flex items-center space-x-2 text-rose-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 py-3 border border-slate-700 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-wider rounded"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-2/3 py-3 bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center space-x-2 shadow-lg"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Initialize Vault</span>
          </button>
        </div>
      </form>
    </div>
  );
};
