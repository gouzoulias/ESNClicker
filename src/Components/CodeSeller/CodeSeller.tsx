import { useCallback, useContext, useEffect } from 'react';
import styles from './CodeSeller.module.scss';
import { gameContext } from '../Game/GameContext';
import { formatNumber } from '../Utils/util';
import { Button } from '../Button/Button';

export const CodeSeller = () => {
  const game = useContext(gameContext);

  const sellCode = useCallback(() => {
    game.sellCode(game.manualSellingForce);
  }, [game]);

  useEffect(() => {
    // TODO : Delete this log
    console.log('CodeSeller : game.manualSellingForce', game.manualSellingForce);
  }, [game.manualSellingForce]);

  useEffect(() => {
    // TODO : Delete this log
    console.log('CodeSeller : game.codePrice', game.codePrice);
  }, [game.codePrice]);

  return (
    <div className={styles.container}>
      <Button onClick={sellCode}>
        Vendre <b>{formatNumber(game.manualSellingForce, false)}</b> lignes de code pour{' '}
        <b>{formatNumber(game.manualSellingForce * game.codePrice, false)} €</b>
      </Button>
    </div>
  );
};
