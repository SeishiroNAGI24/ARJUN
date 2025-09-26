import React from 'react';
import { Phase } from '../types';

interface DungeonsProps {
  phases: Phase[];
  onStartQuest: (phaseId: number, questId: number) => void;
}

const DIFFICULTY_COLORS = {
    Easy: 'text-green-400 border-green-400',
    Medium: 'text-yellow-400 border-yellow-400',
    Hard: 'text-red-400 border-red-400',
    Nightmare: 'text-purple-400 border-purple-400',
}

const Dungeons: React.FC<DungeonsProps> = ({ phases, onStartQuest }) => {
  return (
    <div>
      <h3 className="text-3xl font-bold text-purple-400 mb-6">Bootcamp Curriculum</h3>
      <div className="space-y-8">
        {phases.map(phase => (
          <div key={phase.id} className={`p-6 rounded-lg border transition-all duration-500 ${phase.isUnlocked ? 'border-purple-800 bg-gray-900/50' : 'border-gray-700 bg-gray-800/30'}`}>
            <h4 className={`text-2xl font-bold flex items-center gap-4 ${phase.isUnlocked ? 'text-white' : 'text-gray-500'}`}>
              {phase.title}
              {!phase.isUnlocked && 
                <span className="text-xs font-semibold px-2 py-1 bg-gray-700 text-gray-400 rounded-md flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
                    LOCKED
                </span>
              }
            </h4>
            <p className={`mt-2 text-sm mb-6 ${phase.isUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>
              {phase.theme}
            </p>
            {phase.isUnlocked && (
              <div className="space-y-4">
                {phase.quests.map(quest => (
                  <div key={quest.id} className={`p-4 rounded-lg flex items-center justify-between transition-all ${quest.cleared ? 'bg-gray-800/50 border border-gray-700 opacity-60' : 'bg-gray-800 border border-gray-700 hover:border-purple-600'}`}>
                    <div>
                      <p className={`font-bold text-lg ${quest.cleared ? 'text-gray-500 line-through' : 'text-white'}`}>{quest.name}</p>
                      <p className={`text-sm ${quest.cleared ? 'text-gray-600' : 'text-gray-400'}`}>{quest.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 border rounded-full ${DIFFICULTY_COLORS[quest.difficulty]}`}>
                          {quest.difficulty}
                        </span>
                        <span className="text-xs text-green-400">{quest.reward}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onStartQuest(phase.id, quest.id)}
                      disabled={quest.cleared}
                      className="px-4 py-2 font-bold rounded-md transition-colors disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed bg-purple-600 text-white hover:bg-purple-700"
                    >
                      {quest.cleared ? 'Completed' : 'Start Quest'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dungeons;