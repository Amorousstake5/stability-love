import { AIPartner } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Heart, Users2, HeartCrack } from 'lucide-react';

interface Props {
  partner: AIPartner;
  married: boolean;
  engaged: boolean;
  onPropose: () => void;
  onMarry: () => void;
  onPartWays: () => void;
}

export const MarriageActions = ({ partner, married, engaged, onPropose, onMarry, onPartWays }: Props) => {
  return (
    <div className="rounded-xl bg-card p-4 shadow-soft space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold">Relationship</h3>
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {married ? 'Married' : engaged ? 'Engaged' : partner.relationshipStatus}
        </span>
      </div>

      {!engaged && !married && (
        <Button onClick={onPropose} disabled={partner.affection < 70} className="w-full" variant="default">
          <Heart className="mr-2 h-4 w-4" />
          Propose {partner.affection < 70 && `(need 70 affection, at ${partner.affection})`}
        </Button>
      )}

      {engaged && !married && (
        <Button onClick={onMarry} className="w-full">
          <Users2 className="mr-2 h-4 w-4" />
          Get Married
        </Button>
      )}

      <Button onClick={onPartWays} variant="outline" className="w-full text-destructive hover:text-destructive">
        <HeartCrack className="mr-2 h-4 w-4" />
        {married ? 'Divorce & Start Over' : 'Part Ways'}
      </Button>
    </div>
  );
};
