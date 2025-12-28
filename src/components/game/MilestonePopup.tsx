import { motion, AnimatePresence } from 'framer-motion';
import { RelationshipMilestone } from '@/types/game';

interface MilestonePopupProps {
  milestone: RelationshipMilestone | null;
  onClose: () => void;
}

export const MilestonePopup = ({ milestone, onClose }: MilestonePopupProps) => {
  if (!milestone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className="fixed bottom-4 right-4 z-50 w-80 overflow-hidden rounded-2xl bg-gradient-to-br from-stat-looks to-primary shadow-glow"
        onClick={onClose}
      >
        <div className="p-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-4xl"
          >
            {milestone.icon}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm font-medium text-white/80">Relationship Milestone!</p>
            <h3 className="mt-1 font-display text-xl font-bold text-white">
              {milestone.title}
            </h3>
            <p className="mt-2 text-sm text-white/90">{milestone.description}</p>
            
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {milestone.rewards.stabilityBonus && (
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                  +{milestone.rewards.stabilityBonus} Stability
                </span>
              )}
              {milestone.rewards.statBonus && Object.entries(milestone.rewards.statBonus).map(([stat, value]) => (
                <span key={stat} className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                  +{value} {stat}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
