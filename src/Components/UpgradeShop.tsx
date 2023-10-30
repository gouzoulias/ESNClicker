import * as _ from 'lodash';
import { useContext, useMemo } from 'react';
import { gameContext } from '../Game/GameContext.ts';
import { Upgrade, UpgradeInfos } from '../Game/Upgrade.ts';

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
      {_.map(availableUpgrades, (upgrade) => (
        <div key={upgrade} style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {UpgradeInfos[upgrade as Upgrade].title} : {UpgradeInfos[upgrade as Upgrade].description}
          </div>
          <div>
            <button onClick={() => game.buyUpgrade(upgrade as Upgrade)}>Acheter pour {UpgradeInfos[upgrade as Upgrade].price}$</button>
          </div>
        </div>
      ))}
    </div>
  );
};
