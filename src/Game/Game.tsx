import * as _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { useTick } from '../useTick.ts';
import { Aux, Dev, gameContext, gameContextDefaultValues, PO } from './GameContext.ts';

export const Game = ({ children }: React.PropsWithChildren) => {
  const [codeLines, setCodeLines] = useState(gameContextDefaultValues.codeLines);
  const [money, setMoney] = useState(gameContextDefaultValues.money);

  const [boughtUpgrades, setBoughtUpgrades] = useState(gameContextDefaultValues.boughtUpgrades);
  const [activatedUpgrades, setActivatedUpgrades] = useState(gameContextDefaultValues.activatedUpgrades);

  const [devTeam, setDevTeam] = useState(gameContextDefaultValues.devTeam);
  const [devProductivity, setDevProductivity] = useState(gameContextDefaultValues.devProductivity);

  const [poTeam, setPoTeam] = useState(gameContextDefaultValues.poTeam);
  const [poProductivity, setPoProductivity] = useState(gameContextDefaultValues.poProductivity);

  const [unlockedAux, setUnlockedAux] = useState(gameContextDefaultValues.unlockedAux);
  const [auxTeam, setAuxTeam] = useState(gameContextDefaultValues.auxTeam);

  const gameTick = useCallback(() => {
    console.log('tick !');
    setCodeLines(
      (prevState) =>
        prevState +
        _(devTeam)
          .map((numberOfDev, devType: Dev) => numberOfDev * devProductivity[devType])
          .sum(),
    );
  }, [devProductivity, devTeam]);

  useTick(gameTick, 1000);

  const createManualLine = useCallback(() => {
    setCodeLines((prevState) => prevState + 1);
  }, []);

  const buyDev = useCallback((dev: Dev) => {
    setDevTeam((prevState) => ({
      ...prevState,
      [dev]: prevState[dev] + 1,
    }));
  }, []);

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

  return (
    <gameContext.Provider
      value={{
        codeLines,
        money,

        boughtUpgrades,
        activatedUpgrades,

        devTeam,
        devProductivity,

        poTeam,
        poProductivity,

        unlockedAux,
        auxTeam,

        createManualLine,
        buyDev,
        buyPO,
        buyAux,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};
