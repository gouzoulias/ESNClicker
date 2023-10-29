import * as _ from 'lodash';
import { useCallback, useContext } from 'react';
import { gameContext } from '../Game/GameContext.ts';
import { PO, POInitialPrice, POInitialProductivity } from '../Game/POs.ts';

export const POShop = () => {
  const game = useContext(gameContext);

  const shouldShowPOBuyButton = useCallback(
    (po: PO) => game.totalCodeLinesAccumulated > POInitialProductivity[po] * 5n && game.totalMoneyAccumulated > POInitialPrice[po],
    [game.totalCodeLinesAccumulated, game.totalMoneyAccumulated],
  );

  return (
    <div>
      {_.map(
        PO,
        (po) =>
          shouldShowPOBuyButton(po) && (
            <button onClick={() => game.buyPO(po)}>
              Engager un {po} pour {game.poPrice[po].toString()}
            </button>
          ),
      )}
    </div>
  );
};
