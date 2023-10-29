import { useContext } from 'react';
import { GameContext, gameContext } from '../Game/GameContext.ts';

export const MoneyViewer = () => {
  const game: GameContext = useContext(gameContext);
  return <div>Argent : {game.money}€</div>;
};
