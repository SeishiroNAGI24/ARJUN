
export enum StatType {
  Logic = 'Logic',
  Creativity = 'Creativity',
  Algorithms = 'Algorithms',
  Systems = 'Systems',
}

export interface Stat {
  type: StatType;
  value: number;
}

export interface Boost {
  stat: StatType;
  amount: number;
}

export interface Shadow {
  id: number;
  name: string;
  description: string;
  boost: Boost;
}

export enum Rank {
  S = 'S-Rank',
  A = 'A-Rank',
  B = 'B-Rank',
  C = 'C-Rank',
  D = 'D-Rank',
  E = 'E-Rank',
  F = 'F-Rank',
}

export enum SpecializationName {
  FrontendMaster = 'Frontend Master',
  BackendLegend = 'Backend Legend',
  DevOpsOverlord = 'DevOps Overlord',
}

export interface Specialization {
  id: number;
  name: SpecializationName;
  description: string;
  icon: string;
  bonus: Boost;
}

export enum NotificationType {
  System = 'System',
  Reward = 'Reward',
  Alert = 'Alert',
}

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

export interface Dungeon {
    id: number;
    name: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Nightmare';
    reward: string;
    cleared: boolean;
}

export interface Phase {
  id: number;
  title: string;
  theme: string;
  isUnlocked: boolean;
  quests: Dungeon[];
}

export interface Player {
    name: string;
    level: number;
    exp: number;
    expToNextLevel: number;
    rank: Rank;
    specialization: Specialization | null;
    stats: Record<StatType, number>;
}