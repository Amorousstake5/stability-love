import { Activity, StatKey } from '@/types/game';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
  onSelect: (activity: Activity) => void;
}

const statColors: Record<StatKey, string> = {
  wealth: 'text-stat-wealth',
  strength: 'text-stat-strength',
  looks: 'text-stat-looks',
  intelligence: 'text-stat-intelligence',
  education: 'text-stat-education',
  health: 'text-stat-health',
};

export const ActivityCard = ({ activity, onSelect }: ActivityCardProps) => {
  return (
    <button
      onClick={() => onSelect(activity)}
      className="group relative w-full overflow-hidden rounded-xl bg-card p-4 text-left shadow-card transition-all duration-300 hover:scale-[1.02] hover:shadow-glow active:scale-[0.98]"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 gradient-primary group-hover:opacity-5" />
      
      <div className="relative">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{activity.icon}</span>
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold">{activity.name}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{activity.description}</p>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(activity.statChanges).map(([stat, value]) => (
            <span
              key={stat}
              className={cn(
                'inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium',
                value && value > 0 ? statColors[stat as StatKey] : 'text-muted-foreground'
              )}
            >
              {value && value > 0 ? '+' : ''}{value} {stat}
            </span>
          ))}
          <span className="inline-flex items-center rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent-foreground">
            +{activity.stabilityChange} stability
          </span>
        </div>
      </div>
    </button>
  );
};
