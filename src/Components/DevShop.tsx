import { useContext } from 'react';
import { Dev } from '../Game/Dev.ts';
import { gameContext } from '../Game/GameContext.ts';

export const DevShop = () => {
  const game = useContext(gameContext);

  if (game.totalMoneyAccumulated < 20n) {
    return null;
  }

  return (
    <div>
      {game.totalCodeLinesAccumulated > 20n && (
        <button onClick={() => game.buyDev(Dev.Stagiaire)}>Engager un stagiaire pour {game.devPrice[Dev.Stagiaire].toString()}</button>
      )}
    </div>
  );
};
