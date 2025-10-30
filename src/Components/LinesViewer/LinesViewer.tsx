import { useContext } from 'react';
import { GameContext, gameContext } from '@game/GameContext';
import { formatNumber } from '@utils/util';

export const LinesViewer = () => {
  const game: GameContext = useContext(gameContext);

  return <div>Lignes de code : {formatNumber(game.codeLines, false)}</div>;
};
