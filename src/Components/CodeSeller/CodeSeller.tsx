import { useCallback, useContext } from 'react';
import styles from './CodeSeller.module.scss';
import { gameContext } from '@game/GameContext';
import { formatNumber } from '@utils/util';
import { Button } from '@components/Button/Button';

export const CodeSeller = () => {
  const game = useContext(gameContext);

  const sellCode = useCallback(() => {
    game.sellCode(game.manualSellingForce);
  }, [game]);

  const canSell = game.codeLines >= 5;

  return (
    <div className={styles.container}>
      <Button onClick={sellCode} disabled={!canSell}>
        Vendre <b>{formatNumber(game.manualSellingForce, false)}</b> lignes de code pour <b>{formatNumber(game.manualSellingForce * game.codePrice, true)} €</b>
      </Button>
    </div>
  );
};
