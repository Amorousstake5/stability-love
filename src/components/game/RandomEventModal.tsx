import { RandomEvent } from '@/types/game';
import { AlertTriangle, Gift, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RandomEventModalProps {
  event: RandomEvent;
  onResolve: (choiceIndex: number) => void;
}

const eventIcons = {
  positive: Gift,
  negative: AlertTriangle,
  neutral: Zap,
};

export const RandomEventModal = ({ event, onResolve }: RandomEventModalProps) => {
  const IconComponent = eventIcons[event.type];
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md mx-4 overflow-hidden rounded-2xl bg-card shadow-card animate-slide-up">
        {/* Header */}
        <div className={cn(
          "p-6 text-center",
          event.type === 'positive' && 'bg-green-500/20',
          event.type === 'negative' && 'bg-red-500/20',
          event.type === 'neutral' && 'bg-yellow-500/20',
        )}>
          <div className={cn(
            "mx-auto flex h-16 w-16 items-center justify-center rounded-full",
            event.type === 'positive' && 'bg-green-500 text-white',
            event.type === 'negative' && 'bg-red-500 text-white',
            event.type === 'neutral' && 'bg-yellow-500 text-white',
          )}>
            <IconComponent className="h-8 w-8" />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold">{event.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{event.category}</p>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-foreground leading-relaxed">{event.description}</p>
          
          {/* Choices */}
          <div className="mt-6 space-y-3">
            {event.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => onResolve(index)}
                className={cn(
                  "w-full rounded-xl p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98]",
                  "bg-secondary hover:bg-secondary/80",
                  "border border-transparent hover:border-primary/30"
                )}
              >
                <div className="font-medium">{choice.text}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Risk: {choice.risk === 'low' ? '🟢 Low' : choice.risk === 'medium' ? '🟡 Medium' : '🔴 High'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};