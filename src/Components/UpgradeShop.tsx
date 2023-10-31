import * as _ from 'lodash';
import { useContext, useMemo } from 'react';
import { gameContext } from '../Game/GameContext.ts';
import { Upgrade, UpgradeInfos } from '../Game/Upgrade.ts';
import { Button } from './Button.tsx';

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
      <div style={{ display: 'flex', gap: 8, padding: 16 }}>
        {_.map(availableUpgrades, (upgrade) => (
          <Button key={upgrade} onClick={() => game.buyUpgrade(upgrade as Upgrade)}>
            <p>
              <b>{UpgradeInfos[upgrade as Upgrade].name}</b>
            </p>
            <p>{UpgradeInfos[upgrade as Upgrade].description}</p>
            <p>
              Acheter pour <b>{UpgradeInfos[upgrade as Upgrade].price}€</b>
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
};
