
import React, { useState } from 'react';
import { Shadow, StatType } from '../types';

interface ShadowsProps {
  shadows: Shadow[];
  onAddShadow: (shadow: Omit<Shadow, 'id'>) => void;
}

const Shadows: React.FC<ShadowsProps> = ({ shadows, onAddShadow }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [boostedStat, setBoostedStat] = useState<StatType>(StatType.Logic);
  const [boostAmount, setBoostAmount] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || boostAmount <= 0) return;
    
    onAddShadow({
      name,
      description,
      boost: {
        stat: boostedStat,
        amount: boostAmount,
      },
    });

    setName('');
    setDescription('');
    setBoostedStat(StatType.Logic);
    setBoostAmount(1);
  };

  return (
    <div>
      <h3 className="text-3xl font-bold text-purple-400 mb-6">Shadow Extraction</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-2xl font-semibold text-white mb-4">Extract New Shadow</h4>
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg space-y-4 border border-gray-700">
            <div>
              <label htmlFor="shadow-name" className="block text-sm font-medium text-gray-300 mb-1">Shadow Name</label>
              <input
                id="shadow-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Igris - QuickSort"
                className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="shadow-desc" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                id="shadow-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optimized pivot selection for QuickSort algorithm."
                rows={3}
                className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label htmlFor="boost-stat" className="block text-sm font-medium text-gray-300 mb-1">Boosted Stat</label>
                    <select
                        id="boost-stat"
                        value={boostedStat}
                        onChange={(e) => setBoostedStat(e.target.value as StatType)}
                        className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500"
                    >
                        {Object.values(StatType).map(stat => <option key={stat} value={stat}>{stat}</option>)}
                    </select>
                </div>
                <div className="flex-1">
                    <label htmlFor="boost-amount" className="block text-sm font-medium text-gray-300 mb-1">Boost Amount</label>
                    <input
                        id="boost-amount"
                        type="number"
                        min="1"
                        value={boostAmount}
                        onChange={(e) => setBoostAmount(parseInt(e.target.value, 10))}
                        className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
            >
              Arise
            </button>
          </form>
        </div>

        <div>
          <h4 className="text-2xl font-semibold text-white mb-4">Shadow Army</h4>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {shadows.length > 0 ? (
              shadows.map(shadow => (
                <div key={shadow.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <p className="font-bold text-lg text-purple-400">{shadow.name}</p>
                  <p className="text-sm text-gray-300 mt-1">{shadow.description}</p>
                  <p className="text-xs text-green-400 mt-2">
                    Passive Boost: +{shadow.boost.amount} {shadow.boost.stat}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-gray-800 rounded-lg border border-dashed border-gray-600">
                <p className="text-gray-500">No shadows extracted.</p>
                <p className="text-gray-500">Master concepts and summon your army.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shadows;
