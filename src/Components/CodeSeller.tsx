import { useCallback, useContext } from 'react';
import { gameContext } from '../Game/GameContext.ts';

export const CodeSeller = () => {
  const game = useContext(gameContext);

  const sellCode = useCallback(() => {
    game.sellCode(game.manualSellingForce);
  }, [game]);

  return (
    <button type="button" onClick={sellCode}>
      Vendre {game.manualSellingForce} lignes de code pour {game.manualSellingForce * game.codePrice}$
    </button>
  );
};
