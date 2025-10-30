import { useContext } from 'react';
import { GameContext, gameContext } from '../Game/GameContext';
import { formatNumber } from '../Utils/util';

export const MoneyViewer = () => {
  const game: GameContext = useContext(gameContext);
  return <div>Argent : {formatNumber(game.money)} €</div>;
};
