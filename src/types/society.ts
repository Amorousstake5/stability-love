import { PlayerStats } from './game';

export type NPCRole = 'auntie' | 'uncle' | 'parent' | 'in-law' | 'neighbour' | 'sibling';

// -100 (bad / toxic) ... 0 (neutral) ... +100 (good / supportive)
export interface NPCAlignment {
  nosiness: number;   // -100 minds own business … +100 prying gossip
  strictness: number; // -100 chill … +100 controlling
  judginess: number;  // -100 accepting … +100 critical
  warmth: number;     // -100 hostile … +100 loving
}

export interface SocialNPC {
  id: string;
  name: string;
  avatar: string;
  role: NPCRole;
  alignment: NPCAlignment;
  relationship: number; // -100 (estranged) … +100 (best ally)
  lastActedDay: number;
}

export interface MeddleChoice {
  text: string;
  effects: {
    stats?: Partial<PlayerStats>;
    stability?: number;
    affection?: number;     // partner
    reputation?: number;    // social standing
    relationship?: number;  // change with this NPC
    debt?: number;
    spiral?: number;        // adds to life-spiral pressure
  };
  description: string;
}

export interface MeddleEvent {
  id: string;
  npc: SocialNPC;
  title: string;
  description: string;
  choices: MeddleChoice[];
}

export interface MeddleTemplate {
  id: string;
  // Which alignment trait must be high for this NPC to trigger it
  trigger: 'nosiness' | 'strictness' | 'judginess' | 'warmth';
  triggerSign: 'positive' | 'negative'; // negative = bad version, positive = supportive
  roles?: NPCRole[]; // restrict to certain roles
  requiresPartner?: boolean;
  requiresMarried?: boolean;
  title: string;
  description: string; // {npc} placeholder
  choices: MeddleChoice[];
}

export type MarriageStage = 'single' | 'dating' | 'engaged' | 'married' | 'divorced';

export interface LifeSpiral {
  pressure: number;   // 0–100; high = bad spiral
  crisesSurvived: number;
  activeCrisis: LifeCrisis | null;
}

export interface LifeCrisis {
  id: string;
  title: string;
  description: string;
  icon: string;
  resolved: boolean;
}
