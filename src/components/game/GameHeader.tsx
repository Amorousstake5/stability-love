import { Heart } from 'lucide-react';

export const GameHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Heart className="h-8 w-8 text-primary animate-heart-beat" fill="currentColor" />
          <h1 className="font-display text-2xl font-bold">
            <span className="text-primary">Love</span>
            <span>Quest</span>
          </h1>
        </div>
        <p className="hidden text-sm text-muted-foreground sm:block">
          Build your best self. Find your perfect match.
        </p>
      </div>
    </header>
  );
};
