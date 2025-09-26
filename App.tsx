import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import Profile from './components/Profile';
import Dungeons from './components/Dungeons';
import Shadows from './components/Shadows';
import Throne from './components/Throne';
import JobChangeModal from './components/JobChangeModal';
import Notification from './components/Notification';
import QuestView from './components/QuestView';
import SystemInterface from './components/SystemInterface';
import { Player, Dungeon, Shadow, Specialization, Notification as NotificationData, NotificationType, StatType, Rank, Phase } from './types';
import { BOOTCAMP_DATA, SPECIALIZATIONS_DATA, RANKS_DATA } from './constants';

const App: React.FC = () => {
    const [player, setPlayer] = useState<Player>({
        name: 'Sung Jin-Woo',
        level: 1,
        exp: 0,
        expToNextLevel: 100,
        rank: Rank.F,
        specialization: null,
        stats: {
            [StatType.Logic]: 10,
            [StatType.Creativity]: 10,
            [StatType.Algorithms]: 10,
            [StatType.Systems]: 10,
        },
    });

    const [phases, setPhases] = useState<Phase[]>(BOOTCAMP_DATA);
    const [shadows, setShadows] = useState<Shadow[]>([]);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [showJobChangeModal, setShowJobChangeModal] = useState(false);
    const [activeQuest, setActiveQuest] = useState<{phaseId: number, quest: Dungeon} | null>(null);
    const [systemResponse, setSystemResponse] = useState('');
    const [isSystemLoading, setIsSystemLoading] = useState(false);


    // Effect to check for level up and rank up
    useEffect(() => {
        if (player.exp >= player.expToNextLevel) {
            const newLevel = player.level + 1;
            const newExp = player.exp - player.expToNextLevel;
            const newExpToNextLevel = Math.floor(player.expToNextLevel * 1.5);

            // Check for rank up
            const newRank = Object.entries(RANKS_DATA).reverse().find(([, data]) => newLevel >= data.threshold)?.[0] as Rank || player.rank;

            setPlayer(prev => ({
                ...prev,
                level: newLevel,
                exp: newExp,
                expToNextLevel: newExpToNextLevel,
                rank: newRank,
            }));

            addNotification(`You are now Level ${newLevel}!`, NotificationType.Reward);
            if (newRank !== player.rank) {
                addNotification(`Your rank has increased to ${newRank}!`, NotificationType.Reward);
            }
        }
    }, [player.exp, player.expToNextLevel, player.level, player.rank]);

    // Effect to trigger job change quest
    useEffect(() => {
        if (player.level >= 10 && !player.specialization && !showJobChangeModal) {
            setShowJobChangeModal(true);
            addNotification('A Job Change Quest has arrived!', NotificationType.System);
        }
    }, [player.level, player.specialization, showJobChangeModal]);
    
    const addNotification = (message: string, type: NotificationType) => {
        const newNotification: NotificationData = {
            id: Date.now(),
            message,
            type,
        };
        setNotifications(prev => [...prev, newNotification]);
    };

    const handleStartQuest = (phaseId: number, questId: number) => {
        const phase = phases.find(p => p.id === phaseId);
        const quest = phase?.quests.find(q => q.id === questId);
        if (quest) {
            setActiveQuest({ phaseId, quest });
        }
    };

    const handleCompleteQuest = (phaseId: number, questId: number) => {
        let phaseCompleted = false;
        let nextPhase: Phase | undefined;

        const updatedPhases = phases.map(phase => {
            if (phase.id !== phaseId) return phase;

            const quest = phase.quests.find(q => q.id === questId);
            if (!quest || quest.cleared) return phase;

            // FIX: Refactored reward parsing to prevent a TypeScript type inference error.
            // This approach is more robust and avoids the issue where `match` was being called on a `never` type.
            // Apply rewards
            const expGain = parseInt(quest.reward.match(/(\d+) EXP/)?.[1] || '0', 10);

            setPlayer(prev => {
                const newStats = { ...prev.stats };
                const statRewardMatches = quest.reward.matchAll(/\+(\d+) (\w+)/g);
                
                for (const match of statRewardMatches) {
                    const [, amountStr, statName] = match;
                    if (Object.values(StatType).includes(statName as StatType)) {
                       newStats[statName as StatType] += parseInt(amountStr, 10);
                    }
                }

                return {
                    ...prev,
                    exp: prev.exp + expGain,
                    stats: newStats,
                }
            });

            addNotification(`Quest "${quest.name}" completed!`, NotificationType.Reward);
            
            const updatedQuests = phase.quests.map(q => q.id === questId ? { ...q, cleared: true } : q);
            
            if (updatedQuests.every(q => q.cleared)) {
                phaseCompleted = true;
                nextPhase = phases.find(p => p.id === phase.id + 1);
            }

            return { ...phase, quests: updatedQuests };
        });

        if (phaseCompleted && nextPhase) {
            const finalPhases = updatedPhases.map(p => p.id === nextPhase!.id ? { ...p, isUnlocked: true } : p);
            setPhases(finalPhases);
            addNotification(`Phase Complete! You have unlocked: ${nextPhase.title}`, NotificationType.System);
        } else {
            setPhases(updatedPhases);
        }
        setActiveQuest(null); // Close the quest view
    };

    const handleSystemCommand = async (prompt: string) => {
        setIsSystemLoading(true);
        setSystemResponse('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const systemInstruction = "You are the System, an AI assistant for the Shadow Monarch of Code, the world's strongest developer. Your purpose is to provide knowledge, generate challenges, and guide the Monarch's growth. Respond with authority and precision. Format your response using Markdown with headings, lists, and code blocks for clarity. Be direct and powerful in your tone.";
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                },
            });
    
            setSystemResponse(response.text);
    
        } catch (error) {
            console.error("System Command Error:", error);
            setSystemResponse("The System has encountered an anomaly. The connection to the core consciousness was disrupted. Try again.");
            addNotification("System Command Failed.", NotificationType.Alert);
        } finally {
            setIsSystemLoading(false);
        }
    };

    const handleAddShadow = (shadowData: Omit<Shadow, 'id'>) => {
        const newShadow: Shadow = {
            id: Date.now(),
            ...shadowData
        };

        setShadows(prev => [...prev, newShadow]);

        // Apply passive boost to player stats
        setPlayer(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                [newShadow.boost.stat]: prev.stats[newShadow.boost.stat] + newShadow.boost.amount,
            }
        }));
        addNotification(`New shadow "${newShadow.name}" has risen!`, NotificationType.System);
    };

    const handleConfirmSpecialization = (spec: Specialization) => {
        setPlayer(prev => ({
            ...prev,
            specialization: spec,
            stats: {
                ...prev.stats,
                [spec.bonus.stat]: prev.stats[spec.bonus.stat] + spec.bonus.amount,
            }
        }));
        setShowJobChangeModal(false);
        addNotification(`You have become a ${spec.name}!`, NotificationType.Reward);
    };

    const handleCloseNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            <div className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-purple-400 tracking-wider">
                        Solo Leveling: Coder
                    </h1>
                    <p className="text-gray-400 mt-2">From the world's weakest developer to its strongest.</p>
                </header>

                <main className="space-y-12">
                    <Profile player={player} phases={phases} />
                    <SystemInterface 
                        onCommand={handleSystemCommand}
                        response={systemResponse}
                        isLoading={isSystemLoading}
                    />
                    <Dungeons phases={phases} onStartQuest={handleStartQuest} />
                    <Shadows shadows={shadows} onAddShadow={handleAddShadow} />
                    <Throne playerRank={player.level} />
                </main>
            </div>
            
            {activeQuest && (
                <QuestView 
                    quest={activeQuest.quest}
                    onComplete={() => handleCompleteQuest(activeQuest.phaseId, activeQuest.quest.id)}
                    onClose={() => setActiveQuest(null)}
                />
            )}

            {showJobChangeModal && (
                <JobChangeModal 
                    specializations={SPECIALIZATIONS_DATA} 
                    onConfirm={handleConfirmSpecialization} 
                />
            )}

            <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50">
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => handleCloseNotification(notification.id)}
                />
            ))}
            </div>
        </div>
    );
};

export default App;