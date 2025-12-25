import { useState } from 'react';
import { GameSettings, PlayerStats, StatKey } from '@/types/game';
import { avatarOptions, partnerPersonalities, initialPlayerStats } from '@/data/gameData';
import { Heart, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SetupModalProps {
  onComplete: (settings: GameSettings) => void;
}

const statLabels: Record<StatKey, { label: string; icon: string }> = {
  wealth: { label: 'Wealth', icon: '💰' },
  strength: { label: 'Strength', icon: '💪' },
  looks: { label: 'Looks', icon: '✨' },
  intelligence: { label: 'Intelligence', icon: '🧠' },
  education: { label: 'Education', icon: '📚' },
  health: { label: 'Health', icon: '❤️' },
};

const partnerAvatars = ['👩', '👨', '🧑', '👩‍🦰', '👨‍🦱', '🧔', '👱‍♀️', '👱'];

export const SetupModal = ({ onComplete }: SetupModalProps) => {
  const [step, setStep] = useState(1);
  const [playerName, setPlayerName] = useState('');
  const [playerAvatar, setPlayerAvatar] = useState('🧑');
  const [partnerName, setPartnerName] = useState('Alex');
  const [partnerAvatar, setPartnerAvatar] = useState('👩');
  const [partnerPersonality, setPartnerPersonality] = useState('balanced');
  const [statPoints, setStatPoints] = useState<PlayerStats>({ ...initialPlayerStats });
  const [bonusPoints, setBonusPoints] = useState(20);

  const adjustStat = (stat: StatKey, delta: number) => {
    if (delta > 0 && bonusPoints <= 0) return;
    if (delta < 0 && statPoints[stat] <= 10) return;
    
    setStatPoints(prev => ({
      ...prev,
      [stat]: Math.max(10, Math.min(80, prev[stat] + delta)),
    }));
    setBonusPoints(prev => prev - delta);
  };

  const handleComplete = () => {
    onComplete({
      playerName: playerName || 'Player',
      playerAvatar,
      partnerName,
      partnerAvatar,
      partnerPersonality,
      statPoints,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
      <div className="w-full max-w-lg mx-4 overflow-hidden rounded-2xl bg-card shadow-card animate-slide-up">
        {/* Header */}
        <div className="gradient-primary p-6 text-center">
          <Heart className="mx-auto h-10 w-10 text-primary-foreground animate-heart-beat" fill="currentColor" />
          <h1 className="mt-2 font-display text-2xl font-bold text-primary-foreground">LoveQuest</h1>
          <p className="text-sm text-primary-foreground/80">Create your character</p>
        </div>

        {/* Progress */}
        <div className="flex gap-1 px-6 pt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                s <= step ? 'bg-primary' : 'bg-secondary'
              )}
            />
          ))}
        </div>

        <div className="p-6">
          {/* Step 1: Your Character */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-xl font-semibold">Your Character</h2>
                <p className="text-sm text-muted-foreground">Who will you be?</p>
              </div>

              <div>
                <label className="text-sm font-medium">Your Name</label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name..."
                  className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Choose Avatar</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setPlayerAvatar(avatar)}
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all',
                        playerAvatar === avatar
                          ? 'bg-primary shadow-glow scale-110'
                          : 'bg-secondary hover:bg-secondary/80'
                      )}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: AI Partner */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-xl font-semibold">Your Date</h2>
                <p className="text-sm text-muted-foreground">Customize your AI companion</p>
              </div>

              <div>
                <label className="text-sm font-medium">Partner's Name</label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Enter their name..."
                  className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Partner's Avatar</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {partnerAvatars.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setPartnerAvatar(avatar)}
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all',
                        partnerAvatar === avatar
                          ? 'bg-primary shadow-glow scale-110'
                          : 'bg-secondary hover:bg-secondary/80'
                      )}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Personality Type</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {partnerPersonalities.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPartnerPersonality(p.id)}
                      className={cn(
                        'rounded-lg p-3 text-left transition-all',
                        partnerPersonality === p.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-secondary/80'
                      )}
                    >
                      <div className="font-semibold">{p.name}</div>
                      <div className={cn(
                        'text-xs',
                        partnerPersonality === p.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      )}>
                        {p.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Stats */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h2 className="font-display text-xl font-semibold">Allocate Stats</h2>
                <p className="text-sm text-muted-foreground">
                  Distribute your bonus points: <span className="font-bold text-primary">{bonusPoints}</span> remaining
                </p>
              </div>

              <div className="space-y-3">
                {(Object.keys(statLabels) as StatKey[]).map((stat) => (
                  <div key={stat} className="flex items-center gap-3">
                    <span className="w-6 text-center">{statLabels[stat].icon}</span>
                    <span className="w-24 text-sm font-medium">{statLabels[stat].label}</span>
                    <button
                      onClick={() => adjustStat(stat, -5)}
                      disabled={statPoints[stat] <= 10}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground disabled:opacity-30"
                    >
                      -
                    </button>
                    <div className="flex-1">
                      <div className="h-3 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${statPoints[stat]}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-8 text-center text-sm font-bold tabular-nums">{statPoints[stat]}</span>
                    <button
                      onClick={() => adjustStat(stat, 5)}
                      disabled={bonusPoints <= 0 || statPoints[stat] >= 80}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1 rounded-lg bg-secondary px-4 py-2.5 font-medium transition-colors hover:bg-secondary/80"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            )}
            <button
              onClick={() => (step < 3 ? setStep(step + 1) : handleComplete())}
              className="ml-auto flex items-center gap-1 rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {step < 3 ? (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Start Game
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
