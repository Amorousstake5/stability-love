export interface PlayerStats {
  wealth: number;
  strength: number;
  looks: number;
  intelligence: number;
  education: number;
  health: number;
}

export interface Player {
  name: string;
  avatar: string;
  stats: PlayerStats;
  stabilityIndex: number;
  day: number;
  achievements: Achievement[];
}

export interface AIPartner {
  name: string;
  avatar: string;
  personality: string;
  preferences: Record<keyof PlayerStats, number>;
  affection: number;
  relationshipStatus: 'stranger' | 'acquaintance' | 'dating' | 'committed';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  icon: string;
  statChanges: Partial<PlayerStats>;
  stabilityChange: number;
  duration: number;
}

export interface DialogueOption {
  text: string;
  stats: string[];
  affectionBonus: number;
}

export interface DialogueLine {
  speaker: 'player' | 'partner';
  text?: string;
  options?: DialogueOption[];
}

export interface DateScenario {
  id: string;
  name: string;
  icon: string;
  description: string;
  requiredAffection: number;
  dialogue: DialogueLine[];
}

export interface GameSettings {
  playerName: string;
  playerAvatar: string;
  partnerName: string;
  partnerAvatar: string;
  partnerPersonality: string;
  statPoints: PlayerStats;
}

export interface PotentialPartner {
  id: string;
  name: string;
  avatar: string;
  age: number;
  bio: string;
  personality: string;
  personalityId: string;
  traits: string[];
  compatibilityHint: string;
  preferences: Record<keyof PlayerStats, number>;
}

export interface RandomEventChoice {
  text: string;
  risk: 'low' | 'medium' | 'high';
  effects: Partial<PlayerStats>;
  affectionChange: number;
  stabilityMultiplier: number;
}

export interface RandomEvent {
  id: string;
  title: string;
  category: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
  choices: RandomEventChoice[];
}

export type StatKey = keyof PlayerStats;
