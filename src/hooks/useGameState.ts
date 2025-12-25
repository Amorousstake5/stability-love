import { useState, useCallback } from 'react';
import { Player, PlayerStats, Activity, Achievement, AIPartner, GameSettings, DateScenario } from '@/types/game';
import { achievements, partnerPersonalities } from '@/data/gameData';
import { toast } from 'sonner';

const calculateStabilityIndex = (stats: PlayerStats): number => {
  const values = Object.values(stats);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const standardDeviation = Math.sqrt(variance);
  
  const maxDeviation = 50;
  const stability = Math.max(0, Math.min(100, 100 - (standardDeviation / maxDeviation) * 100));
  const avgStat = mean;
  const balancedStability = (stability * 0.6) + (avgStat * 0.4);
  
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

  const initializeGame = useCallback((settings: GameSettings) => {
    const personality = partnerPersonalities.find(p => p.id === settings.partnerPersonality) || partnerPersonalities[0];
    
    setPlayer({
      name: settings.playerName,
      avatar: settings.playerAvatar,
      stats: settings.statPoints,
      stabilityIndex: calculateStabilityIndex(settings.statPoints),
      day: 1,
      achievements: [],
    });
    
    setPartner({
      name: settings.partnerName,
      avatar: settings.partnerAvatar,
      personality: personality.name,
      preferences: personality.preferences,
      affection: 10,
      relationshipStatus: 'stranger',
    });
    
    setIsSetupComplete(true);
  }, []);

  const checkAchievements = useCallback((stats: PlayerStats, stability: number, affection: number, currentAchievements: Achievement[]) => {
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
      }
      
      if (unlocked) {
        newlyUnlocked.push({ ...achievement, unlockedAt: new Date() });
      }
    });
    
    return newlyUnlocked;
  }, []);

  const performActivity = useCallback((activity: Activity) => {
    if (!player || !partner) return;
    
    setPlayer(prev => {
      if (!prev) return prev;
      
      const newStats = { ...prev.stats };
      
      Object.entries(activity.statChanges).forEach(([key, value]) => {
        const statKey = key as keyof PlayerStats;
        newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + (value || 0)));
      });
      
      const newStability = calculateStabilityIndex(newStats);
      const newAchievements = checkAchievements(newStats, newStability, partner.affection, prev.achievements);
      
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
  }, [player, partner, checkAchievements]);

  const startDate = useCallback((scenario: DateScenario) => {
    setActiveDate(scenario);
  }, []);

  const completeDate = useCallback((affectionGained: number, chosenStats: string[]) => {
    if (!player || !partner) return;
    
    // Apply stat bonuses based on partner preferences
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

    // Check for date-related achievements
    if (player) {
      const newAchievements = checkAchievements(
        player.stats, 
        player.stabilityIndex, 
        partner.affection + affectionGained, 
        player.achievements
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
  }, [player, partner, checkAchievements]);

  const cancelDate = useCallback(() => {
    setActiveDate(null);
  }, []);

  return {
    isSetupComplete,
    player,
    partner,
    newAchievement,
    activeDate,
    initializeGame,
    performActivity,
    startDate,
    completeDate,
    cancelDate,
  };
};
