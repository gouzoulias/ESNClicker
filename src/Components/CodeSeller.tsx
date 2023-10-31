import { useCallback, useContext } from 'react';
import { gameContext } from '../Game/GameContext.ts';
import { Button } from './Button.tsx';

export const CodeSeller = () => {
  const game = useContext(gameContext);

  const sellCode = useCallback(() => {
    game.sellCode(game.manualSellingForce);
  }, [game]);

  return (
    <div style={{ padding: 16 }}>
      <Button onClick={sellCode}>
        Vendre <b>{game.manualSellingForce}</b> lignes de code pour <b>{game.manualSellingForce * game.codePrice}€</b>
      </Button>
    </div>
  );
};
