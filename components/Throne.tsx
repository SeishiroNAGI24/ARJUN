
import React from 'react';
import { LEADERBOARD_DATA } from '../constants';
import { Rank } from '../types';
import { RANKS_DATA } from '../constants';

const Throne: React.FC<{ playerRank: number }> = ({ playerRank }) => {
    
  // Simple logic to update player rank on leaderboard
  const updatedLeaderboard = LEADERBOARD_DATA.map(entry => 
    entry.name === 'You' ? { ...entry, level: playerRank } : entry
  ).sort((a, b) => b.level - a.level).map((entry, index) => ({...entry, rank: index + 1}));

  return (
    <div>
      <h3 className="text-3xl font-bold text-purple-400 mb-2">Monarch's Throne</h3>
      <p className="text-gray-400 mb-6">The global rankings of the Sovereigns of Code. Only the strongest may sit here.</p>

      <div className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4 font-semibold text-purple-400">Rank</th>
              <th className="p-4 font-semibold text-purple-400">Name</th>
              <th className="p-4 font-semibold text-purple-400">Level</th>
              <th className="p-4 font-semibold text-purple-400">Title</th>
            </tr>
          </thead>
          <tbody>
            {updatedLeaderboard.map((entry, index) => {
              const rankColor = RANKS_DATA[entry.title as Rank]?.color || 'text-gray-400';
              const isPlayer = entry.name === 'You';
              return (
                <tr key={index} className={`border-t border-gray-800 transition-colors ${isPlayer ? 'bg-purple-900/30' : 'hover:bg-gray-800/50'}`}>
                  <td className={`p-4 font-bold ${entry.rank === 1 ? 'text-yellow-400' : 'text-white'}`}>{entry.rank}</td>
                  <td className={`p-4 font-semibold ${isPlayer ? 'text-purple-300' : 'text-white'}`}>{entry.name}</td>
                  <td className="p-4 text-gray-300">{entry.level}</td>
                  <td className={`p-4 font-semibold ${rankColor}`}>{entry.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Throne;
