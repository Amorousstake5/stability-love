import { useState } from 'react';
import { MainMenu } from '@/components/rpg/MainMenu';
import { CharacterCreation } from '@/components/rpg/CharacterCreation';
import { GameView } from '@/components/rpg/GameView';
import { useLifeRPG } from '@/hooks/useLifeRPG';

type Screen = 'menu' | 'create' | 'play';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('menu');
  const rpg = useLifeRPG();

  if (screen === 'menu') {
    return (
      <MainMenu
        hasSave={!!rpg.character && !rpg.character.ended}
        onContinue={() => setScreen('play')}
        onStart={() => setScreen('create')}
      />
    );
  }

  if (screen === 'create') {
    return (
      <CharacterCreation
        onBack={() => setScreen('menu')}
        onStart={(input) => {
          rpg.startGame(input);
          setScreen('play');
        }}
      />
    );
  }

  if (!rpg.character) {
    setScreen('menu');
    return null;
  }

  return (
    <GameView
      c={rpg.character}
      event={rpg.pendingEvent}
      lastResult={rpg.lastResult}
      onChoose={rpg.applyChoice}
      onDismissResult={rpg.dismissResult}
      onSkip={rpg.skipToNextEvent}
      onExitToMenu={() => setScreen('menu')}
    />
  );
};

export default Index;
