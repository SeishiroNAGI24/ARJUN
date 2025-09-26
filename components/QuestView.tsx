import React, { useState, useEffect } from 'react';
import { Dungeon } from '../types';
import { QUEST_CONTENT } from '../questContent';

interface QuestViewProps {
  quest: Dungeon;
  onComplete: () => void;
  onClose: () => void;
}

type AnalysisResult = {
    correct: boolean;
    feedback: string;
} | null;

const QuestView: React.FC<QuestViewProps> = ({ quest, onComplete, onClose }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const content = QUEST_CONTENT[quest.id];

  // State for the new interactive code practice
  const [userCode, setUserCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(null);

  useEffect(() => {
    // Set initial code when component mounts or quest changes
    if (content?.practice?.initialCode) {
      setUserCode(content.practice.initialCode);
    } else {
      setUserCode('');
    }
    // Reset analysis when quest changes
    setAnalysisResult(null); 
  }, [quest.id, content]);

  const handleAnalyzeCode = () => {
    if (!content?.practice?.solutionChecker) return;

    try {
      // Safely create the checker function from the string in questContent
      const checkerFunction = new Function('return ' + content.practice.solutionChecker)();
      const result = checkerFunction(userCode);
      setAnalysisResult(result);
    } catch (e) {
      setAnalysisResult({ correct: false, feedback: 'A critical error occurred during analysis.' });
      console.error("Analysis Error:", e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-gray-900 border-2 border-purple-600 rounded-lg shadow-2xl shadow-purple-500/30 max-w-4xl w-full h-[90vh] flex flex-col">
        <header className="p-6 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-purple-400">{quest.name}</h2>
            <p className="text-gray-400">{quest.description}</p>
          </div>
          <button onClick={onClose} className="text-3xl text-gray-500 hover:text-white transition-colors">&times;</button>
        </header>

        <main className="flex-grow p-6 overflow-y-auto">
          <div className="border-b border-gray-700 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('learn')}
                className={`py-2 px-1 font-semibold transition-colors ${activeTab === 'learn' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
              >
                Learn
              </button>
              <button
                onClick={() => setActiveTab('practice')}
                className={`py-2 px-1 font-semibold transition-colors ${activeTab === 'practice' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
              >
                Practice
              </button>
            </nav>
          </div>

          {!content ? (
             <div className="text-center text-gray-500 py-10">
                <p className="text-xl">Training module for this quest is under development.</p>
                <p>For now, you may complete it based on prior knowledge.</p>
                <button onClick={onComplete} className="mt-6 px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors">
                  Complete Quest
                </button>
             </div>
          ) : (
            <div>
              {activeTab === 'learn' && (
                <div className="prose prose-invert max-w-none prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-headings:text-purple-400" dangerouslySetInnerHTML={{ __html: content.learn }} />
              )}

              {activeTab === 'practice' && content.practice && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Task</h3>
                  <p className="text-gray-300 mb-4">{content.practice.task}</p>
                  
                  <textarea
                    value={userCode}
                    onChange={(e) => {
                      setUserCode(e.target.value)
                      setAnalysisResult(null); // Reset analysis on code change
                    }}
                    placeholder="Enter your code here..."
                    className="w-full h-48 bg-gray-950 border border-gray-700 rounded-md p-4 font-mono text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    spellCheck="false"
                  />

                  {analysisResult && (
                      <div className={`mt-4 p-3 rounded-md text-center font-bold ${analysisResult.correct ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                          {analysisResult.feedback}
                      </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    {analysisResult?.correct ? (
                         <button onClick={onComplete} className="px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors animate-pulse">
                            Complete Quest
                         </button>
                    ) : (
                         <button onClick={handleAnalyzeCode} disabled={!userCode} className="px-6 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                            Analyze Code
                         </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .prose-invert code::before, .prose-invert code::after { content: '' !important; }
      `}</style>
    </div>
  );
};

export default QuestView;