export type LifeStage = 'childhood' | 'teen' | 'youngAdult' | 'adult';

export interface RPGStats {
  health: number;       // 0-100
  intelligence: number; // 0-100
  charm: number;        // 0-100
  happiness: number;    // 0-100
  wealth: number;       // family/personal wealth 0-100
  reputation: number;   // social standing 0-100
}

export interface Parent {
  name: string;
  alive: boolean;
  health: number;       // 0-100
  strictness: number;   // 0-100, random per game
  warmth: number;       // 0-100
}

export interface Romance {
  name: string;
  type: 'girlfriend' | 'boyfriend';
  affection: number;        // 0-100
  compatibility: number;    // 0-100 hidden modifier
  approvedByFamily: boolean;
  startedAtAge: number;
  status: 'active' | 'broken' | 'married';
}

export interface RPGCharacter {
  name: string;
  hometown: string;
  age: number;
  stage: LifeStage;
  stats: RPGStats;
  father: Parent;
  mother: Parent;
  siblings: number;
  romance: Romance | null;
  log: string[]; // life log
  alive: boolean;
  ended: boolean;
  endingTitle?: string;
}

export interface RPGChoice {
  label: string;
  effects: Partial<RPGStats> & {
    parentHealth?: number;
    parentWarmth?: number;
    romanceAffection?: number;
    triggerBreakup?: boolean;
    triggerRomance?: 'girlfriend' | 'boyfriend';
    logLine?: string;
  };
  resultText: string;
}

export interface RPGEvent {
  id: string;
  title: string;
  text: (c: RPGCharacter) => string;
  minAge: number;
  maxAge: number;
  weight?: number;
  condition?: (c: RPGCharacter) => boolean;
  choices: (c: RPGCharacter) => RPGChoice[];
}
