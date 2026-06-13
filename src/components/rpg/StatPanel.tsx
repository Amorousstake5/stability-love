import { RPGCharacter } from '@/types/rpg';
import { Progress } from '@/components/ui/progress';
import { Heart, Brain, Sparkles, Smile, Wallet, Award, User } from 'lucide-react';

const Row = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
  <div>
    <div className="mb-1 flex items-center justify-between text-xs">
      <span className="flex items-center gap-1.5 text-foreground/80"><Icon className="h-3.5 w-3.5" /> {label}</span>
      <span className="font-mono text-foreground/60">{value}</span>
    </div>
    <Progress value={value} className={`h-1.5 [&>div]:${color}`} />
  </div>
);

export const StatPanel = ({ c }: { c: RPGCharacter }) => {
  return (
    <div className="rounded-2xl bg-background/70 backdrop-blur border border-border p-5 shadow-soft space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">{c.name}</h3>
          <p className="text-xs text-foreground/60 capitalize">{c.stage} · Age {c.age} · {c.hometown}</p>
        </div>
        <div className="rounded-full bg-primary/10 p-2"><User className="h-5 w-5 text-primary" /></div>
      </div>

      <div className="space-y-2.5">
        <Row icon={Heart} label="Health" value={c.stats.health} color="bg-emerald-500" />
        <Row icon={Brain} label="Intelligence" value={c.stats.intelligence} color="bg-blue-500" />
        <Row icon={Sparkles} label="Charm" value={c.stats.charm} color="bg-pink-500" />
        <Row icon={Smile} label="Happiness" value={c.stats.happiness} color="bg-yellow-500" />
        <Row icon={Wallet} label="Wealth" value={c.stats.wealth} color="bg-amber-600" />
        <Row icon={Award} label="Reputation" value={c.stats.reputation} color="bg-violet-500" />
      </div>

      <div className="pt-2 border-t border-border space-y-1 text-xs">
        <p className="text-foreground/70">
          <span className="font-medium">{c.father.name}</span> · {c.father.alive ? `health ${c.father.health}` : 'deceased'}
        </p>
        <p className="text-foreground/70">
          <span className="font-medium">{c.mother.name}</span> · {c.mother.alive ? `health ${c.mother.health}` : 'deceased'}
        </p>
        {c.romance && (
          <p className="text-pink-500/90 mt-1">
            ❤ {c.romance.name} ({c.romance.type}) · affection {c.romance.affection}
          </p>
        )}
      </div>
    </div>
  );
};
