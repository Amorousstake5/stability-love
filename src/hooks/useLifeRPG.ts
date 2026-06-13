import { useCallback, useState } from 'react';
import { RPGCharacter, RPGChoice, RPGEvent, RPGStats } from '@/types/rpg';
import { pickEvent, randomName, stageForAge } from '@/data/lifeEvents';

const clamp = (n: number) => Math.max(0, Math.min(100, n));

const baseStats = (): RPGStats => ({
  health: 70 + Math.floor(Math.random() * 15),
  intelligence: 40 + Math.floor(Math.random() * 30),
  charm: 35 + Math.floor(Math.random() * 30),
  happiness: 70,
  wealth: 30 + Math.floor(Math.random() * 40),
  reputation: 50,
});

export interface NewGameInput {
  name: string;
  hometown: string;
  fatherName: string;
  motherName: string;
  siblings: number;
}

export const useLifeRPG = () => {
  const [character, setCharacter] = useState<RPGCharacter | null>(null);
  const [pendingEvent, setPendingEvent] = useState<RPGEvent | null>(null);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const startGame = useCallback((input: NewGameInput) => {
    const c: RPGCharacter = {
      name: input.name,
      hometown: input.hometown,
      age: 5,
      stage: 'childhood',
      stats: baseStats(),
      father: {
        name: input.fatherName,
        alive: true,
        health: 50 + Math.floor(Math.random() * 40),
        strictness: Math.floor(Math.random() * 100),
        warmth: 40 + Math.floor(Math.random() * 50),
      },
      mother: {
        name: input.motherName,
        alive: true,
        health: 55 + Math.floor(Math.random() * 40),
        strictness: Math.floor(Math.random() * 80),
        warmth: 55 + Math.floor(Math.random() * 45),
      },
      siblings: input.siblings,
      romance: null,
      log: [`Born in ${input.hometown}. Started life at age 5.`],
      alive: true,
      ended: false,
    };
    setCharacter(c);
    setLastResult(null);
    setPendingEvent(pickEvent(c));
  }, []);

  const abandon = useCallback(() => {
    setCharacter(null);
    setPendingEvent(null);
    setLastResult(null);
  }, []);

  const checkEnding = (c: RPGCharacter): RPGCharacter => {
    if (c.age >= 75) return { ...c, ended: true, endingTitle: 'A Life Well Lived' };
    if (c.stats.health <= 0) return { ...c, alive: false, ended: true, endingTitle: 'Your Story Ends Early' };
    if (c.stats.happiness <= 0 && c.stats.wealth <= 10) return { ...c, ended: true, endingTitle: 'Life Gone to Worse' };
    return c;
  };

  const advanceYear = (c: RPGCharacter): RPGCharacter => {
    const newAge = c.age + 1;
    const stats = { ...c.stats };
    // natural aging
    stats.health = clamp(stats.health - (newAge > 50 ? 2 : 0));
    stats.happiness = clamp(stats.happiness - 1);
    // parents age
    const father = { ...c.father };
    const mother = { ...c.mother };
    if (father.alive) {
      father.health = clamp(father.health - (newAge > 25 ? 3 : 1));
      if (father.health <= 0) { father.alive = false; }
    }
    if (mother.alive) {
      mother.health = clamp(mother.health - (newAge > 25 ? 2 : 1));
      if (mother.health <= 0) { mother.alive = false; }
    }
    const log = [...c.log];
    if (father.alive !== c.father.alive) log.push(`${father.name} passed away. You were ${newAge}.`);
    if (mother.alive !== c.mother.alive) log.push(`${mother.name} passed away. You were ${newAge}.`);
    return { ...c, age: newAge, stage: stageForAge(newAge), stats, father, mother, log };
  };

  const applyChoice = useCallback((choice: RPGChoice) => {
    if (!character || !pendingEvent) return;
    let c: RPGCharacter = { ...character, stats: { ...character.stats } };

    // Stat effects
    (['health','intelligence','charm','happiness','wealth','reputation'] as (keyof RPGStats)[]).forEach(k => {
      if (choice.effects[k] != null) c.stats[k] = clamp(c.stats[k] + (choice.effects[k] as number));
    });

    // Parent effects (split between both alive parents)
    if (choice.effects.parentHealth) {
      const d = choice.effects.parentHealth;
      if (c.father.alive) c.father = { ...c.father, health: clamp(c.father.health + d) };
      if (c.mother.alive) c.mother = { ...c.mother, health: clamp(c.mother.health + d) };
    }
    if (choice.effects.parentWarmth) {
      const d = choice.effects.parentWarmth;
      c.father = { ...c.father, warmth: clamp(c.father.warmth + d) };
      c.mother = { ...c.mother, warmth: clamp(c.mother.warmth + d) };
    }

    // Romance
    if (choice.effects.triggerRomance && !c.romance) {
      const gender = choice.effects.triggerRomance;
      c.romance = {
        name: randomName(gender === 'girlfriend' ? 'girl' : 'boy'),
        type: gender,
        affection: 35 + Math.floor(Math.random() * 25),
        compatibility: Math.floor(Math.random() * 100),
        approvedByFamily: Math.random() < 0.35,
        startedAtAge: c.age,
        status: 'active',
      };
      c.log.push(`Met ${c.romance.name} at age ${c.age}.`);
    }
    if (choice.effects.romanceAffection && c.romance) {
      const aff = clamp(c.romance.affection + choice.effects.romanceAffection);
      c.romance = { ...c.romance, affection: aff };
      if (aff <= 0) {
        c.romance = { ...c.romance, status: 'broken' };
        c.log.push(`Things ended with ${c.romance.name}.`);
        c.romance = null;
      }
    }
    if (choice.effects.triggerBreakup && c.romance) {
      c.log.push(`Broke up with ${c.romance.name}.`);
      c.romance = null;
    }

    if (choice.effects.logLine) c.log.push(`Age ${c.age}: ${choice.effects.logLine}`);

    setLastResult(choice.resultText);

    // Advance time
    c = advanceYear(c);
    c = checkEnding(c);
    setCharacter(c);
    setPendingEvent(c.ended ? null : pickEvent(c));
  }, [character, pendingEvent]);

  const skipToNextEvent = useCallback(() => {
    if (!character || pendingEvent) return;
    let c = advanceYear(character);
    c = checkEnding(c);
    setCharacter(c);
    setPendingEvent(c.ended ? null : pickEvent(c));
  }, [character, pendingEvent]);

  return {
    character,
    pendingEvent,
    lastResult,
    startGame,
    applyChoice,
    abandon,
    skipToNextEvent,
    dismissResult: () => setLastResult(null),
  };
};
