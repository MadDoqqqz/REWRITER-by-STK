
import React, { useState } from 'react';
import ToolCard from './ToolCard';
import { ParaphraseIcon } from './icons/ParaphraseIcon';
import { ParaphraseMode } from '../types';
import { paraphraseText } from '../services/geminiService';
import { CopyIcon } from './icons/CopyIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

const ParaphraseTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<ParaphraseMode>(ParaphraseMode.STANDARD);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to paraphrase.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setOutputText('');
    try {
      const result = await paraphraseText(inputText, mode);
      setOutputText(result);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const modes = Object.values(ParaphraseMode);

  return (
    <ToolCard title="Paraphrasing Tool" icon={<ParaphraseIcon className="w-8 h-8" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Column */}
        <div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here..."
            className="w-full h-64 p-3 bg-stone-800/50 border-2 border-stone-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-stone-300 placeholder-stone-500 resize-none"
          />
        </div>
        
        {/* Output Column */}
        <div className="relative">
          <textarea
            value={isLoading ? 'Generating...' : outputText}
            readOnly
            placeholder="Rewritten text will appear here..."
            className="w-full h-64 p-3 bg-stone-800/50 border-2 border-stone-700 rounded-lg text-stone-200 placeholder-stone-500 resize-none"
          />
          {outputText && !isLoading && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 bg-stone-700 hover:bg-amber-600 rounded-md transition-colors"
              title="Copy to clipboard"
            >
              <CopyIcon className="w-5 h-5" />
            </button>
          )}
          {copied && <span className="absolute top-3 right-12 text-xs text-green-400">Copied!</span>}
        </div>
      </div>
      
      {/* Controls */}
      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {modes.map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 border-2 ${mode === m ? 'bg-amber-500 text-stone-900 border-amber-500' : 'bg-stone-700 border-stone-600 hover:bg-stone-600 hover:border-amber-500'}`}
            >
              {m}
            </button>
          ))}
        </div>
        <button
          onClick={handleParaphrase}
          disabled={isLoading}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-amber-600 text-stone-900 font-bold rounded-lg hover:bg-amber-500 disabled:bg-stone-600 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          {isLoading && <SpinnerIcon />}
          {isLoading ? 'Paraphrasing...' : 'Paraphrase'}
        </button>
      </div>

      {error && <p className="mt-4 text-center text-red-400">{error}</p>}
    </ToolCard>
  );
};

export default ParaphraseTool;
