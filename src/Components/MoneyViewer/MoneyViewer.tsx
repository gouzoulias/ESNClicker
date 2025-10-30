import { useContext } from 'react';
import { GameContext, gameContext } from '@game/GameContext';
import { formatNumber } from '@utils/util';

export const MoneyViewer = () => {
  const game: GameContext = useContext(gameContext);
  return <div>Argent : {formatNumber(game.money)} €</div>;
};
