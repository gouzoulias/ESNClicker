import { useContext } from 'react';
import { GameContext, gameContext } from '../Game/GameContext.ts';
import { formatNumber } from '../Utils/util.ts';

export const MoneyViewer = () => {
  const game: GameContext = useContext(gameContext);
  return <div>Argent : {formatNumber(game.money)} €</div>;
};
