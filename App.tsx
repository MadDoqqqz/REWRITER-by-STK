
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AngkorWatBackground from './components/AngkorWatBackground';
import ParaphraseTool from './components/ParaphraseTool';
import AiDetectTool from './components/AiDetectTool';
import EssayWriterTool from './components/EssayWriterTool';
import SummarizerTool from './components/SummarizerTool';
import { Tool } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.PARAPHRASE);

  const renderTool = () => {
    switch (activeTool) {
      case Tool.PARAPHRASE:
        return <ParaphraseTool />;
      case Tool.AI_DETECT:
        return <AiDetectTool />;
      case Tool.ESSAY_WRITER:
        return <EssayWriterTool />;
      case Tool.SUMMARIZER:
        return <SummarizerTool />;
      default:
        return <ParaphraseTool />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#2a2721] text-stone-200 overflow-x-hidden">
      <AngkorWatBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header activeTool={activeTool} setActiveTool={setActiveTool} />
        <main className="flex-grow flex items-center justify-center p-4 md:p-8">
          {renderTool()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
