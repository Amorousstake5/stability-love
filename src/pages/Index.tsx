import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { activities } from '@/data/gameData';
import { GameHeader } from '@/components/game/GameHeader';
import { PlayerProfile } from '@/components/game/PlayerProfile';
import { ActivityCard } from '@/components/game/ActivityCard';
import { PartnerCard } from '@/components/game/PartnerCard';
import { DateOptions } from '@/components/game/DateOptions';
import { DateSimulation } from '@/components/game/DateSimulation';
import { SetupModal } from '@/components/game/SetupModal';
import { AchievementPopup } from '@/components/game/AchievementPopup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Heart, Dumbbell } from 'lucide-react';

const Index = () => {
  const { 
    isSetupComplete, 
    player, 
    partner, 
    newAchievement, 
    activeDate,
    initializeGame, 
    performActivity,
    startDate,
    completeDate,
    cancelDate,
  } = useGameState();
  
  const [activeTab, setActiveTab] = useState('activities');

  if (!isSetupComplete) {
    return <SetupModal onComplete={initializeGame} />;
  }

  if (!player || !partner) return null;

  return (
    <div className="min-h-screen gradient-romantic">
      <GameHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Player Profile Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <PlayerProfile player={player} />
            <PartnerCard partner={partner} />
          </aside>
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="activities" className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  Daily Activities
                </TabsTrigger>
                <TabsTrigger value="dates" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Go on a Date
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="activities" className="animate-fade-in">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h2 className="font-display text-xl font-semibold">Improve Yourself</h2>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Each activity takes one day and affects your stats. Build yourself up to impress {partner.name}!
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {activities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      onSelect={performActivity}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="dates" className="animate-fade-in">
                <div className="mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-stat-looks" />
                  <h2 className="font-display text-xl font-semibold">Date {partner.name}</h2>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Unlock new date options by building affection. Your choices matter!
                </p>
                <DateOptions partner={partner} onSelectDate={startDate} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {activeDate && (
        <DateSimulation
          scenario={activeDate}
          partner={partner}
          player={player}
          onComplete={completeDate}
          onClose={cancelDate}
        />
      )}
      
      {newAchievement && <AchievementPopup achievement={newAchievement} />}
    </div>
  );
};

export default Index;
