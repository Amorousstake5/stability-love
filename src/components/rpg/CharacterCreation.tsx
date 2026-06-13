import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NewGameInput } from '@/hooks/useLifeRPG';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface Props {
  onStart: (input: NewGameInput) => void;
  onBack: () => void;
}

export const CharacterCreation = ({ onStart, onBack }: Props) => {
  const [name, setName] = useState('Aarav');
  const [hometown, setHometown] = useState('Lucknow');
  const [fatherName, setFatherName] = useState('Rajesh');
  const [motherName, setMotherName] = useState('Sunita');
  const [siblings, setSiblings] = useState(1);

  return (
    <div className="min-h-screen gradient-matte-blue dark:gradient-matte-blue gradient-matte-blue-light:gradient-matte-blue-light flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl rounded-2xl bg-background/70 backdrop-blur border border-border p-7 shadow-card">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </button>
        <h2 className="font-display text-3xl font-semibold">Create Your Character</h2>
        <p className="text-sm text-foreground/60 mt-1">An Indian boy. Age 5. The rest is unwritten.</p>

        <div className="mt-6 space-y-4">
          <div>
            <Label>Your Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <Label>Hometown</Label>
            <Input value={hometown} onChange={e => setHometown(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Father</Label>
              <Input value={fatherName} onChange={e => setFatherName(e.target.value)} />
            </div>
            <div>
              <Label>Mother</Label>
              <Input value={motherName} onChange={e => setMotherName(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Siblings</Label>
            <Input type="number" min={0} max={5} value={siblings} onChange={e => setSiblings(Math.max(0, Math.min(5, +e.target.value || 0)))} />
          </div>
        </div>

        <Button
          className="mt-7 w-full h-12 text-base"
          onClick={() => onStart({ name: name.trim() || 'Aarav', hometown: hometown.trim() || 'Lucknow', fatherName: fatherName.trim() || 'Papa', motherName: motherName.trim() || 'Mummy', siblings })}
        >
          <Sparkles className="mr-2 h-4 w-4" /> Begin Life
        </Button>
        <p className="mt-3 text-xs text-foreground/50 text-center">
          Parent strictness, warmth and health are randomly rolled. Some lives are harder than others.
        </p>
      </div>
    </div>
  );
};
