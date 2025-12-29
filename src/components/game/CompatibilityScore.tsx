import { PlayerStats, AIPartner } from '@/types/game';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CompatibilityScoreProps {
  playerStats: PlayerStats;
  partnerPreferences: AIPartner['preferences'];
}

const statLabels: Record<keyof PlayerStats, string> = {
  wealth: 'Wealth',
  strength: 'Strength',
  looks: 'Looks',
  intelligence: 'Intelligence',
  education: 'Education',
  health: 'Health',
};

const statColors: Record<keyof PlayerStats, string> = {
  wealth: 'bg-stat-wealth',
  strength: 'bg-stat-strength',
  looks: 'bg-stat-looks',
  intelligence: 'bg-stat-intelligence',
  education: 'bg-stat-education',
  health: 'bg-stat-health',
};

export const CompatibilityScore = ({ playerStats, partnerPreferences }: CompatibilityScoreProps) => {
  // Calculate individual stat compatibility (how well player matches each preference)
  const statCompatibility = Object.keys(partnerPreferences).map((key) => {
    const stat = key as keyof PlayerStats;
    const preference = partnerPreferences[stat];
    const playerValue = playerStats[stat];
    
    // Calculate match percentage (higher player stat vs preference = better)
    // If player exceeds preference, cap at 100%. If below, proportional score.
    const matchPercent = preference > 0 
      ? Math.min(100, Math.round((playerValue / preference) * 100))
      : 100;
    
    const diff = playerValue - preference;
    
    return {
      stat,
      label: statLabels[stat],
      color: statColors[stat],
      preference,
      playerValue,
      matchPercent,
      diff,
    };
  });

  // Overall compatibility score (weighted average based on preference importance)
  const totalPreferenceWeight = Object.values(partnerPreferences).reduce((a, b) => a + b, 0);
  const weightedScore = statCompatibility.reduce((sum, item) => {
    const weight = item.preference / totalPreferenceWeight;
    return sum + (item.matchPercent * weight);
  }, 0);
  
  const overallScore = Math.round(weightedScore);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-stat-wealth';
    if (score >= 40) return 'text-stat-looks';
    return 'text-destructive';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Perfect Match!';
    if (score >= 75) return 'Great Compatibility';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Work In Progress';
    return 'Needs Improvement';
  };

  return (
    <div className="rounded-xl bg-secondary/50 p-4 space-y-3">
      {/* Overall Score */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Compatibility</span>
        <div className="flex items-center gap-2">
          <span className={cn('text-2xl font-bold tabular-nums', getScoreColor(overallScore))}>
            {overallScore}%
          </span>
        </div>
      </div>
      
      <div className={cn('text-xs font-medium text-center py-1 rounded-full', getScoreColor(overallScore))}>
        {getScoreLabel(overallScore)}
      </div>

      {/* Individual Stat Breakdown */}
      <div className="space-y-2 pt-2 border-t border-border/50">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">Preference Match</span>
        {statCompatibility.map((item) => (
          <div key={item.stat} className="flex items-center gap-2 text-xs">
            <span className="w-20 truncate text-muted-foreground">{item.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div 
                className={cn('h-full rounded-full transition-all duration-500', item.color)}
                style={{ width: `${item.matchPercent}%` }}
              />
            </div>
            <div className="flex items-center gap-1 w-12 justify-end">
              {item.diff > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : item.diff < 0 ? (
                <TrendingDown className="h-3 w-3 text-destructive" />
              ) : (
                <Minus className="h-3 w-3 text-muted-foreground" />
              )}
              <span className={cn(
                'tabular-nums font-medium',
                item.diff > 0 ? 'text-green-500' : item.diff < 0 ? 'text-destructive' : 'text-muted-foreground'
              )}>
                {item.matchPercent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
