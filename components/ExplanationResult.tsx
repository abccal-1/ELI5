
import React from 'react';
import { SimplificationLevel } from '../types';

interface ExplanationResultProps {
  topic: string;
  result: string | null;
  level: SimplificationLevel;
}

const ExplanationResult: React.FC<ExplanationResultProps> = ({ topic, result, level }) => {
  if (!result) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-blue-50 relative overflow-hidden">
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 p-4">
          <div className="bg-blue-50 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase">
            {level} Edition
          </div>
        </div>

        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
          The Lowdown on: <span className="text-slate-800">{topic}</span>
        </h3>

        <div className="prose prose-slate max-w-none">
          <div className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
            {result}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex gap-2">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(result);
                alert("Copied to clipboard!");
              }}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors group"
              title="Copy to clipboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
          <p className="text-slate-400 text-sm italic font-medium">
            Simplified by ELI5 AI Brain 🧠
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationResult;
