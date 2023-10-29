import * as _ from 'lodash';
import { useCallback, useContext } from 'react';
import { Dev, DevInitialPrice, DevInitialProductivity } from '../Game/Dev.ts';
import { gameContext } from '../Game/GameContext.ts';

export const DevShop = () => {
  const game = useContext(gameContext);

  const shouldShowDevBuyButton = useCallback(
    (dev: Dev) => game.totalCodeLinesAccumulated > DevInitialProductivity[dev] * 5 && game.totalMoneyAccumulated > DevInitialPrice[dev],
    [game.totalCodeLinesAccumulated, game.totalMoneyAccumulated],
  );

  return (
    <div>
      {_.map(
        Dev,
        (dev) =>
          shouldShowDevBuyButton(dev) && (
            <button onClick={() => game.buyDev(dev)}>
              Engager un {dev} pour {game.devPrice[dev].toString()}
            </button>
          ),
      )}
    </div>
  );
};
