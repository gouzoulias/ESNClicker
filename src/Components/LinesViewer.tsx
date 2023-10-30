import { useContext, useEffect } from 'react';
import { GameContext, gameContext } from '../Game/GameContext.ts';

export const LinesViewer = () => {
  const game: GameContext = useContext(gameContext);

  useEffect(() => {
    // TODO : Delete this log
    console.log('LinesViewer : game', game);
  }, [game]);

  return <div>Lignes de code : {Math.floor(game.codeLines)}</div>;
};
