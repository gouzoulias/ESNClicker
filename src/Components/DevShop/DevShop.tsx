import * as _ from 'lodash';
import { useCallback, useContext } from 'react';
import styles from './DevShop.module.scss';
import { Dev, DevInitialInfos, DevList } from '@game/Dev';
import { gameContext } from '@game/GameContext';
import { ProductionItemInfo } from '@game/ItemInfo';
import { formatNumber } from '@utils/util';
import { Button } from '@components/Button/Button';
import { DevCodeVisualizer } from '@components/DevCodeVisualizer/DevCodeVisualizer';

export const DevShop = () => {
  const game = useContext(gameContext);

  const shouldShowDevBuyButton = useCallback(
    (dev: Dev) => {
      const devInfo = DevInitialInfos[dev];
      const moneyThreshold = devInfo.price ? devInfo.price * 0.5 : 0;
      return game.totalCodeLinesAccumulated > devInfo.productivity * 0.5 && game.totalMoneyAccumulated > moneyThreshold;
    },
    [game.totalCodeLinesAccumulated, game.totalMoneyAccumulated],
  );

  const shouldShowShop: boolean = _.some(DevList, (dev) => shouldShowDevBuyButton(dev));

  return (
    shouldShowShop && (
      <div>
        <h2>Recrutement de Developpeurs</h2>
        {_.map(DevList, (dev) => {
          const devInfo: ProductionItemInfo = game.devTeamInfo[dev as Dev];
          const hasMoneyPrice = devInfo.price !== undefined && devInfo.price > 0;
          const hasCodeLinePrice = devInfo.priceInCodeLines !== undefined;

          return (
            shouldShowDevBuyButton(dev) && (
              <div className={styles.devList}>
                <div>
                  {devInfo.name} : {devInfo.numberOwned}
                </div>
                <div>
                  <Button onClick={() => game.buyDev(dev)} title={devInfo.description.replace('{productivity}', `${devInfo.productivity}`)}>
                    Engager 1 pour {hasMoneyPrice && <b>{formatNumber(devInfo.price!)} €</b>}
                    {hasMoneyPrice && hasCodeLinePrice && ' + '}
                    {hasCodeLinePrice && <b>{formatNumber(devInfo.priceInCodeLines!)} lignes</b>}
                  </Button>
                </div>
              </div>
            )
          );
        })}
        <DevCodeVisualizer />
      </div>
    )
  );
};
