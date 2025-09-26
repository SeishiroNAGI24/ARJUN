import React, { useState } from 'react';
import { Specialization, SpecializationName } from '../types';

interface JobChangeModalProps {
  specializations: Specialization[];
  onConfirm: (specialization: Specialization) => void;
}

const JobChangeModal: React.FC<JobChangeModalProps> = ({ specializations, onConfirm }) => {
  const [selectedSpec, setSelectedSpec] = useState<SpecializationName | null>(null);

  const handleConfirm = () => {
    const spec = specializations.find(s => s.name === selectedSpec);
    if (spec) {
      onConfirm(spec);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-purple-600 rounded-lg shadow-2xl shadow-purple-500/30 max-w-4xl w-full p-8 text-center animate-fadeIn">
        <h2 className="text-4xl font-extrabold text-purple-400 mb-2">Job Change Quest</h2>
        <p className="text-gray-300 mb-8">You have proven your potential. The System now grants you the right to choose your path. This decision is permanent.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {specializations.map(spec => (
            <div
              key={spec.id}
              onClick={() => setSelectedSpec(spec.name)}
              className={`p-6 bg-gray-800 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-purple-900/40 ${selectedSpec === spec.name ? 'border-purple-500 scale-105' : 'border-gray-700'}`}
            >
              <div className="text-5xl mb-4">{spec.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{spec.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{spec.description}</p>
              <p className="font-semibold text-green-400">
                Bonus: +{spec.bonus.amount} {spec.bonus.stat}
              </p>
            </div>
          ))}
        </div>
        
        <button
          onClick={handleConfirm}
          disabled={!selectedSpec}
          className="px-8 py-3 bg-purple-600 text-white font-bold text-lg rounded-lg transition-colors hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          Confirm Specialization
        </button>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default JobChangeModal;