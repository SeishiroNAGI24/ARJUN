
import React from 'react';
import { Player, Rank, Phase } from '../types';
import { RANKS_DATA } from '../constants';

interface ProfileProps {
  player: Player;
  phases: Phase[];
}

const Profile: React.FC<ProfileProps> = ({ player, phases }) => {
  const { name, level, exp, expToNextLevel, rank, specialization, stats } = player;

  const expPercentage = (exp / expToNextLevel) * 100;
  const rankInfo = RANKS_DATA[rank] || RANKS_DATA[Rank.F];

  const currentPhase = phases.find(p => p.isUnlocked && !p.quests.every(q => q.cleared)) || phases[phases.length - 1];

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-bold text-white">{name}</h2>
          <p className={`text-xl font-semibold ${rankInfo.color}`}>{rank}</p>
          {specialization && <p className="text-purple-400 text-lg">{specialization.name}</p>}
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">Level {level}</p>
          <p className="text-sm text-gray-400">{exp} / {expToNextLevel} EXP</p>
        </div>
      </div>
      
      {currentPhase && (
        <div className="mt-4 p-3 bg-gray-800/50 rounded-md border border-gray-700">
            <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Current Mission</p>
            <p className="text-lg text-white font-bold">{currentPhase.title}</p>
        </div>
      )}
      
      <div className="w-full bg-gray-700 rounded-full h-2.5 my-6">
        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${expPercentage}%` }}></div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-white mb-3">Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats).map(([stat, value]) => (
            <div key={stat} className="bg-gray-800 p-3 rounded-md text-center">
              <p className="text-sm text-gray-400">{stat}</p>
              <p className="text-xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;