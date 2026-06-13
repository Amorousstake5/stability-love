import { MeddleEvent, MeddleChoice } from '@/types/society';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  event: MeddleEvent | null;
  onChoose: (event: MeddleEvent, choice: MeddleChoice) => void;
}

const fmt = (n?: number, suffix = '') => n ? `${n > 0 ? '+' : ''}${n}${suffix}` : null;

export const MeddleEventModal = ({ event, onChoose }: Props) => {
  if (!event) return null;
  return (
    <Dialog open={!!event}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="text-4xl">{event.npc.avatar}</div>
            <div>
              <DialogTitle className="text-left">{event.title}</DialogTitle>
              <p className="text-xs text-muted-foreground capitalize">{event.npc.role.replace('-', ' ')}</p>
            </div>
          </div>
          <DialogDescription className="pt-3 text-left">{event.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {event.choices.map((c, i) => (
            <Button key={i} variant="outline" onClick={() => onChoose(event, c)} className="h-auto w-full justify-start whitespace-normal py-3 text-left">
              <div className="space-y-1">
                <p className="font-medium">{c.text}</p>
                <p className="text-xs text-muted-foreground">{c.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {c.effects.stability != null && <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px]">Stability {fmt(c.effects.stability)}</span>}
                  {c.effects.affection != null && <span className="rounded-full bg-stat-looks/20 px-2 py-0.5 text-[10px] text-stat-looks">Affection {fmt(c.effects.affection)}</span>}
                  {c.effects.reputation != null && <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px]">Reputation {fmt(c.effects.reputation)}</span>}
                  {c.effects.relationship != null && <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px]">w/ {event.npc.name.split(' ')[0]} {fmt(c.effects.relationship)}</span>}
                  {c.effects.spiral != null && c.effects.spiral > 0 && <span className="rounded-full bg-destructive/20 px-2 py-0.5 text-[10px] text-destructive">Spiral {fmt(c.effects.spiral)}</span>}
                  {c.effects.debt != null && <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px]">Debt {fmt(c.effects.debt)}</span>}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
