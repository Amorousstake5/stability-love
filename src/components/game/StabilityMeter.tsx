import { cn } from '@/lib/utils';

interface StabilityMeterProps {
  value: number;
}

export const StabilityMeter = ({ value }: StabilityMeterProps) => {
  const getStabilityLevel = (val: number) => {
    if (val >= 80) return { label: 'Excellent', color: 'text-stat-wealth' };
    if (val >= 60) return { label: 'Good', color: 'text-stat-intelligence' };
    if (val >= 40) return { label: 'Moderate', color: 'text-accent' };
    if (val >= 20) return { label: 'Unstable', color: 'text-stat-strength' };
    return { label: 'Critical', color: 'text-destructive' };
  };

  const level = getStabilityLevel(value);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 w-32">
        {/* Background circle */}
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--stability))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: value >= 80 ? 'drop-shadow(0 0 8px hsl(var(--stability-glow)))' : 'none',
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-display tabular-nums">{value}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <h3 className="font-display text-lg font-semibold">Stability Index</h3>
        <p className={cn('text-sm font-medium', level.color)}>{level.label}</p>
      </div>
    </div>
  );
};
