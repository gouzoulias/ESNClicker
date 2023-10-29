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
      <h2>Recrutement de Developpeurs</h2>
      {_.map(
        Dev,
        (dev) =>
          shouldShowDevBuyButton(dev) && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div>
                {dev} : {game.devTeam[dev as Dev]}
              </div>
              <div>
                <button onClick={() => game.buyDev(dev)}>Engager 1 pour {game.devPrice[dev].toFixed(2)}$</button>
              </div>
            </div>
          ),
      )}
    </div>
  );
};
