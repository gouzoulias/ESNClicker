import * as _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { BigIntMath } from '../Utils/BigInt.ts';
import { useTick } from '../Utils/useTick.ts';
import { Aux } from './Aux.ts';
import { Dev } from './Dev.ts';
import { gameContext, gameContextDefaultValues, PriceIncreaseInPercent } from './GameContext.ts';
import { PO } from './POs.ts';

export const Game = ({ children }: React.PropsWithChildren) => {
  const [codeLines, setCodeLines] = useState(gameContextDefaultValues.codeLines);
  const [totalCodeLinesAccumulated, setTotalCodeLinesAccumulated] = useState(gameContextDefaultValues.totalCodeLinesAccumulated);

  const [money, setMoney] = useState(gameContextDefaultValues.money);
  const [totalMoneyAccumulated, setTotalMoneyAccumulated] = useState(gameContextDefaultValues.totalMoneyAccumulated);

  const [boughtUpgrades, setBoughtUpgrades] = useState(gameContextDefaultValues.boughtUpgrades);
  const [activatedUpgrades, setActivatedUpgrades] = useState(gameContextDefaultValues.activatedUpgrades);

  const [manualProductivity, setManualProductivity] = useState(gameContextDefaultValues.manualProductivity);
  const [codePrice, setCodePrice] = useState(gameContextDefaultValues.codePrice);
  const [manualSellingForce, setManualSellingForce] = useState(gameContextDefaultValues.manualSellingForce);

  const [devTeam, setDevTeam] = useState(gameContextDefaultValues.devTeam);
  const [devPrice, setDevPrice] = useState(gameContextDefaultValues.devPrice);
  const [devProductivity, setDevProductivity] = useState(gameContextDefaultValues.devProductivity);

  const [poTeam, setPoTeam] = useState(gameContextDefaultValues.poTeam);
  const [poPrice, setPoPrice] = useState(gameContextDefaultValues.poPrice);
  const [poProductivity, setPoProductivity] = useState(gameContextDefaultValues.poProductivity);

  const [unlockedAux, setUnlockedAux] = useState(gameContextDefaultValues.unlockedAux);
  const [auxTeam, setAuxTeam] = useState(gameContextDefaultValues.auxTeam);

  const addCodeLines = useCallback((nb: bigint) => {
    setCodeLines((prevState) => prevState + nb);
    setTotalCodeLinesAccumulated((prevState) => prevState + nb);
  }, []);

  const addMoney = useCallback((nb: bigint) => {
    setMoney((prevState) => prevState + nb);
    setTotalMoneyAccumulated((prevState) => prevState + nb);
  }, []);

  const createManualLine = useCallback(() => {
    addCodeLines(BigInt(manualProductivity));
  }, [addCodeLines, manualProductivity]);

  const buyDev = useCallback(
    (dev: Dev) => {
      if (money > devPrice[dev]) {
        setMoney((prevState) => prevState - devPrice[dev]);
        setDevTeam((prevState) => ({
          ...prevState,
          [dev]: prevState[dev] + 1,
        }));
        setDevPrice((prevState) => ({
          ...prevState,
          // Will only works with bigDecimal if division is made in last
          [dev]: (prevState[dev] * PriceIncreaseInPercent) / 100n,
        }));
      }
    },
    [devPrice, money],
  );

  const buyPO = useCallback((po: PO) => {
    setPoTeam((prevState) => ({
      ...prevState,
      [po]: prevState[po] + 1,
    }));
  }, []);

  const buyAux = useCallback((aux: Aux) => {
    setAuxTeam((prevState) => ({
      ...prevState,
      [aux]: prevState[aux] + 1,
    }));
  }, []);

  const sellCode = useCallback(() => {
    if (codeLines >= 0) {
      const codeLinesToSell = BigIntMath.min(codeLines, BigInt(manualSellingForce));
      addMoney(codeLinesToSell * BigInt(codePrice));
      setCodeLines((prevState) => prevState - codeLinesToSell);
    }
  }, [addMoney, codeLines, codePrice, manualSellingForce]);

  const gameTick = useCallback(() => {
    addCodeLines(
      _.chain(devTeam)
        .map<bigint>((numberOfDev, devType) => BigInt(numberOfDev) * devProductivity[devType as Dev])
        .reduce((prev, curr) => prev + curr, 0n)
        .value(),
    );
  }, [addCodeLines, devProductivity, devTeam]);

  useTick(gameTick, 1000);

  return (
    <gameContext.Provider
      value={{
        codeLines,
        totalCodeLinesAccumulated,

        money,
        totalMoneyAccumulated,

        boughtUpgrades,
        activatedUpgrades,

        devTeam,
        devPrice,
        devProductivity,

        poTeam,
        poPrice,
        poProductivity,

        manualProductivity,
        codePrice,
        manualSellingForce,

        unlockedAux,
        auxTeam,

        createManualLine,

        buyDev,
        buyPO,
        buyAux,

        sellCode,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};
