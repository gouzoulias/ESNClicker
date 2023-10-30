import { createContext } from 'react';
import { initFromEnum } from '../Utils/util.ts';
import { Aux } from './Aux.ts';
import { Dev, DevInitialInfos } from './Dev.ts';
import { ProductionItemInfo } from './ItemInfo.ts';
import { PO, POInitialInfos } from './POs.ts';
import { Upgrade } from './Upgrade.ts';

export const PriceIncrease = 1.25;

export type GameContext = {
  codeLines: number;
  totalCodeLinesAccumulated: number;

  money: number;
  totalMoneyAccumulated: number;

  boughtUpgrade: Record<Upgrade, boolean>;
  activatedUpgrades: Record<Upgrade, { devs: Record<Dev, boolean>; pos: Record<PO, boolean> }>;

  codePrice: number;
  manualProductivity: number;
  manualSellingForce: number;

  devTeamInfo: Record<Dev, ProductionItemInfo>;

  poTeamInfo: Record<PO, ProductionItemInfo>;

  unlockedAux: Record<Aux, boolean>;
  auxTeam: Record<Aux, number>;

  createManualLine: (numberOfLinesToCreate: number) => void;
  buyDev: (dev: Dev) => void;
  buyPO: (po: PO) => void;
  buyAux: (aux: Aux) => void;
  buyUpgrade: (upgrade: Upgrade) => void;

  sellCode: (nbLines: number) => void;
};

export const gameContextDefaultValues: GameContext = {
  codeLines: 0,
  totalCodeLinesAccumulated: 0,

  money: 0,
  totalMoneyAccumulated: 0,

  boughtUpgrade: initFromEnum(Upgrade, false),
  activatedUpgrades: initFromEnum(Upgrade, {
    devs: initFromEnum(Dev, false),
    pos: initFromEnum(PO, false),
  }),

  devTeamInfo: DevInitialInfos,

  poTeamInfo: POInitialInfos,

  codePrice: 1,
  manualProductivity: 1,
  manualSellingForce: 5,

  unlockedAux: initFromEnum(Aux, false),
  auxTeam: initFromEnum(Aux, 0),

  createManualLine: () => {},

  buyDev: () => {},
  buyPO: () => {},
  buyAux: () => {},
  buyUpgrade: () => {},

  sellCode: () => {},
};

export const gameContext = createContext<GameContext>(gameContextDefaultValues);
