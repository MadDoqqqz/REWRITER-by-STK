
import React, { useState } from 'react';
import ToolCard from './ToolCard';
import { DetectIcon } from './icons/DetectIcon';
import { AiDetectionResult } from '../types';
import { detectAiContent } from '../services/geminiService';
import { SpinnerIcon } from './icons/SpinnerIcon';

const AiDetectTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<AiDetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setResult(null);
    try {
      const analysis = await detectAiContent(inputText);
      setResult(analysis);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const highlightText = (originalText: string, sentencesToHighlight: string[]) => {
    if (!sentencesToHighlight || sentencesToHighlight.length === 0) {
      return <p className="text-stone-300 whitespace-pre-wrap">{originalText}</p>;
    }
    
    const regex = new RegExp(`(${sentencesToHighlight.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
    const parts = originalText.split(regex);

    return (
      <p className="text-stone-300 whitespace-pre-wrap">
        {parts.map((part, index) =>
          sentencesToHighlight.includes(part) ? (
            <span key={index} className="bg-amber-400/30 rounded px-1 py-0.5">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </p>
    );
  };

  return (
    <ToolCard title="AI Content Detector" icon={<DetectIcon className="w-8 h-8" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Area */}
        <div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste text here to analyze for AI generation..."
            className="w-full h-80 p-3 bg-stone-800/50 border-2 border-stone-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-stone-300 placeholder-stone-500 resize-none"
          />
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full mt-4 flex items-center justify-center gap-2 px-8 py-3 bg-amber-600 text-stone-900 font-bold rounded-lg hover:bg-amber-500 disabled:bg-stone-600 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            {isLoading && <SpinnerIcon />}
            {isLoading ? 'Analyzing...' : 'Analyze Text'}
          </button>
        </div>
        
        {/* Results Area */}
        <div className="h-80 flex flex-col items-center justify-center bg-stone-800/50 border-2 border-stone-700 rounded-lg p-4">
          {isLoading && <SpinnerIcon size="lg" />}
          {error && <p className="text-center text-red-400">{error}</p>}
          {!isLoading && !error && result && (
             <div className="w-full h-full flex flex-col">
                <div className="text-center mb-4">
                    <p className="text-stone-400 text-sm">AI-Generated Probability</p>
                    <p className="text-4xl font-bold text-amber-400 font-display">{result.ai_probability}%</p>
                </div>
                 <div className="flex-grow overflow-y-auto p-3 bg-stone-900/50 rounded-md border border-stone-600">
                    <h4 className="font-bold text-stone-200 mb-2">Analysis:</h4>
                    {highlightText(inputText, result.suspicious_sentences)}
                </div>
            </div>
          )}
          {!isLoading && !error && !result && (
            <div className="text-center text-stone-400">
              <DetectIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>Analysis results will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </ToolCard>
  );
};

export default AiDetectTool;
