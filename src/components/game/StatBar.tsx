import { cn } from '@/lib/utils';
import { StatKey } from '@/types/game';

interface StatBarProps {
  stat: StatKey;
  value: number;
  showLabel?: boolean;
}

const statConfig: Record<StatKey, { label: string; icon: string; colorClass: string }> = {
  wealth: { label: 'Wealth', icon: '💰', colorClass: 'bg-stat-wealth' },
  strength: { label: 'Strength', icon: '💪', colorClass: 'bg-stat-strength' },
  looks: { label: 'Looks', icon: '✨', colorClass: 'bg-stat-looks' },
  intelligence: { label: 'Intelligence', icon: '🧠', colorClass: 'bg-stat-intelligence' },
  education: { label: 'Education', icon: '📚', colorClass: 'bg-stat-education' },
  health: { label: 'Health', icon: '❤️', colorClass: 'bg-stat-health' },
};

export const StatBar = ({ stat, value, showLabel = true }: StatBarProps) => {
  const config = statConfig[stat];
  
  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <span>{config.icon}</span>
            <span>{config.label}</span>
          </span>
          <span className="font-semibold tabular-nums text-muted-foreground">{value}</span>
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700 ease-out',
            config.colorClass
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
