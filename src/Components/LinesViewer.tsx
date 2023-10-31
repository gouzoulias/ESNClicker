import { useContext } from 'react';
import { GameContext, gameContext } from '../Game/GameContext.ts';
import { formatNumber } from '../Utils/util.ts';

export const LinesViewer = () => {
  const game: GameContext = useContext(gameContext);

  return <div>Lignes de code : {formatNumber(game.codeLines, false)}</div>;
};
