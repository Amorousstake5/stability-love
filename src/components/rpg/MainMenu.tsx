import { Button } from '@/components/ui/button';
import { Sun, Moon, Play, RefreshCw, Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface Props {
  onStart: () => void;
  hasSave: boolean;
  onContinue?: () => void;
}

export const MainMenu = ({ onStart, hasSave, onContinue }: Props) => {
  const { theme, toggle } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'gradient-matte-blue' : 'gradient-matte-blue-light'} flex items-center justify-center px-6`}>
      <div className="w-full max-w-lg text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-foreground/60">A Life Simulation</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground drop-shadow-sm">
          Beta, Sun Le.
        </h1>
        <p className="mt-3 text-foreground/70">
          The life of an Indian boy — from childhood to whatever comes next.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          {hasSave && onContinue && (
            <Button size="lg" onClick={onContinue} className="h-14 text-lg">
              <Play className="mr-2 h-5 w-5" /> Continue
            </Button>
          )}
          <Button size="lg" onClick={onStart} variant={hasSave ? 'secondary' : 'default'} className="h-14 text-lg">
            <Play className="mr-2 h-5 w-5" /> Start New Game
          </Button>
          <Button size="lg" variant="outline" onClick={() => setShowOptions(v => !v)} className="h-14 text-lg bg-background/40 backdrop-blur">
            <SettingsIcon className="mr-2 h-5 w-5" /> Options
          </Button>
        </div>

        {showOptions && (
          <div className="mt-6 rounded-xl border border-border bg-background/60 backdrop-blur p-5 text-left space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-medium">Theme</span>
              <Button variant="ghost" size="sm" onClick={toggle}>
                {theme === 'dark' ? <><Moon className="mr-2 h-4 w-4" />Dark</> : <><Sun className="mr-2 h-4 w-4" />Light</>}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Reload Game</span>
              <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
                <RefreshCw className="mr-2 h-4 w-4" /> Reload
              </Button>
            </div>
          </div>
        )}

        <p className="mt-10 text-xs text-foreground/40">v0.1 — choices matter, randomness rules.</p>
      </div>
    </div>
  );
};
