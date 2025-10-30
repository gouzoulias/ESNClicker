import * as _ from 'lodash';
import { useCallback, useContext } from 'react';
import styles from './POShop.module.scss';
import { gameContext } from '../Game/GameContext';
import { ProductionItemInfo } from '../Game/ItemInfo';
import { PO, POInitialInfos, POList } from '../Game/POs';
import { formatNumber } from '../Utils/util';
import { Button } from '../Button/Button';

export const POShop = () => {
  const game = useContext(gameContext);

  const shouldShowPOBuyButton = useCallback(
    (po: PO) => game.totalCodeLinesAccumulated > POInitialInfos[po].productivity * 0.5 && game.totalMoneyAccumulated > POInitialInfos[po].price * 0.5,
    [game.totalCodeLinesAccumulated, game.totalMoneyAccumulated],
  );

  const shouldShowShop: boolean = _.some(POList, (po) => shouldShowPOBuyButton(po));

  return (
    shouldShowShop && (
      <div>
        <h2>Recrutement de Product Owners</h2>
        {_.map(POList, (po) => {
          const poInfo: ProductionItemInfo = game.poTeamInfo[po as PO];
          return (
            shouldShowPOBuyButton(po) && (
              <div className={styles.poList}>
                <div>
                  {poInfo.name} : {poInfo.numberOwned}
                </div>
                <div>
                  <Button onClick={() => game.buyPO(po)} title={poInfo.description.replace('{productivity}', `${poInfo.productivity}`)}>
                    Engager 1 pour <b>{formatNumber(poInfo.price)} €</b>
                  </Button>
                </div>
              </div>
            )
          );
        })}
      </div>
    )
  );
};
