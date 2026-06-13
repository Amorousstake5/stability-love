import { useCallback, useState } from 'react';
import { SocialNPC, MeddleEvent, MeddleTemplate, LifeSpiral, LifeCrisis } from '@/types/society';
import { generateSocialCircle, meddleTemplates, lifeCrises } from '@/data/societyData';

export interface SocietyState {
  circle: SocialNPC[];
  reputation: number; // -100..100
  debt: number;
  spiral: LifeSpiral;
  pendingEvent: MeddleEvent | null;
}

const initialSpiral: LifeSpiral = { pressure: 0, crisesSurvived: 0, activeCrisis: null };

export const useSociety = () => {
  const [society, setSociety] = useState<SocietyState>(() => ({
    circle: [],
    reputation: 0,
    debt: 0,
    spiral: initialSpiral,
    pendingEvent: null,
  }));

  const initSociety = useCallback(() => {
    setSociety({
      circle: generateSocialCircle(),
      reputation: 20,
      debt: 0,
      spiral: initialSpiral,
      pendingEvent: null,
    });
  }, []);

  // Pick a meddle event from a triggering NPC. Returns null if none fires.
  const rollMeddleEvent = useCallback((opts: { hasPartner: boolean; isMarried: boolean; day: number }): MeddleEvent | null => {
    // 55% chance per day-advance
    if (Math.random() > 0.55) return null;
    const eligible: { npc: SocialNPC; tpl: MeddleTemplate; score: number }[] = [];
    society.circle.forEach(npc => {
      meddleTemplates.forEach(tpl => {
        if (tpl.roles && !tpl.roles.includes(npc.role)) return;
        if (tpl.requiresPartner && !opts.hasPartner) return;
        if (tpl.requiresMarried && !opts.isMarried) return;
        const trait = npc.alignment[tpl.trigger];
        const want = tpl.triggerSign === 'negative' ? trait <= -30 : trait >= 30;
        if (!want) return;
        eligible.push({ npc, tpl, score: Math.abs(trait) });
      });
    });
    if (!eligible.length) return null;
    // weighted random
    const total = eligible.reduce((s, e) => s + e.score, 0);
    let pick = Math.random() * total;
    const chosen = eligible.find(e => (pick -= e.score) <= 0) || eligible[0];
    return {
      id: `${chosen.tpl.id}-${Date.now()}`,
      npc: chosen.npc,
      title: chosen.tpl.title.split('{npc}').join(chosen.npc.name),
      description: chosen.tpl.description.split('{npc}').join(chosen.npc.name),
      choices: chosen.tpl.choices,
    };
  }, [society.circle]);

  const setPendingEvent = useCallback((evt: MeddleEvent | null) => {
    setSociety(s => ({ ...s, pendingEvent: evt }));
  }, []);

  const applyMeddleEffects = useCallback((npcId: string, deltas: { reputation?: number; debt?: number; spiral?: number; relationship?: number }) => {
    setSociety(s => {
      const newCircle = s.circle.map(n => n.id === npcId ? { ...n, relationship: Math.max(-100, Math.min(100, n.relationship + (deltas.relationship || 0))) } : n);
      const newReputation = Math.max(-100, Math.min(100, s.reputation + (deltas.reputation || 0)));
      const newDebt = Math.max(0, s.debt + (deltas.debt || 0));
      const newPressure = Math.max(0, Math.min(100, s.spiral.pressure + (deltas.spiral || 0)));
      let activeCrisis = s.spiral.activeCrisis;
      // Trigger a crisis when pressure crosses thresholds with no active crisis
      if (!activeCrisis && newPressure >= 70) {
        const tpl = lifeCrises[Math.floor(Math.random() * lifeCrises.length)];
        activeCrisis = { ...tpl, resolved: false };
      }
      return {
        ...s,
        circle: newCircle,
        reputation: newReputation,
        debt: newDebt,
        spiral: { ...s.spiral, pressure: newPressure, activeCrisis },
        pendingEvent: null,
      };
    });
  }, []);

  const resolveCrisis = useCallback((cost: { stability?: number; debt?: number; reputation?: number }) => {
    setSociety(s => ({
      ...s,
      reputation: Math.max(-100, Math.min(100, s.reputation + (cost.reputation || 0))),
      debt: Math.max(0, s.debt + (cost.debt || 0)),
      spiral: {
        crisesSurvived: s.spiral.crisesSurvived + 1,
        pressure: Math.max(0, s.spiral.pressure - 40),
        activeCrisis: null,
      },
    }));
  }, []);

  // Decay pressure slightly each calm day
  const tickDecay = useCallback(() => {
    setSociety(s => ({ ...s, spiral: { ...s.spiral, pressure: Math.max(0, s.spiral.pressure - 1) } }));
  }, []);

  return { society, initSociety, rollMeddleEvent, setPendingEvent, applyMeddleEffects, resolveCrisis, tickDecay };
};
