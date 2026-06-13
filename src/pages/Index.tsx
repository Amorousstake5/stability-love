import { useEffect, useRef, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useSociety } from '@/hooks/useSociety';
import { activities } from '@/data/gameData';
import { GameHeader } from '@/components/game/GameHeader';
import { PlayerProfile } from '@/components/game/PlayerProfile';
import { ActivityCard } from '@/components/game/ActivityCard';
import { PartnerCard } from '@/components/game/PartnerCard';
import { DateOptions } from '@/components/game/DateOptions';
import { DateSimulation } from '@/components/game/DateSimulation';
import { SetupModal } from '@/components/game/SetupModal';
import { AchievementPopup } from '@/components/game/AchievementPopup';
import { SocialCircle } from '@/components/game/SocialCircle';
import { MeddleEventModal } from '@/components/game/MeddleEventModal';
import { LifeCrisisModal } from '@/components/game/LifeCrisisModal';
import { MarriageActions } from '@/components/game/MarriageActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Heart, Dumbbell, Users } from 'lucide-react';
import { toast } from 'sonner';
import { MeddleChoice, MeddleEvent } from '@/types/society';

const Index = () => {
  const game = useGameState();
  const { society, initSociety, rollMeddleEvent, setPendingEvent, applyMeddleEffects, resolveCrisis, tickDecay } = useSociety();
  const [activeTab, setActiveTab] = useState('activities');
  const lastDayRef = useRef(0);

  // Init social circle once
  useEffect(() => {
    if (game.isSetupComplete && society.circle.length === 0) {
      initSociety();
    }
  }, [game.isSetupComplete, society.circle.length, initSociety]);

  // On each day advance, roll meddle / decay
  useEffect(() => {
    if (!game.player || society.circle.length === 0) return;
    if (game.player.day === lastDayRef.current) return;
    lastDayRef.current = game.player.day;
    if (society.pendingEvent || society.spiral.activeCrisis) return;
    const evt = rollMeddleEvent({
      hasPartner: !!game.partner,
      isMarried: game.marriageStage === 'married',
      day: game.player.day,
    });
    if (evt) {
      setPendingEvent(evt);
    } else {
      tickDecay();
    }
  }, [game.player?.day, game.partner, game.marriageStage, society.circle.length, society.pendingEvent, society.spiral.activeCrisis, rollMeddleEvent, setPendingEvent, tickDecay, game.player]);

  if (!game.isSetupComplete) {
    return <SetupModal onComplete={game.initializeGame} />;
  }
  if (!game.player) return null;

  const handleMeddleChoice = (event: MeddleEvent, choice: MeddleChoice) => {
    game.applyExternalEffects({
      stats: choice.effects.stats,
      stability: choice.effects.stability,
      affection: choice.effects.affection,
    });
    applyMeddleEffects(event.npc.id, {
      reputation: choice.effects.reputation,
      debt: choice.effects.debt,
      spiral: choice.effects.spiral,
      relationship: choice.effects.relationship,
    });
    toast(event.npc.name, { description: choice.text });
  };

  const married = game.marriageStage === 'married';
  const engaged = game.marriageStage === 'engaged';

  return (
    <div className="min-h-screen gradient-romantic">
      <GameHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4 space-y-6">
            <PlayerProfile player={game.player} />
            {game.partner && <PartnerCard partner={game.partner} />}
            {game.partner && (
              <MarriageActions
                partner={game.partner}
                married={married}
                engaged={engaged}
                onPropose={game.propose}
                onMarry={game.marry}
                onPartWays={game.partWays}
              />
            )}
            {!game.partner && (
              <div className="rounded-xl bg-card p-6 text-center shadow-soft">
                <p className="text-4xl mb-2">💔</p>
                <p className="font-semibold">No partner</p>
                <p className="text-xs text-muted-foreground mt-1">Heartbreaks survived: {game.breakupCount}</p>
              </div>
            )}
          </aside>

          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-3">
                <TabsTrigger value="activities" className="flex items-center gap-2"><Dumbbell className="h-4 w-4" />Self</TabsTrigger>
                <TabsTrigger value="dates" className="flex items-center gap-2" disabled={!game.partner}><Heart className="h-4 w-4" />Date</TabsTrigger>
                <TabsTrigger value="society" className="flex items-center gap-2"><Users className="h-4 w-4" />Society</TabsTrigger>
              </TabsList>

              <TabsContent value="activities" className="animate-fade-in">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h2 className="font-display text-xl font-semibold">Improve Yourself</h2>
                </div>
                <p className="mb-6 text-muted-foreground">Build yourself. Survive the meddling. Don't spiral.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {activities.map((a) => <ActivityCard key={a.id} activity={a} onSelect={game.performActivity} />)}
                </div>
              </TabsContent>

              <TabsContent value="dates" className="animate-fade-in">
                {game.partner && (
                  <>
                    <div className="mb-4 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-stat-looks" />
                      <h2 className="font-display text-xl font-semibold">Date {game.partner.name}</h2>
                    </div>
                    <DateOptions partner={game.partner} onSelectDate={game.startDate} />
                  </>
                )}
              </TabsContent>

              <TabsContent value="society" className="animate-fade-in">
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-semibold">Family, In-Laws & Neighbours</h2>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Everyone has an opinion about your life. Some help. Most don't. Their meddling fuels your life spiral — manage it or watch things unravel.
                </p>
                <SocialCircle
                  circle={society.circle}
                  reputation={society.reputation}
                  debt={society.debt}
                  spiralPressure={society.spiral.pressure}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {game.activeDate && game.partner && (
        <DateSimulation
          scenario={game.activeDate}
          partner={game.partner}
          player={game.player}
          onComplete={game.completeDate}
          onClose={game.cancelDate}
        />
      )}

      <MeddleEventModal event={society.pendingEvent} onChoose={handleMeddleChoice} />
      <LifeCrisisModal crisis={society.spiral.activeCrisis} onResolve={resolveCrisis} />

      {game.newAchievement && <AchievementPopup achievement={game.newAchievement} />}
    </div>
  );
};

export default Index;
