import * as _ from 'lodash';
import { useCallback, useContext } from 'react';
import { Dev, DevInitialPrice, DevInitialProductivity } from '../Game/Dev.ts';
import { gameContext } from '../Game/GameContext.ts';

export const DevShop = () => {
  const game = useContext(gameContext);

  const shouldShowDevBuyButton = useCallback(
    (dev: Dev) => {
      return game.totalCodeLinesAccumulated > DevInitialProductivity[dev] * 60n && game.totalMoneyAccumulated > DevInitialPrice[dev];
    },
    [game.totalCodeLinesAccumulated, game.totalMoneyAccumulated],
  );

  if (game.totalMoneyAccumulated < 20n) {
    return null;
  }

  return (
    <div>
      {_.map(
        Dev,
        (dev) =>
          shouldShowDevBuyButton(dev) && (
            <button onClick={() => game.buyDev(dev)}>
              Engager un {dev} pour {game.devPrice[Dev.Stagiaire].toString()}
            </button>
          ),
      )}
    </div>
  );
};
