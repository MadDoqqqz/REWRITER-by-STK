
import React from 'react';
import { Tool } from '../types';
import { ApsaraIcon } from './icons/ApsaraIcon';

interface HeaderProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

const navItems = [
  { id: Tool.PARAPHRASE, label: 'Paraphrase' },
  { id: Tool.AI_DETECT, label: 'AI Detect' },
  { id: Tool.ESSAY_WRITER, label: 'Essay Writer' },
  { id: Tool.SUMMARIZER, label: 'Summarizer' },
];

const Header: React.FC<HeaderProps> = ({ activeTool, setActiveTool }) => {
  return (
    <header className="w-full p-4 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <ApsaraIcon className="w-10 h-10 text-amber-400" />
          <h1 className="text-3xl font-bold text-stone-100 font-display">Khmer Rewriter</h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-2 md:space-x-4 bg-stone-900/50 p-2 rounded-lg">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTool(item.id)}
                  className={`px-3 py-2 text-sm md:text-base font-medium rounded-md transition-all duration-300 ${
                    activeTool === item.id
                      ? 'bg-amber-500 text-stone-900 shadow-lg'
                      : 'text-stone-300 hover:bg-stone-700/50 hover:text-amber-400'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
