import * as _ from 'lodash';
import { useContext, useMemo } from 'react';
import styles from './UpgradeShop.module.scss';
import { gameContext } from '@game/GameContext';
import { Upgrade, UpgradeInfos } from '@game/Upgrade';
import { formatNumber } from '@utils/util';
import { Button } from '@components/Button/Button';

export const UpgradeShop = () => {
  const game = useContext(gameContext);

  const availableUpgrades: string[] = useMemo(
    () =>
      _.chain(Upgrade)
        .filter((upgrade) => !game.boughtUpgrade[upgrade])
        .filter((upgrade) => {
          const minCodeLines = UpgradeInfos[upgrade].minCodeLines;
          return !minCodeLines || game.totalCodeLinesAccumulated >= minCodeLines;
        })
        .sortBy((upgrade) => {
          const info = UpgradeInfos[upgrade];
          const moneyPrice = info.price || 0;
          const codeLinePrice = info.priceInCodeLines || 0;
          // Convertir les lignes en argent au prix actuel du code
          const codeLineValueInMoney = codeLinePrice * game.codePrice;
          return moneyPrice + codeLineValueInMoney;
        })
        .take(3)
        .value(),
    [game.boughtUpgrade, game.totalCodeLinesAccumulated, game.codePrice],
  );

  return (
    <div>
      <h2>Améliorations</h2>
      <div className={styles.upgradeList}>
        {_.map(availableUpgrades, (upgrade) => {
          const upgradeInfo = UpgradeInfos[upgrade as Upgrade];
          const hasMoneyPrice = upgradeInfo.price !== undefined && upgradeInfo.price > 0;
          const hasCodeLinePrice = upgradeInfo.priceInCodeLines !== undefined;

          return (
            <Button key={upgrade} onClick={() => game.buyUpgrade(upgrade as Upgrade)}>
              <p>
                <b>{upgradeInfo.name}</b>
              </p>
              <p>{upgradeInfo.description}</p>
              <p>
                Acheter pour {hasMoneyPrice && <b>{formatNumber(upgradeInfo.price!, false)} €</b>}
                {hasMoneyPrice && hasCodeLinePrice && ' + '}
                {hasCodeLinePrice && <b>{formatNumber(upgradeInfo.priceInCodeLines!, false)} lignes</b>}
              </p>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
