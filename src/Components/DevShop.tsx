import * as _ from 'lodash';
import { useCallback, useContext } from 'react';
import { Dev, DevInitialInfos, DevList } from '../Game/Dev.ts';
import { gameContext } from '../Game/GameContext.ts';
import { ProductionItemInfo } from '../Game/ItemInfo.ts';

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
                  <button onClick={() => game.buyDev(dev)}>Engager 1 pour {devInfo.price.toFixed(2)}$</button>
                </div>
              </div>
            )
          );
        })}
      </div>
    )
  );
};
