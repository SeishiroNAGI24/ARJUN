
import React, { useEffect } from 'react';
import { NotificationType } from '../types';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

const ICONS = {
  [NotificationType.System]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  [NotificationType.Reward]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  [NotificationType.Alert]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

const BORDER_COLORS = {
  [NotificationType.System]: 'border-purple-500',
  [NotificationType.Reward]: 'border-green-500',
  [NotificationType.Alert]: 'border-red-500',
};

const TEXT_COLORS = {
    [NotificationType.System]: 'text-purple-300',
    [NotificationType.Reward]: 'text-green-300',
    [NotificationType.Alert]: 'text-red-300',
};


const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification-enter-exit flex items-center gap-4 bg-gray-900 border-2 ${BORDER_COLORS[type]} rounded-lg shadow-2xl shadow-purple-900/20 px-6 py-3 min-w-[300px] max-w-md`}>
        <div className={TEXT_COLORS[type]}>
            {ICONS[type]}
        </div>
        <p className="text-gray-200 font-semibold">{message}</p>
        <button onClick={onClose} className="ml-auto text-gray-500 hover:text-white">&times;</button>
        <style>{`
            @keyframes slideInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            .notification-enter-exit {
                animation: slideInUp 0.5s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default Notification;
