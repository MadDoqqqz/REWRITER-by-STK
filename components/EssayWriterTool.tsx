
import React, { useState } from 'react';
import ToolCard from './ToolCard';
import { EssayIcon } from './icons/EssayIcon';
import { EssayTone, EssayLength } from '../types';
import { writeEssay } from '../services/geminiService';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { CopyIcon } from './icons/CopyIcon';

const EssayWriterTool: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<EssayTone>(EssayTone.INFORMATIVE);
  const [length, setLength] = useState<EssayLength>(EssayLength.MEDIUM);
  const [generatedEssay, setGeneratedEssay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic for the essay.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedEssay('');
    try {
      const result = await writeEssay(topic, tone, length);
      setGeneratedEssay(result);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEssay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <ToolCard title="AI Essay Writer" icon={<EssayIcon className="w-8 h-8" />}>
      <div className="flex flex-col gap-4">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter essay topic"
            className="md:col-span-1 p-3 bg-stone-800/50 border-2 border-stone-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-stone-300 placeholder-stone-500"
          />
          <select value={tone} onChange={(e) => setTone(e.target.value as EssayTone)} className="p-3 bg-stone-800 border-2 border-stone-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-stone-300">
            {Object.values(EssayTone).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={length} onChange={(e) => setLength(e.target.value as EssayLength)} className="p-3 bg-stone-800 border-2 border-stone-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-stone-300">
            {Object.values(EssayLength).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-amber-600 text-stone-900 font-bold rounded-lg hover:bg-amber-500 disabled:bg-stone-600 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          {isLoading && <SpinnerIcon />}
          {isLoading ? 'Generating...' : 'Generate Essay'}
        </button>

        {error && <p className="text-center text-red-400">{error}</p>}
        
        {/* Output */}
        <div className="relative mt-4">
          <textarea
            value={isLoading ? 'The AI is crafting your essay...' : generatedEssay}
            readOnly
            placeholder="Your generated essay will appear here."
            className="w-full h-96 p-3 bg-stone-800/50 border-2 border-stone-700 rounded-lg text-stone-200 placeholder-stone-500 resize-y"
          />
          {generatedEssay && !isLoading && (
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
    </ToolCard>
  );
};

export default EssayWriterTool;
