import { useState } from 'react';
import { DateScenario, DialogueOption, AIPartner, Player } from '@/types/game';
import { DialogueBox } from './DialogueBox';
import { X, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateSimulationProps {
  scenario: DateScenario;
  partner: AIPartner;
  player: Player;
  onComplete: (affectionGained: number, chosenStats: string[]) => void;
  onClose: () => void;
}

export const DateSimulation = ({ scenario, partner, player, onComplete, onClose }: DateSimulationProps) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [totalAffection, setTotalAffection] = useState(0);
  const [chosenStats, setChosenStats] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentLine = scenario.dialogue[dialogueIndex];

  const handleSelectOption = (option: DialogueOption) => {
    setTotalAffection(prev => prev + option.affectionBonus);
    setChosenStats(prev => [...prev, ...option.stats]);
    advanceDialogue();
  };

  const advanceDialogue = () => {
    if (dialogueIndex < scenario.dialogue.length - 1) {
      setDialogueIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleFinish = () => {
    onComplete(totalAffection, chosenStats);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-background shadow-card animate-slide-up">
        {/* Header */}
        <div className="relative gradient-primary p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-primary-foreground/20 p-2 transition-colors hover:bg-primary-foreground/30"
          >
            <X className="h-4 w-4 text-primary-foreground" />
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-4xl">{scenario.icon}</span>
            <div>
              <h2 className="font-display text-xl font-bold text-primary-foreground">{scenario.name}</h2>
              <p className="text-sm text-primary-foreground/80">{scenario.description}</p>
            </div>
          </div>
        </div>

        {/* Date progress */}
        <div className="flex gap-1 px-6 py-3 bg-card">
          {scenario.dialogue.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                i <= dialogueIndex ? 'bg-primary' : 'bg-secondary'
              )}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {!isComplete ? (
            <>
              <DialogueBox
                partner={partner}
                currentLine={currentLine}
                onSelectOption={handleSelectOption}
                isAnimating={false}
              />
              
              {currentLine.speaker === 'partner' && (
                <button
                  onClick={advanceDialogue}
                  className="mt-4 ml-auto flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stat-looks/20">
                <Heart className="h-10 w-10 text-stat-looks animate-heart-beat" fill="currentColor" />
              </div>
              <h3 className="font-display text-2xl font-bold">Date Complete!</h3>
              <p className="mt-2 text-muted-foreground">
                {partner.name} {totalAffection > 5 ? 'really enjoyed' : 'had a nice time on'} the date!
              </p>
              
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-stat-looks/20 px-4 py-2 text-stat-looks">
                <Heart className="h-4 w-4" fill="currentColor" />
                <span className="font-bold">+{totalAffection} Affection</span>
              </div>

              <button
                onClick={handleFinish}
                className="mt-6 w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
