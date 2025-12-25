import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { activities } from '@/data/gameData';
import { GameHeader } from '@/components/game/GameHeader';
import { PlayerProfile } from '@/components/game/PlayerProfile';
import { ActivityCard } from '@/components/game/ActivityCard';
import { MatchCard } from '@/components/game/MatchCard';
import { AchievementPopup } from '@/components/game/AchievementPopup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Users, Dumbbell } from 'lucide-react';

const Index = () => {
  const { player, matches, performActivity, newAchievement } = useGameState();
  const [activeTab, setActiveTab] = useState('activities');

  return (
    <div className="min-h-screen gradient-romantic">
      <GameHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Player Profile Sidebar */}
          <aside className="lg:col-span-4">
            <PlayerProfile player={player} />
          </aside>
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="activities" className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  Daily Activities
                </TabsTrigger>
                <TabsTrigger value="matches" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Matches
                  {matches.filter(m => (m.compatibilityScore || 0) >= 70).length > 0 && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {matches.filter(m => (m.compatibilityScore || 0) >= 70).length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="activities" className="animate-fade-in">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h2 className="font-display text-xl font-semibold">Choose Your Daily Activity</h2>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Each activity takes one day. Balance your choices to maximize your Stability Index!
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
              
              <TabsContent value="matches" className="animate-fade-in">
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-semibold">Potential Matches</h2>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Compatibility is based on how well your stats match their preferences. Keep improving!
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {matches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {newAchievement && <AchievementPopup achievement={newAchievement} />}
    </div>
  );
};

export default Index;
