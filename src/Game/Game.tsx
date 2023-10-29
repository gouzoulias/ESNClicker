import * as _ from 'lodash';
import React, { useCallback, useState } from 'react';
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

  const addCodeLines = useCallback((nb: number) => {
    setCodeLines((prevState) => prevState + nb);
    setTotalCodeLinesAccumulated((prevState) => prevState + nb);
  }, []);

  const addMoney = useCallback((nb: number) => {
    setMoney((prevState) => prevState + nb);
    setTotalMoneyAccumulated((prevState) => prevState + nb);
  }, []);

  const createManualLine = useCallback(() => {
    addCodeLines(manualProductivity);
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
          [dev]: prevState[dev] * PriceIncreaseInPercent,
        }));
      }
    },
    [devPrice, money],
  );

  const buyPO = useCallback(
    (po: PO) => {
      if (money > poPrice[po]) {
        setMoney((prevState) => prevState - poPrice[po]);
        setPoTeam((prevState) => ({
          ...prevState,
          [po]: prevState[po] + 1,
        }));
        setPoPrice((prevState) => ({
          ...prevState,
          [po]: prevState[po] * PriceIncreaseInPercent,
        }));
      }
    },
    [money, poPrice],
  );

  const buyAux = useCallback((aux: Aux) => {
    setAuxTeam((prevState) => ({
      ...prevState,
      [aux]: prevState[aux] + 1,
    }));
  }, []);

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
        _.chain(devTeam)
          .map<number>((numberOfDev, dev) => numberOfDev * devProductivity[dev as Dev] * deltaTimeInSecond)
          .reduce((prev, curr) => prev + curr, 0)
          .value(),
      );
      sellCode(
        _.chain(poTeam)
          .map((numberOfPO, po) => numberOfPO * poProductivity[po as PO] * deltaTimeInSecond)
          .sum()
          .value(),
      );
    },
    [addCodeLines, devProductivity, devTeam, poProductivity, poTeam, sellCode],
  );

  useTick(gameTick, 100);

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
