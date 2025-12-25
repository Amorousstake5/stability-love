import { Achievement } from '@/types/game';
import { cn } from '@/lib/utils';

interface AchievementPopupProps {
  achievement: Achievement;
}

export const AchievementPopup = ({ achievement }: AchievementPopupProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="overflow-hidden rounded-2xl bg-card shadow-card shadow-stability/20">
        <div className="gradient-gold p-1">
          <div className="rounded-xl bg-card p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-3xl animate-float">
                {achievement.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Achievement Unlocked!
                </p>
                <h3 className="font-display text-lg font-bold">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
