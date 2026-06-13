import { SocialNPC } from '@/types/society';
import { cn } from '@/lib/utils';

interface Props {
  circle: SocialNPC[];
  reputation: number;
  debt: number;
  spiralPressure: number;
}

const alignmentLabel = (n: SocialNPC) => {
  const bad = (n.alignment.nosiness + n.alignment.strictness + n.alignment.judginess) / 3;
  const good = n.alignment.warmth;
  if (good > 40 && bad < 20) return { label: 'Supportive', tone: 'text-green-600' };
  if (bad > 40) return { label: 'Toxic', tone: 'text-destructive' };
  if (bad > 10) return { label: 'Meddlesome', tone: 'text-orange-500' };
  return { label: 'Neutral', tone: 'text-muted-foreground' };
};

const Bar = ({ value, label, tone }: { value: number; label: string; tone: string }) => (
  <div>
    <div className="flex justify-between text-xs"><span>{label}</span><span>{value}</span></div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <div className={cn('h-full transition-all', tone)} style={{ width: `${Math.max(0, Math.min(100, value < 0 ? 0 : value))}%` }} />
    </div>
  </div>
);

export const SocialCircle = ({ circle, reputation, debt, spiralPressure }: Props) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-card p-4 shadow-soft">
          <p className="text-xs text-muted-foreground">Reputation</p>
          <p className="text-2xl font-bold">{reputation}</p>
          <Bar value={reputation + 100} label="society standing" tone="bg-accent" />
        </div>
        <div className="rounded-xl bg-card p-4 shadow-soft">
          <p className="text-xs text-muted-foreground">Debt</p>
          <p className="text-2xl font-bold">₹{debt}k</p>
          <Bar value={Math.min(100, debt)} label="leverage" tone="bg-destructive" />
        </div>
        <div className="rounded-xl bg-card p-4 shadow-soft">
          <p className="text-xs text-muted-foreground">Life Spiral</p>
          <p className={cn('text-2xl font-bold', spiralPressure > 60 && 'text-destructive')}>{spiralPressure}%</p>
          <Bar value={spiralPressure} label="pressure" tone={spiralPressure > 60 ? 'bg-destructive' : 'bg-orange-400'} />
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold">Your Social Circle</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {circle.map(npc => {
            const a = alignmentLabel(npc);
            return (
              <div key={npc.id} className="rounded-xl bg-card p-4 shadow-soft">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{npc.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{npc.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{npc.role.replace('-', ' ')}</p>
                    <p className={cn('text-xs font-medium mt-1', a.tone)}>{a.label}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">w/ you</p>
                    <p className={cn('font-bold', npc.relationship < 0 ? 'text-destructive' : 'text-primary')}>{npc.relationship}</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-1 text-[10px] text-muted-foreground">
                  <span>Nosy: {npc.alignment.nosiness}</span>
                  <span>Strict: {npc.alignment.strictness}</span>
                  <span>Judgy: {npc.alignment.judginess}</span>
                  <span>Warm: {npc.alignment.warmth}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
