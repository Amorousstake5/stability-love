import { LifeCrisis } from '@/types/society';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  crisis: LifeCrisis | null;
  onResolve: (cost: { stability?: number; debt?: number; reputation?: number }) => void;
}

export const LifeCrisisModal = ({ crisis, onResolve }: Props) => {
  if (!crisis) return null;
  return (
    <Dialog open={!!crisis}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="text-5xl">{crisis.icon}</div>
            <div>
              <DialogTitle>{crisis.title}</DialogTitle>
              <DialogDescription className="pt-1">{crisis.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-2">
          <Button variant="outline" className="h-auto w-full justify-start whitespace-normal py-3 text-left" onClick={() => onResolve({ debt: 30, stability: -5 })}>
            <div>
              <p className="font-medium">Take a loan, push through</p>
              <p className="text-xs text-muted-foreground">+₹30k debt, −5 stability. Survive now, pay later.</p>
            </div>
          </Button>
          <Button variant="outline" className="h-auto w-full justify-start whitespace-normal py-3 text-left" onClick={() => onResolve({ reputation: -15, stability: 5 })}>
            <div>
              <p className="font-medium">Ask family for help</p>
              <p className="text-xs text-muted-foreground">−15 reputation, +5 stability. Everyone will know.</p>
            </div>
          </Button>
          <Button variant="outline" className="h-auto w-full justify-start whitespace-normal py-3 text-left" onClick={() => onResolve({ stability: -15 })}>
            <div>
              <p className="font-medium">Tough it out alone</p>
              <p className="text-xs text-muted-foreground">−15 stability. Pride intact.</p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
