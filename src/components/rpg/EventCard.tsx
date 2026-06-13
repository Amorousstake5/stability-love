import { RPGCharacter, RPGEvent, RPGChoice } from '@/types/rpg';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface Props {
  c: RPGCharacter;
  event: RPGEvent | null;
  lastResult: string | null;
  onChoose: (choice: RPGChoice) => void;
  onDismissResult: () => void;
  onSkip: () => void;
}

export const EventCard = ({ c, event, lastResult, onChoose, onDismissResult, onSkip }: Props) => {
  if (lastResult) {
    return (
      <div className="rounded-2xl bg-background/80 backdrop-blur border border-border p-6 shadow-card">
        <p className="text-xs uppercase tracking-widest text-foreground/50">Outcome</p>
        <p className="mt-3 text-lg leading-relaxed">{lastResult}</p>
        <Button className="mt-6" onClick={onDismissResult}>
          Continue <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="rounded-2xl bg-background/70 backdrop-blur border border-border p-6 shadow-soft text-center">
        <p className="text-foreground/70">A quiet year passes. Nothing dramatic.</p>
        <Button className="mt-4" onClick={onSkip}>Next Year</Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-background/80 backdrop-blur border border-border p-6 shadow-card animate-fade-in">
      <p className="text-xs uppercase tracking-widest text-primary">Age {c.age} · {event.title}</p>
      <h3 className="mt-3 font-display text-2xl font-semibold leading-snug">{event.text(c)}</h3>

      <div className="mt-6 space-y-2">
        {event.choices(c).map((choice, i) => (
          <button
            key={i}
            onClick={() => onChoose(choice)}
            className="group w-full text-left rounded-xl border border-border bg-background/60 hover:bg-primary/10 hover:border-primary transition p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium">{choice.label}</span>
              <ChevronRight className="h-4 w-4 text-foreground/40 group-hover:text-primary transition" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
