import { Match } from '@/types/game';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const compatibility = match.compatibilityScore || 0;
  
  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'text-stat-wealth bg-stat-wealth/10';
    if (score >= 60) return 'text-stat-intelligence bg-stat-intelligence/10';
    if (score >= 40) return 'text-accent bg-accent/10';
    return 'text-muted-foreground bg-muted';
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card p-5 shadow-card transition-all duration-300 hover:shadow-glow">
      <div className="absolute right-3 top-3">
        <div className={cn(
          'flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold',
          getCompatibilityColor(compatibility)
        )}>
          <Heart className="h-3.5 w-3.5" fill="currentColor" />
          {compatibility}%
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-4xl">
          {match.avatar}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold">
            {match.name}, {match.age}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{match.bio}</p>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-1.5">
        {match.interests.map((interest) => (
          <span
            key={interest}
            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
          >
            {interest}
          </span>
        ))}
      </div>
      
      {compatibility >= 70 && (
        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Send Message
          </button>
          <button className="rounded-lg bg-secondary p-2.5 transition-colors hover:bg-secondary/80">
            <Heart className="h-5 w-5 text-stat-looks" />
          </button>
        </div>
      )}
    </div>
  );
};
