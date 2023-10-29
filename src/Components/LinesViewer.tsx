import { useContext } from 'react';
import { GameContext, gameContext } from '../Game/GameContext.ts';

export const LinesViewer = () => {
  const game: GameContext = useContext(gameContext);
  return <div>Lignes de code : {Math.floor(game.codeLines)}</div>;
};
