import { DialogueLine, DialogueOption, AIPartner } from '@/types/game';
import { personalityDialogues } from '@/data/gameData';
import { cn } from '@/lib/utils';

interface DialogueBoxProps {
  partner: AIPartner;
  currentLine: DialogueLine;
  onSelectOption: (option: DialogueOption) => void;
  isAnimating: boolean;
}

const getPersonalizedResponse = (partner: AIPartner, context: 'greeting' | 'impressed' | 'disappointed' | 'loving'): string => {
  const personality = partner.personalityId || 'balanced';
  const dialogues = personalityDialogues[personality] || personalityDialogues.balanced;
  const options = dialogues[context];
  return options[Math.floor(Math.random() * options.length)];
};

export const DialogueBox = ({ partner, currentLine, onSelectOption, isAnimating }: DialogueBoxProps) => {
  // Get personalized text based on partner's personality
  const getDialogueText = (): string => {
    if (currentLine.text) {
      return currentLine.text;
    }
    // If no text provided, generate based on personality
    return getPersonalizedResponse(partner, 'greeting');
  };

  if (currentLine.speaker === 'partner') {
    return (
      <div className="rounded-2xl bg-card p-6 shadow-card animate-fade-in">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-3xl">
            {partner.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-primary">{partner.name}</p>
              <span className="text-xs text-muted-foreground italic">({partner.personality})</span>
            </div>
            <p className={cn(
              'mt-1 text-lg leading-relaxed',
              isAnimating && 'animate-pulse-soft'
            )}>
              {getDialogueText()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      <p className="text-sm font-medium text-muted-foreground">Choose your response:</p>
      <div className="space-y-2">
        {currentLine.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectOption(option)}
            className="group w-full rounded-xl bg-card p-4 text-left shadow-soft transition-all hover:scale-[1.01] hover:shadow-card active:scale-[0.99]"
          >
            <p className="font-medium group-hover:text-primary transition-colors">
              {option.text}
            </p>
            <div className="mt-2 flex gap-1.5">
              {option.stats.map((stat) => (
                <span
                  key={stat}
                  className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  +{stat}
                </span>
              ))}
              <span className="rounded-full bg-stat-looks/20 px-2 py-0.5 text-xs font-medium text-stat-looks">
                +{option.affectionBonus} ❤️
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
