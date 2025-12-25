import { AIPartner } from '@/types/game';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PartnerCardProps {
  partner: AIPartner;
}

const statusLabels: Record<AIPartner['relationshipStatus'], { label: string; color: string }> = {
  stranger: { label: 'Just Met', color: 'text-muted-foreground bg-muted' },
  acquaintance: { label: 'Getting to Know', color: 'text-stat-intelligence bg-stat-intelligence/20' },
  dating: { label: 'Dating', color: 'text-stat-looks bg-stat-looks/20' },
  committed: { label: 'In a Relationship', color: 'text-stat-wealth bg-stat-wealth/20' },
};

export const PartnerCard = ({ partner }: PartnerCardProps) => {
  const status = statusLabels[partner.relationshipStatus];
  
  return (
    <div className="rounded-2xl bg-card p-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-4xl">
          {partner.avatar}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold">{partner.name}</h3>
          <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-medium', status.color)}>
            {status.label}
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 font-medium">
            <Heart className="h-4 w-4 text-stat-looks" fill="currentColor" />
            Affection
          </span>
          <span className="font-bold tabular-nums">{partner.affection}%</span>
        </div>
        <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-stat-looks transition-all duration-500"
            style={{ width: `${partner.affection}%` }}
          />
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-secondary p-2">
          <div className="font-bold text-stat-looks">20%</div>
          <div className="text-muted-foreground">Coffee</div>
        </div>
        <div className={cn(
          'rounded-lg p-2',
          partner.affection >= 20 ? 'bg-secondary' : 'bg-muted opacity-50'
        )}>
          <div className="font-bold text-stat-looks">40%</div>
          <div className="text-muted-foreground">Dinner</div>
        </div>
        <div className={cn(
          'rounded-lg p-2',
          partner.affection >= 80 ? 'bg-secondary' : 'bg-muted opacity-50'
        )}>
          <div className="font-bold text-stat-looks">80%</div>
          <div className="text-muted-foreground">Commit</div>
        </div>
      </div>
    </div>
  );
};
