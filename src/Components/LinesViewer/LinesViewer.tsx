import { useContext } from 'react';
import { GameContext, gameContext } from '../Game/GameContext';
import { formatNumber } from '../Utils/util';

export const LinesViewer = () => {
  const game: GameContext = useContext(gameContext);

  return <div>Lignes de code : {formatNumber(game.codeLines, false)}</div>;
};
