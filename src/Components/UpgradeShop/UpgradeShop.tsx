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
        .filter((upgrade) => game.boughtUpgrade[upgrade] === false)
        .sortBy((upgrade) => UpgradeInfos[upgrade].price)
        .take(3)
        .value(),
    [game.boughtUpgrade],
  );

  return (
    <div>
      <h2>Améliorations</h2>
      <div className={styles.upgradeList}>
        {_.map(availableUpgrades, (upgrade) => (
          <Button key={upgrade} onClick={() => game.buyUpgrade(upgrade as Upgrade)}>
            <p>
              <b>{UpgradeInfos[upgrade as Upgrade].name}</b>
            </p>
            <p>{UpgradeInfos[upgrade as Upgrade].description}</p>
            <p>
              Acheter pour <b>{formatNumber(UpgradeInfos[upgrade as Upgrade].price, false)} €</b>
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
};
