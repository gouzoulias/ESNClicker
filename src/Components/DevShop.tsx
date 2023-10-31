import * as _ from 'lodash';
import { useCallback, useContext } from 'react';
import { Dev, DevInitialInfos, DevList } from '../Game/Dev.ts';
import { gameContext } from '../Game/GameContext.ts';
import { ProductionItemInfo } from '../Game/ItemInfo.ts';
import { formatNumber } from '../Utils/util.ts';
import { Button } from './Button.tsx';
import { DevCodeVisualizer } from './DevCodeVisualizer.tsx';

export const DevShop = () => {
  const game = useContext(gameContext);

  const shouldShowDevBuyButton = useCallback(
    (dev: Dev) => game.totalCodeLinesAccumulated > DevInitialInfos[dev].productivity * 0.5 && game.totalMoneyAccumulated > DevInitialInfos[dev].price * 0.5,
    [game.totalCodeLinesAccumulated, game.totalMoneyAccumulated],
  );

  const shouldShowShop: boolean = _.some(DevList, (dev) => shouldShowDevBuyButton(dev));

  return (
    shouldShowShop && (
      <div>
        <h2>Recrutement de Developpeurs</h2>
        {_.map(DevList, (dev) => {
          const devInfo: ProductionItemInfo = game.devTeamInfo[dev as Dev];
          return (
            shouldShowDevBuyButton(dev) && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div>
                  {devInfo.name} : {devInfo.numberOwned}
                </div>
                <div>
                  <Button onClick={() => game.buyDev(dev)} title={devInfo.description.replace('{productivity}', `${devInfo.productivity}`)}>
                    Engager 1 pour <b>{formatNumber(devInfo.price)} €</b>
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
