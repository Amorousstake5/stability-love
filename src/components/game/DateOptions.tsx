import { DateScenario, AIPartner } from '@/types/game';
import { dateScenarios } from '@/data/gameData';
import { Lock, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateOptionsProps {
  partner: AIPartner;
  onSelectDate: (scenario: DateScenario) => void;
}

export const DateOptions = ({ partner, onSelectDate }: DateOptionsProps) => {
  return (
    <div className="space-y-3">
      {dateScenarios.map((scenario) => {
        const isUnlocked = partner.affection >= scenario.requiredAffection;
        
        return (
          <button
            key={scenario.id}
            onClick={() => isUnlocked && onSelectDate(scenario)}
            disabled={!isUnlocked}
            className={cn(
              'group relative w-full overflow-hidden rounded-xl p-4 text-left transition-all',
              isUnlocked
                ? 'bg-card shadow-card hover:scale-[1.01] hover:shadow-glow active:scale-[0.99]'
                : 'bg-muted cursor-not-allowed'
            )}
          >
            {!isUnlocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-[1px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm font-medium">Requires {scenario.requiredAffection}% affection</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-4">
              <span className="text-3xl">{scenario.icon}</span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold">{scenario.name}</h3>
                <p className="text-sm text-muted-foreground">{scenario.description}</p>
              </div>
              {isUnlocked && (
                <div className="flex items-center gap-1 text-stat-looks">
                  <Heart className="h-4 w-4" fill="currentColor" />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
