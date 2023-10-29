import { createContext } from 'react';
import { initFromEnum } from '../Utils/util.ts';
import { Aux } from './Aux.ts';
import { Dev, DevInitialPrice, DevInitialProductivity } from './Dev.ts';
import { PO, POInitialPrice, POInitialProductivity } from './POs.ts';
import { Upgrades } from './Upgrades.ts';

export const PriceIncreaseInPercent = 1.15;

export type GameContext = {
  codeLines: number;
  totalCodeLinesAccumulated: number;

  money: number;
  totalMoneyAccumulated: number;

  boughtUpgrades: Record<Upgrades, boolean>;
  activatedUpgrades: Record<Upgrades, { devs: Record<Dev, boolean>; pos: Record<PO, boolean> }>;

  codePrice: number;
  manualProductivity: number;
  manualSellingForce: number;

  devTeam: Record<Dev, number>;
  devPrice: Record<Dev, number>;
  devProductivity: Record<Dev, number>;

  poTeam: Record<PO, number>;
  poPrice: Record<PO, number>;
  poProductivity: Record<PO, number>;

  unlockedAux: Record<Aux, boolean>;
  auxTeam: Record<Aux, number>;

  createManualLine: (numberOfLinesToCreate: number) => void;
  buyDev: (dev: Dev) => void;
  buyPO: (po: PO) => void;
  buyAux: (aux: Aux) => void;

  sellCode: (nbLines: number) => void;
};

export const gameContextDefaultValues: GameContext = {
  codeLines: 0,
  totalCodeLinesAccumulated: 0,

  money: 0,
  totalMoneyAccumulated: 0,

  boughtUpgrades: initFromEnum(Upgrades, false),
  activatedUpgrades: initFromEnum(Upgrades, {
    devs: initFromEnum(Dev, false),
    pos: initFromEnum(PO, false),
  }),

  devTeam: initFromEnum(Dev, 0),
  devPrice: DevInitialPrice,
  devProductivity: DevInitialProductivity,

  codePrice: 1,
  manualProductivity: 1,
  manualSellingForce: 1,

  poTeam: initFromEnum(PO, 0),
  poPrice: POInitialPrice,
  poProductivity: POInitialProductivity,

  unlockedAux: initFromEnum(Aux, false),
  auxTeam: initFromEnum(Aux, 0),

  createManualLine: () => {},
  buyDev: () => {},
  buyPO: () => {},
  buyAux: () => {},
  sellCode: () => {},
};

console.log(gameContextDefaultValues);

export const gameContext = createContext<GameContext>(gameContextDefaultValues);
