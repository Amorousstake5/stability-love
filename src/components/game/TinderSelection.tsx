import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, Sparkles } from 'lucide-react';
import { PlayerStats, StatKey } from '@/types/game';
import { avatarOptions, initialPlayerStats, potentialPartners } from '@/data/gameData';
import { cn } from '@/lib/utils';

interface TinderSelectionProps {
  onComplete: (settings: {
    playerName: string;
    playerAvatar: string;
    statPoints: PlayerStats;
    selectedPartner: typeof potentialPartners[0];
  }) => void;
}

const statLabels: Record<StatKey, { label: string; icon: string }> = {
  wealth: { label: 'Wealth', icon: '💰' },
  strength: { label: 'Strength', icon: '💪' },
  looks: { label: 'Looks', icon: '✨' },
  intelligence: { label: 'Intelligence', icon: '🧠' },
  education: { label: 'Education', icon: '📚' },
  health: { label: 'Health', icon: '❤️' },
};

export const TinderSelection = ({ onComplete }: TinderSelectionProps) => {
  const [step, setStep] = useState<'player' | 'stats' | 'swipe'>('player');
  const [playerName, setPlayerName] = useState('');
  const [playerAvatar, setPlayerAvatar] = useState('🧑');
  const [statPoints, setStatPoints] = useState<PlayerStats>({ ...initialPlayerStats });
  const [bonusPoints, setBonusPoints] = useState(15);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<typeof potentialPartners>([]);
  const [showMatch, setShowMatch] = useState<typeof potentialPartners[0] | null>(null);

  const adjustStat = (stat: StatKey, delta: number) => {
    if (delta > 0 && bonusPoints <= 0) return;
    if (delta < 0 && statPoints[stat] <= 10) return;
    
    setStatPoints(prev => ({
      ...prev,
      [stat]: Math.max(10, Math.min(70, prev[stat] + delta)),
    }));
    setBonusPoints(prev => prev - delta);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const partner = potentialPartners[currentIndex];
    
    if (direction === 'right') {
      // 60% chance they like you back (makes it harder)
      const theyLikeYou = Math.random() < 0.6;
      if (theyLikeYou) {
        setMatches(prev => [...prev, partner]);
        setShowMatch(partner);
      }
    }
    
    if (currentIndex < potentialPartners.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (matches.length === 0 && direction === 'left') {
      // Force at least one match on last card
      setMatches([partner]);
      setShowMatch(partner);
    }
  };

  const selectMatch = (partner: typeof potentialPartners[0]) => {
    onComplete({
      playerName: playerName || 'Player',
      playerAvatar,
      statPoints,
      selectedPartner: partner,
    });
  };

  const remainingCards = potentialPartners.slice(currentIndex);
  const isDoneSwiping = currentIndex >= potentialPartners.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm overflow-y-auto py-6">
      <div className="w-full max-w-lg mx-4 overflow-hidden rounded-2xl bg-card shadow-card animate-slide-up">
        {/* Header */}
        <div className="gradient-primary p-6 text-center">
          <Heart className="mx-auto h-10 w-10 text-primary-foreground animate-heart-beat" fill="currentColor" />
          <h1 className="mt-2 font-display text-2xl font-bold text-primary-foreground">LoveQuest</h1>
          <p className="text-sm text-primary-foreground/80">
            {step === 'player' && 'Create your character'}
            {step === 'stats' && 'Allocate your stats'}
            {step === 'swipe' && 'Find your match'}
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-1 px-6 pt-4">
          {['player', 'stats', 'swipe'].map((s, i) => (
            <div
              key={s}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                ['player', 'stats', 'swipe'].indexOf(step) >= i ? 'bg-primary' : 'bg-secondary'
              )}
            />
          ))}
        </div>

        <div className="p-6">
          {/* Step 1: Player Setup */}
          {step === 'player' && (
            <div className="space-y-6 animate-fade-in">
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

              <button
                onClick={() => setStep('stats')}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Step 2: Stats */}
          {step === 'stats' && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-sm text-muted-foreground">
                Bonus points: <span className="font-bold text-primary">{bonusPoints}</span> remaining
              </p>

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
                      disabled={bonusPoints <= 0 || statPoints[stat] >= 70}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep('player')}
                  className="flex-1 rounded-lg bg-secondary px-4 py-3 font-medium transition-colors hover:bg-secondary/80"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('swipe')}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Find Matches <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Swipe */}
          {step === 'swipe' && !isDoneSwiping && (
            <div className="animate-fade-in">
              <div className="relative h-[400px]">
                <AnimatePresence>
                  {remainingCards.slice(0, 3).reverse().map((partner, i) => {
                    const isTop = i === remainingCards.slice(0, 3).length - 1;
                    return (
                      <SwipeableCard
                        key={partner.id}
                        partner={partner}
                        isTop={isTop}
                        onSwipe={handleSwipe}
                        stackIndex={remainingCards.slice(0, 3).length - 1 - i}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>
              
              <div className="flex justify-center gap-6 mt-4">
                <button
                  onClick={() => handleSwipe('left')}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-card shadow-lg border-2 border-red-500/20 text-red-500 transition-transform hover:scale-110"
                >
                  ✕
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-card shadow-lg border-2 border-green-500/20 text-green-500 transition-transform hover:scale-110"
                >
                  <Heart className="h-6 w-6" fill="currentColor" />
                </button>
              </div>
            </div>
          )}

          {/* Match Selection */}
          {step === 'swipe' && isDoneSwiping && (
            <div className="animate-fade-in space-y-4">
              <div className="text-center">
                <Sparkles className="mx-auto h-8 w-8 text-accent" />
                <h3 className="mt-2 font-display text-xl font-bold">
                  {matches.length} Match{matches.length !== 1 ? 'es' : ''}!
                </h3>
                <p className="text-sm text-muted-foreground">Choose who to pursue</p>
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {matches.map((match) => (
                  <button
                    key={match.id}
                    onClick={() => selectMatch(match)}
                    className="w-full flex items-center gap-4 rounded-xl bg-secondary p-4 text-left transition-all hover:bg-secondary/80 hover:scale-[1.02]"
                  >
                    <span className="text-4xl">{match.avatar}</span>
                    <div className="flex-1">
                      <div className="font-semibold">{match.name}, {match.age}</div>
                      <div className="text-sm text-muted-foreground">{match.personality}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Match Popup */}
        <AnimatePresence>
          {showMatch && !isDoneSwiping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-foreground/80 backdrop-blur-sm"
              onClick={() => setShowMatch(null)}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="text-center p-8"
              >
                <div className="text-6xl mb-4">💕</div>
                <h3 className="font-display text-3xl font-bold text-primary-foreground">It's a Match!</h3>
                <p className="mt-2 text-primary-foreground/80">You and {showMatch.name} liked each other</p>
                <button
                  onClick={() => setShowMatch(null)}
                  className="mt-6 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground"
                >
                  Keep Swiping
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Swipeable Card Component
interface SwipeableCardProps {
  partner: typeof potentialPartners[0];
  isTop: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
  stackIndex: number;
}

const SwipeableCard = ({ partner, isTop, onSwipe, stackIndex }: SwipeableCardProps) => {
  const [dragX, setDragX] = useState(0);

  return (
    <motion.div
      className={cn(
        "absolute inset-0 rounded-2xl bg-card shadow-card overflow-hidden",
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      )}
      style={{
        scale: 1 - stackIndex * 0.05,
        y: stackIndex * 8,
        zIndex: 10 - stackIndex,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={(_, info) => setDragX(info.offset.x)}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) onSwipe('right');
        else if (info.offset.x < -100) onSwipe('left');
        setDragX(0);
      }}
      animate={{ x: 0, rotate: isTop ? dragX * 0.1 : 0 }}
      exit={{ x: dragX > 0 ? 300 : -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Like/Nope Indicators */}
      {isTop && (
        <>
          <div 
            className="absolute left-4 top-4 z-10 rounded-lg border-4 border-green-500 px-4 py-2 font-bold text-green-500 rotate-[-15deg] transition-opacity"
            style={{ opacity: Math.max(0, dragX / 100) }}
          >
            LIKE
          </div>
          <div 
            className="absolute right-4 top-4 z-10 rounded-lg border-4 border-red-500 px-4 py-2 font-bold text-red-500 rotate-[15deg] transition-opacity"
            style={{ opacity: Math.max(0, -dragX / 100) }}
          >
            NOPE
          </div>
        </>
      )}

      {/* Avatar */}
      <div className="h-44 gradient-primary flex items-center justify-center">
        <span className="text-7xl">{partner.avatar}</span>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-xl font-bold">{partner.name}</h3>
          <span className="text-lg text-muted-foreground">{partner.age}</span>
        </div>
        <p className="text-sm text-accent">{partner.personality}</p>
        <p className="mt-2 text-sm text-foreground line-clamp-2">{partner.bio}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {partner.traits.slice(0, 3).map((trait) => (
            <span 
              key={trait}
              className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium"
            >
              {trait}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> {partner.compatibilityHint}
        </p>
      </div>
    </motion.div>
  );
};