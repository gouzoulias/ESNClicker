import * as _ from 'lodash';
import { useCallback, useContext } from 'react';
import { gameContext } from '../Game/GameContext.ts';
import { PO, POInitialPrice, POInitialProductivity } from '../Game/POs.ts';

export const POShop = () => {
  const game = useContext(gameContext);

  const shouldShowPOBuyButton = useCallback(
    (po: PO) => game.totalCodeLinesAccumulated > POInitialProductivity[po] && game.totalMoneyAccumulated > POInitialPrice[po],
    [game.totalCodeLinesAccumulated, game.totalMoneyAccumulated],
  );

  return (
    <div>
      <h2>Recrutement de Product Owners</h2>
      {_.map(
        PO,
        (po) =>
          shouldShowPOBuyButton(po) && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div>
                {po} : {game.poTeam[po as PO]}
              </div>
              <div>
                <button onClick={() => game.buyPO(po)}>Engager 1 pour {game.poPrice[po].toFixed(2)}$</button>
              </div>
            </div>
          ),
      )}
    </div>
  );
};
