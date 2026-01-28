
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-12 px-4">
      <div className="inline-block p-3 rounded-2xl bg-yellow-400 mb-4 shadow-lg transform rotate-3">
        <span className="text-4xl">💡</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-slate-800 tracking-tight mb-4">
        ELI5<span className="text-blue-500">.</span>
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
        The world is complicated. We make it easy. 
        Type in any complex problem and we'll explain it like you're five.
      </p>
    </header>
  );
};

export default Header;
