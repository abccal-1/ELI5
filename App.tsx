
import React, { useState } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import ExplanationResult from './components/ExplanationResult';
import { ExplanationState, SimplificationLevel } from './types';
import { simplifyTopic } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<ExplanationState>({
    topic: '',
    result: null,
    loading: false,
    error: null,
  });
  const [currentLevel, setCurrentLevel] = useState<SimplificationLevel>(SimplificationLevel.KINDERGARTEN);

  const handleSimplify = async (topic: string, level: SimplificationLevel) => {
    setState((prev) => ({ ...prev, loading: true, error: null, topic }));
    setCurrentLevel(level);

    try {
      const result = await simplifyTopic(topic, level);
      setState((prev) => ({
        ...prev,
        result,
        loading: false,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err.message || "Oops! My brain got a knot in it. Try again?",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header />
      
      <main className="container mx-auto px-4">
        <InputArea onSimplify={handleSimplify} isLoading={state.loading} />

        {state.error && (
          <div className="max-w-3xl mx-auto mb-8 animate-in zoom-in duration-300">
            <div className="bg-red-50 border-2 border-red-100 p-6 rounded-3xl flex items-center gap-4">
              <span className="text-3xl">😵‍💫</span>
              <p className="text-red-600 font-bold">{state.error}</p>
            </div>
          </div>
        )}

        {state.loading && (
          <div className="max-w-3xl mx-auto py-12 text-center animate-pulse">
            <div className="inline-block relative">
              <div className="text-6xl mb-4">🤯</div>
              <div className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </div>
            </div>
            <p className="text-slate-500 font-bold text-lg">Breaking it down into tiny pieces...</p>
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}

        {!state.loading && state.result && (
          <ExplanationResult 
            topic={state.topic} 
            result={state.result} 
            level={currentLevel}
          />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none">
        <div className="max-w-screen-xl mx-auto flex justify-end">
          <div className="glass px-4 py-2 rounded-full shadow-lg text-slate-500 text-xs font-bold flex items-center gap-2 pointer-events-auto">
            <span>Powered by Gemini</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
