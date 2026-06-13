import { RPGCharacter, RPGEvent, RPGChoice } from '@/types/rpg';
import { StatPanel } from './StatPanel';
import { EventCard } from './EventCard';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Home, ScrollText } from 'lucide-react';
import { useState } from 'react';

interface Props {
  c: RPGCharacter;
  event: RPGEvent | null;
  lastResult: string | null;
  onChoose: (choice: RPGChoice) => void;
  onDismissResult: () => void;
  onSkip: () => void;
  onExitToMenu: () => void;
}

export const GameView = ({ c, event, lastResult, onChoose, onDismissResult, onSkip, onExitToMenu }: Props) => {
  const { theme, toggle } = useTheme();
  const [showLog, setShowLog] = useState(false);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'gradient-matte-blue' : 'gradient-matte-blue-light'}`}>
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold">Beta, Sun Le.</h1>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setShowLog(s => !s)}><ScrollText className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={toggle}>{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
          <Button variant="ghost" size="sm" onClick={onExitToMenu}><Home className="h-4 w-4" /></Button>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12 grid lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1 space-y-4">
          <StatPanel c={c} />
          {showLog && (
            <div className="rounded-2xl bg-background/70 backdrop-blur border border-border p-4 max-h-96 overflow-y-auto text-xs space-y-1.5">
              <p className="font-semibold mb-2">Life Log</p>
              {c.log.slice().reverse().map((line, i) => (
                <p key={i} className="text-foreground/70">{line}</p>
              ))}
            </div>
          )}
        </aside>

        <section className="lg:col-span-2">
          {c.ended ? (
            <div className="rounded-2xl bg-background/80 backdrop-blur border border-border p-8 text-center shadow-card">
              <p className="text-xs uppercase tracking-widest text-foreground/50">The End</p>
              <h2 className="font-display text-3xl font-bold mt-2">{c.endingTitle}</h2>
              <p className="mt-3 text-foreground/70">{c.name} lived to age {c.age}.</p>
              <Button className="mt-6" onClick={onExitToMenu}>Back to Menu</Button>
            </div>
          ) : (
            <EventCard
              c={c}
              event={event}
              lastResult={lastResult}
              onChoose={onChoose}
              onDismissResult={onDismissResult}
              onSkip={onSkip}
            />
          )}
        </section>
      </main>
    </div>
  );
};
