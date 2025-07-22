
import React from 'react';

interface ToolCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, icon, children }) => {
  return (
    <div className="w-full max-w-4xl bg-stone-900/70 backdrop-blur-md rounded-xl shadow-2xl border border-stone-700/50 overflow-hidden">
      <div className="p-5 border-b border-stone-700/50 flex items-center gap-4 bg-stone-800/20">
        <div className="text-amber-400">{icon}</div>
        <h2 className="text-2xl font-bold text-stone-100 font-display">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default ToolCard;
