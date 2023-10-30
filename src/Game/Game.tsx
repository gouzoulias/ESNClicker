import * as _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { useTick } from '../Utils/useTick.ts';
import { Aux } from './Aux.ts';
import { Dev } from './Dev.ts';
import { gameContext, gameContextDefaultValues as defaultValues, PriceIncrease } from './GameContext.ts';
import { ProductionItemInfo } from './ItemInfo.ts';
import { PO } from './POs.ts';
import { Upgrade, UpgradeInfos } from './Upgrade.ts';

export const Game = ({ children }: React.PropsWithChildren) => {
  const [codeLines, setCodeLines] = useState(defaultValues.codeLines);
  const [totalCodeLinesAccumulated, setTotalCodeLinesAccumulated] = useState(defaultValues.totalCodeLinesAccumulated);

  const [money, setMoney] = useState(defaultValues.money);
  const [totalMoneyAccumulated, setTotalMoneyAccumulated] = useState(defaultValues.totalMoneyAccumulated);

  const [boughtUpgrade, setBoughtUpgrade] = useState(defaultValues.boughtUpgrade);
  const [activatedUpgrades, setActivatedUpgrades] = useState(defaultValues.activatedUpgrades);

  const [manualProductivity, setManualProductivity] = useState(defaultValues.manualProductivity);
  const [codePrice, setCodePrice] = useState(defaultValues.codePrice);
  const [manualSellingForce, setManualSellingForce] = useState(defaultValues.manualSellingForce);

  const [devTeamInfo, setDevTeamInfo] = useState(defaultValues.devTeamInfo);

  const [poTeamInfo, setPoTeamInfo] = useState(defaultValues.poTeamInfo);

  const [unlockedAux, setUnlockedAux] = useState(defaultValues.unlockedAux);
  const [auxTeam, setAuxTeam] = useState(defaultValues.auxTeam);

  const addCodeLines = useCallback((nb: number) => {
    setCodeLines((prevState) => prevState + nb);
    setTotalCodeLinesAccumulated((prevState) => prevState + nb);
  }, []);

  const addMoney = useCallback((nb: number) => {
    setMoney((prevState) => prevState + nb);
    setTotalMoneyAccumulated((prevState) => prevState + nb);
  }, []);

  const createManualLine = useCallback(
    (nbLines: number) => {
      addCodeLines(nbLines);
    },
    [addCodeLines],
  );

  const buyDev = useCallback(
    (dev: Dev) => {
      const devPrice: number = devTeamInfo[dev].price;
      if (money >= devPrice) {
        setMoney((prevState) => prevState - devPrice);
        setDevTeamInfo((prevState) => {
          return {
            ...prevState,
            [dev]: {
              ...prevState[dev],
              numberOwned: prevState[dev].numberOwned + 1,
              price: prevState[dev].price * PriceIncrease,
            } as ProductionItemInfo,
          } as Record<Dev, ProductionItemInfo>;
        });
      }
    },
    [devTeamInfo, money],
  );

  const buyPO = useCallback(
    (po: PO) => {
      const poPrice: number = poTeamInfo[po].price;
      if (money >= poPrice) {
        setMoney((prevState) => prevState - poPrice);
        setPoTeamInfo((prevState) => {
          return {
            ...prevState,
            [po]: {
              ...prevState[po],
              numberOwned: prevState[po].numberOwned + 1,
              price: prevState[po].price * PriceIncrease,
            } as ProductionItemInfo,
          } as Record<PO, ProductionItemInfo>;
        });
      }
    },
    [money, poTeamInfo],
  );

  const buyAux = useCallback((aux: Aux) => {
    setAuxTeam((prevState) => ({
      ...prevState,
      [aux]: prevState[aux] + 1,
    }));
  }, []);

  const buyUpgrade = useCallback(
    (upgrade: Upgrade) => {
      if (money >= UpgradeInfos[upgrade].price) {
        setMoney((prevState) => prevState - UpgradeInfos[upgrade].price);
        setBoughtUpgrade((prevState) => ({
          ...prevState,
          [upgrade]: true,
        }));
        switch (upgrade) {
          case Upgrade.MecanicalKeyboard:
          case Upgrade.GamingChair:
            setManualProductivity((prevState) => prevState * 2);
            break;
          case Upgrade.Smartphone:
          case Upgrade['5G']:
            setManualSellingForce((prevState) => prevState * 5);
            break;
          case Upgrade.Linter:
            setCodePrice((prevState) => prevState * 2);
            break;
        }
      }
    },
    [money],
  );

  const sellCode = useCallback(
    (nbLines: number) => {
      setCodeLines((currentCodeLines) => {
        const codeLinesToSell = Math.min(currentCodeLines, nbLines);
        addMoney(codeLinesToSell * codePrice);
        return currentCodeLines - codeLinesToSell;
      });
    },
    [addMoney, codePrice],
  );

  const gameTick = useCallback(
    (deltaTimeInSecond: number) => {
      addCodeLines(
        _.chain(devTeamInfo)
          .map(({ numberOwned, productivity }) => numberOwned * productivity * deltaTimeInSecond)
          .reduce((prev, curr) => prev + curr, 0)
          .value(),
      );
      sellCode(
        _.chain(poTeamInfo)
          .map(({ numberOwned, productivity }) => numberOwned * productivity * deltaTimeInSecond)
          .sum()
          .value(),
      );
    },
    [addCodeLines, devTeamInfo, poTeamInfo, sellCode],
  );

  useTick(gameTick, 100);

  return (
    <gameContext.Provider
      value={{
        codeLines,
        totalCodeLinesAccumulated,

        money,
        totalMoneyAccumulated,

        boughtUpgrade,
        activatedUpgrades,

        devTeamInfo,

        poTeamInfo,

        manualProductivity,
        codePrice,
        manualSellingForce,

        unlockedAux,
        auxTeam,

        createManualLine,

        buyDev,
        buyPO,
        buyAux,
        buyUpgrade,

        sellCode,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};
