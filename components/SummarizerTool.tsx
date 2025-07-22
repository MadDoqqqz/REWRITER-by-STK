
import React, { useState } from 'react';
import ToolCard from './ToolCard';
import { SummarizeIcon } from './icons/SummarizeIcon';
import { SummaryLength } from '../types';
import { summarizeText } from '../services/geminiService';
import { CopyIcon } from './icons/CopyIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

const SummarizerTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [length, setLength] = useState<SummaryLength>(SummaryLength.MEDIUM);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setOutputText('');
    try {
      const result = await summarizeText(inputText, length);
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

  return (
    <ToolCard title="Text Summarizer" icon={<SummarizeIcon className="w-8 h-8" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Column */}
        <div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste a long text or article here..."
            className="w-full h-64 p-3 bg-stone-800/50 border-2 border-stone-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-stone-300 placeholder-stone-500 resize-none"
          />
        </div>
        
        {/* Output Column */}
        <div className="relative">
          <textarea
            value={isLoading ? 'Summarizing...' : outputText}
            readOnly
            placeholder="The summary will appear here..."
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
         <div className="flex items-center gap-3">
            <label htmlFor="summary-length" className="text-stone-300 font-semibold">Summary Length:</label>
            <select 
                id="summary-length"
                value={length} 
                onChange={(e) => setLength(e.target.value as SummaryLength)} 
                className="p-2 bg-stone-800 border-2 border-stone-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-stone-300"
            >
                <option value={SummaryLength.SHORT}>Short</option>
                <option value={SummaryLength.MEDIUM}>Medium</option>
                <option value={SummaryLength.LONG}>Long</option>
            </select>
         </div>
        <button
          onClick={handleSummarize}
          disabled={isLoading}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-amber-600 text-stone-900 font-bold rounded-lg hover:bg-amber-500 disabled:bg-stone-600 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          {isLoading && <SpinnerIcon />}
          {isLoading ? 'Summarizing...' : 'Summarize'}
        </button>
      </div>

      {error && <p className="mt-4 text-center text-red-400">{error}</p>}
    </ToolCard>
  );
};

export default SummarizerTool;
