import { Player, StatKey } from '@/types/game';
import { StatBar } from './StatBar';
import { StabilityMeter } from './StabilityMeter';
import { Trophy, Calendar } from 'lucide-react';

interface PlayerProfileProps {
  player: Player;
}

const statOrder: StatKey[] = ['wealth', 'strength', 'looks', 'intelligence', 'education', 'health'];

export const PlayerProfile = ({ player }: PlayerProfileProps) => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-card p-6 shadow-card">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-4xl">
            {player.avatar}
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">{player.name}</h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Day {player.day}
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                {player.achievements.length} achievements
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl bg-card p-6 shadow-card">
        <div className="flex justify-center">
          <StabilityMeter value={player.stabilityIndex} />
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Balance your stats to increase stability and attract better matches
        </p>
      </div>
      
      <div className="rounded-2xl bg-card p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold mb-4">Your Stats</h3>
        <div className="space-y-4">
          {statOrder.map((stat) => (
            <StatBar key={stat} stat={stat} value={player.stats[stat]} />
          ))}
        </div>
      </div>
      
      {player.achievements.length > 0 && (
        <div className="rounded-2xl bg-card p-6 shadow-card">
          <h3 className="font-display text-lg font-semibold mb-4">Achievements</h3>
          <div className="grid grid-cols-4 gap-3">
            {player.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="group relative flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20 text-2xl transition-transform hover:scale-110"
                title={`${achievement.title}: ${achievement.description}`}
              >
                {achievement.icon}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
