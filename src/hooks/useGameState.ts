import { useState, useCallback, useEffect } from 'react';
import { Player, PlayerStats, Activity, Achievement, AIPartner, DateScenario, PotentialPartner, RandomEvent, RandomEventChoice } from '@/types/game';
import { achievements, randomEvents } from '@/data/gameData';
import { toast } from 'sonner';

const calculateStabilityIndex = (stats: PlayerStats): number => {
  const values = Object.values(stats);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const standardDeviation = Math.sqrt(variance);
  
  // Harder formula - more sensitive to imbalance
  const maxDeviation = 35; // Reduced from 50 for harder difficulty
  const stability = Math.max(0, Math.min(100, 100 - (standardDeviation / maxDeviation) * 100));
  const avgStat = mean;
  const balancedStability = (stability * 0.7) + (avgStat * 0.3); // Weight balance more
  
  return Math.round(balancedStability);
};

const getRelationshipStatus = (affection: number): AIPartner['relationshipStatus'] => {
  if (affection >= 80) return 'committed';
  if (affection >= 40) return 'dating';
  if (affection >= 20) return 'acquaintance';
  return 'stranger';
};

export const useGameState = () => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [player, setPlayer] = useState<Player | null>(null);
  const [partner, setPartner] = useState<AIPartner | null>(null);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [activeDate, setActiveDate] = useState<DateScenario | null>(null);
  const [activeEvent, setActiveEvent] = useState<RandomEvent | null>(null);
  const [eventsOvercome, setEventsOvercome] = useState(0);

  const initializeFromSwipe = useCallback((settings: {
    playerName: string;
    playerAvatar: string;
    statPoints: PlayerStats;
    selectedPartner: PotentialPartner;
  }) => {
    setPlayer({
      name: settings.playerName,
      avatar: settings.playerAvatar,
      stats: settings.statPoints,
      stabilityIndex: calculateStabilityIndex(settings.statPoints),
      day: 1,
      achievements: [],
    });
    
    setPartner({
      name: settings.selectedPartner.name,
      avatar: settings.selectedPartner.avatar,
      personality: settings.selectedPartner.personality,
      preferences: settings.selectedPartner.preferences,
      affection: 15, // Start with some affection since you matched
      relationshipStatus: 'acquaintance',
    });
    
    setIsSetupComplete(true);
  }, []);

  // Random event trigger - 30% chance each day
  const triggerRandomEvent = useCallback(() => {
    if (Math.random() < 0.3) {
      const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      setActiveEvent(event);
    }
  }, []);

  const resolveEvent = useCallback((choiceIndex: number) => {
    if (!activeEvent || !player || !partner) return;
    
    const choice = activeEvent.choices[choiceIndex];
    
    setPlayer(prev => {
      if (!prev) return prev;
      
      const newStats = { ...prev.stats };
      Object.entries(choice.effects).forEach(([key, value]) => {
        const statKey = key as keyof PlayerStats;
        newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + (value || 0)));
      });
      
      // Apply stability multiplier
      let newStability = calculateStabilityIndex(newStats);
      newStability = Math.round(newStability * choice.stabilityMultiplier);
      newStability = Math.max(0, Math.min(100, newStability));
      
      return {
        ...prev,
        stats: newStats,
        stabilityIndex: newStability,
      };
    });
    
    setPartner(prev => {
      if (!prev) return prev;
      const newAffection = Math.max(0, Math.min(100, prev.affection + choice.affectionChange));
      return {
        ...prev,
        affection: newAffection,
        relationshipStatus: getRelationshipStatus(newAffection),
      };
    });
    
    if (activeEvent.type === 'negative') {
      setEventsOvercome(prev => prev + 1);
    }
    
    const riskMessage = choice.risk === 'high' ? 'Risky choice!' : choice.risk === 'medium' ? 'Moderate risk' : 'Safe choice';
    toast.info(`Event resolved: ${riskMessage}`);
    
    setActiveEvent(null);
  }, [activeEvent, player, partner]);

  const checkAchievements = useCallback((stats: PlayerStats, stability: number, affection: number, currentAchievements: Achievement[], eventsCount: number) => {
    const unlockedIds = currentAchievements.map(a => a.id);
    const newlyUnlocked: Achievement[] = [];
    
    achievements.forEach(achievement => {
      if (unlockedIds.includes(achievement.id)) return;
      
      let unlocked = false;
      
      switch (achievement.id) {
        case 'first_stable':
          unlocked = stability >= 50;
          break;
        case 'very_stable':
          unlocked = stability >= 80;
          break;
        case 'max_stable':
          unlocked = stability >= 100;
          break;
        case 'wealthy':
          unlocked = stats.wealth >= 80;
          break;
        case 'buff':
          unlocked = stats.strength >= 80;
          break;
        case 'first_date':
          unlocked = affection >= 15;
          break;
        case 'relationship':
          unlocked = affection >= 80;
          break;
        case 'all_rounder':
          unlocked = Object.values(stats).every(v => v >= 60);
          break;
        case 'survivor':
          unlocked = eventsCount >= 5;
          break;
      }
      
      if (unlocked) {
        newlyUnlocked.push({ ...achievement, unlockedAt: new Date() });
      }
    });
    
    return newlyUnlocked;
  }, []);

  const performActivity = useCallback((activity: Activity) => {
    if (!player || !partner) return;
    
    // Natural affection decay - relationships require work!
    const affectionDecay = Math.random() < 0.4 ? -2 : 0;
    
    setPartner(prev => {
      if (!prev) return prev;
      const newAffection = Math.max(0, prev.affection + affectionDecay);
      return {
        ...prev,
        affection: newAffection,
        relationshipStatus: getRelationshipStatus(newAffection),
      };
    });
    
    setPlayer(prev => {
      if (!prev) return prev;
      
      const newStats = { ...prev.stats };
      
      // Natural stat decay over time
      const decayStats: (keyof PlayerStats)[] = ['health', 'looks', 'strength'];
      decayStats.forEach(stat => {
        if (Math.random() < 0.3) {
          newStats[stat] = Math.max(0, newStats[stat] - 2);
        }
      });
      
      Object.entries(activity.statChanges).forEach(([key, value]) => {
        const statKey = key as keyof PlayerStats;
        newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + (value || 0)));
      });
      
      const newStability = calculateStabilityIndex(newStats);
      const currentPartnerAffection = partner.affection + affectionDecay;
      const newAchievements = checkAchievements(newStats, newStability, currentPartnerAffection, prev.achievements, eventsOvercome);
      
      if (newAchievements.length > 0) {
        setNewAchievement(newAchievements[0]);
        setTimeout(() => setNewAchievement(null), 3000);
      }
      
      toast.success(`Completed: ${activity.name}`, {
        description: `Day ${prev.day + 1} begins...`,
      });
      
      return {
        ...prev,
        stats: newStats,
        stabilityIndex: newStability,
        day: prev.day + 1,
        achievements: [...prev.achievements, ...newAchievements],
      };
    });
    
    // Trigger random event after activity
    setTimeout(() => triggerRandomEvent(), 500);
  }, [player, partner, checkAchievements, eventsOvercome, triggerRandomEvent]);

  const startDate = useCallback((scenario: DateScenario) => {
    setActiveDate(scenario);
  }, []);

  const completeDate = useCallback((affectionGained: number, chosenStats: string[]) => {
    if (!player || !partner) return;
    
    const statBonus: Partial<PlayerStats> = {};
    chosenStats.forEach(stat => {
      const key = stat as keyof PlayerStats;
      const preference = partner.preferences[key] || 0;
      const bonus = Math.round(preference * 10);
      statBonus[key] = (statBonus[key] || 0) + bonus;
    });

    setPlayer(prev => {
      if (!prev) return prev;
      
      const newStats = { ...prev.stats };
      Object.entries(statBonus).forEach(([key, value]) => {
        const statKey = key as keyof PlayerStats;
        newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + (value || 0)));
      });
      
      const newStability = calculateStabilityIndex(newStats);
      
      return {
        ...prev,
        stats: newStats,
        stabilityIndex: newStability,
        day: prev.day + 1,
      };
    });

    setPartner(prev => {
      if (!prev) return prev;
      
      const newAffection = Math.min(100, prev.affection + affectionGained);
      const newStatus = getRelationshipStatus(newAffection);
      
      if (newStatus !== prev.relationshipStatus) {
        toast.success('Relationship upgraded!', {
          description: `You are now ${newStatus === 'committed' ? 'in a relationship' : newStatus}!`,
        });
      }
      
      return {
        ...prev,
        affection: newAffection,
        relationshipStatus: newStatus,
      };
    });

    if (player) {
      const newAchievements = checkAchievements(
        player.stats, 
        player.stabilityIndex, 
        partner.affection + affectionGained, 
        player.achievements,
        eventsOvercome
      );
      
      if (newAchievements.length > 0) {
        setNewAchievement(newAchievements[0]);
        setTimeout(() => setNewAchievement(null), 3000);
        
        setPlayer(prev => prev ? {
          ...prev,
          achievements: [...prev.achievements, ...newAchievements],
        } : prev);
      }
    }

    setActiveDate(null);
    toast.success('Date complete!', {
      description: `+${affectionGained} affection with ${partner.name}`,
    });
    
    // Trigger random event after date
    setTimeout(() => triggerRandomEvent(), 500);
  }, [player, partner, checkAchievements, eventsOvercome, triggerRandomEvent]);

  const cancelDate = useCallback(() => {
    setActiveDate(null);
  }, []);

  return {
    isSetupComplete,
    player,
    partner,
    newAchievement,
    activeDate,
    activeEvent,
    initializeFromSwipe,
    performActivity,
    startDate,
    completeDate,
    cancelDate,
    resolveEvent,
  };
};