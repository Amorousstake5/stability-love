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

export interface Match {
  id: string;
  name: string;
  age: number;
  avatar: string;
  bio: string;
  interests: string[];
  preferences: Partial<PlayerStats>;
  compatibilityScore?: number;
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

export type StatKey = keyof PlayerStats;
