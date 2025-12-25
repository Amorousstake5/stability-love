import { useState, useCallback, useEffect } from 'react';
import { Player, PlayerStats, Activity, Achievement, Match } from '@/types/game';
import { initialPlayerStats, achievements, potentialMatches } from '@/data/gameData';
import { toast } from 'sonner';

const calculateStabilityIndex = (stats: PlayerStats): number => {
  const values = Object.values(stats);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const standardDeviation = Math.sqrt(variance);
  
  // Lower deviation = higher stability (max 100 when all stats are equal)
  const maxDeviation = 50; // Theoretical max deviation
  const stability = Math.max(0, Math.min(100, 100 - (standardDeviation / maxDeviation) * 100));
  
  // Also factor in average stat level
  const avgStat = mean;
  const balancedStability = (stability * 0.6) + (avgStat * 0.4);
  
  return Math.round(balancedStability);
};

const calculateCompatibility = (playerStats: PlayerStats, match: Match): number => {
  const prefs = match.preferences;
  let totalWeight = 0;
  let weightedScore = 0;
  
  Object.entries(prefs).forEach(([key, minValue]) => {
    const statKey = key as keyof PlayerStats;
    const playerValue = playerStats[statKey];
    const weight = minValue || 0;
    totalWeight += weight;
    
    // Score based on how well player meets or exceeds preference
    const score = Math.min(100, (playerValue / (minValue || 1)) * 100);
    weightedScore += score * (weight / 100);
  });
  
  return Math.round(weightedScore / (totalWeight / 100) || 50);
};

export const useGameState = () => {
  const [player, setPlayer] = useState<Player>({
    name: 'You',
    avatar: '🧑',
    stats: { ...initialPlayerStats },
    stabilityIndex: calculateStabilityIndex(initialPlayerStats),
    day: 1,
    achievements: [],
  });
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  const checkAchievements = useCallback((stats: PlayerStats, stability: number, currentAchievements: Achievement[]) => {
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
        case 'model':
          unlocked = stats.looks >= 80;
          break;
        case 'genius':
          unlocked = stats.intelligence >= 80;
          break;
        case 'scholar':
          unlocked = stats.education >= 80;
          break;
        case 'athlete':
          unlocked = stats.health >= 80;
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
    setPlayer(prev => {
      const newStats = { ...prev.stats };
      
      Object.entries(activity.statChanges).forEach(([key, value]) => {
        const statKey = key as keyof PlayerStats;
        newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + (value || 0)));
      });
      
      const newStability = calculateStabilityIndex(newStats);
      const newAchievements = checkAchievements(newStats, newStability, prev.achievements);
      
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
  }, [checkAchievements]);

  const findMatches = useCallback(() => {
    const compatibleMatches = potentialMatches.map(match => ({
      ...match,
      compatibilityScore: calculateCompatibility(player.stats, match),
    })).sort((a, b) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));
    
    setMatches(compatibleMatches);
    
    // Check for first match achievement
    if (compatibleMatches.some(m => (m.compatibilityScore || 0) >= 70)) {
      const hasFirstMatch = player.achievements.some(a => a.id === 'first_match');
      if (!hasFirstMatch) {
        const matchAchievement = achievements.find(a => a.id === 'first_match');
        if (matchAchievement) {
          const unlocked = { ...matchAchievement, unlockedAt: new Date() };
          setPlayer(prev => ({
            ...prev,
            achievements: [...prev.achievements, unlocked],
          }));
          setNewAchievement(unlocked);
          setTimeout(() => setNewAchievement(null), 3000);
        }
      }
    }
  }, [player.stats, player.achievements]);

  useEffect(() => {
    findMatches();
  }, [player.stats]);

  return {
    player,
    matches,
    performActivity,
    newAchievement,
  };
};
