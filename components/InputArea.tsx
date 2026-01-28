
import React, { useState } from 'react';
import { SimplificationLevel } from '../types';

interface InputAreaProps {
  onSimplify: (topic: string, level: SimplificationLevel) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSimplify, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<SimplificationLevel>(SimplificationLevel.KINDERGARTEN);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSimplify(topic, level);
    }
  };

  const examples = [
    "Quantum Entanglement",
    "How the stock market works",
    "String Theory",
    "Why the sky is blue",
    "Inflation in economics"
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-8">
      <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
            What's bothering your brain?
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. How does blockchain work? or Why do people use interest rates?"
            className="w-full min-h-[120px] p-4 rounded-2xl border-2 border-slate-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg text-slate-800 resize-none"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
              Simplify Style
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.values(SimplificationLevel).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    level === lvl
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className={`px-8 py-4 rounded-2xl text-white font-bold text-xl transition-all flex items-center justify-center gap-2 min-w-[160px] ${
              isLoading || !topic.trim()
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95 shadow-lg shadow-green-200'
            }`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Simplify</span>
                <span>✨</span>
              </>
            )}
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 mb-3 uppercase">Need an idea?</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setTopic(ex)}
                className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full text-slate-500 hover:border-blue-300 hover:text-blue-500 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputArea;
