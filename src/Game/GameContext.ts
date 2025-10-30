import { createContext } from 'react';
import { initFromEnum } from '../Utils/util.ts';
import { SaveGame } from '../Utils/SaveGame.ts';
import { Aux } from './Auxiliary.ts';
import { Dev, DevInitialInfos } from './Dev.ts';
import { ProductionItemInfo } from './ItemInfo.ts';
import { PO, POInitialInfos } from './POs.ts';
import { Upgrade } from './Upgrade.ts';

export const PriceIncrease = 1.25;

export type GameState = {
  codeLines: number;
  totalCodeLinesAccumulated: number;

  money: number;
  totalMoneyAccumulated: number;

  boughtUpgrade: Record<Upgrade, boolean>;
  activatedUpgrades: Record<Upgrade, { devs: Record<Dev, boolean>; pos: Record<PO, boolean> }>;

  codePrice: number;
  manualProductivity: number;
  autocodeSpeed: number;
  manualSellingForce: number;

  devTeamInfo: Record<Dev, ProductionItemInfo>;

  poTeamInfo: Record<PO, ProductionItemInfo>;

  unlockedAux: Record<Aux, boolean>;
  auxTeam: Record<Aux, number>;
};

export type GameContext = GameState & {
  createManualLine: (numberOfLinesToCreate: number) => void;
  buyDev: (dev: Dev) => void;
  buyPO: (po: PO) => void;
  buyAux: (aux: Aux) => void;
  buyUpgrade: (upgrade: Upgrade) => void;

  sellCode: (nbLines: number) => void;
  loadSaveGame: (saveGame: SaveGame) => void;
  resetGame: () => void;
};

export const gameStateDefaultValues: GameState = {
  codeLines: 0,
  totalCodeLinesAccumulated: 0,

  money: 10,
  totalMoneyAccumulated: 0,

  boughtUpgrade: initFromEnum(Upgrade, false),
  activatedUpgrades: initFromEnum(Upgrade, {
    devs: initFromEnum(Dev, false),
    pos: initFromEnum(PO, false),
  }),

  devTeamInfo: DevInitialInfos,

  poTeamInfo: POInitialInfos,

  codePrice: 1,
  manualProductivity: 3,
  autocodeSpeed: 50, // caractères par seconde en mode autocode
  manualSellingForce: 5,

  unlockedAux: initFromEnum(Aux, false),
  auxTeam: initFromEnum(Aux, 0),
};

export const gameContextDefaultValues: GameContext = {
  ...gameStateDefaultValues,

  createManualLine: () => {},

  buyDev: () => {},
  buyPO: () => {},
  buyAux: () => {},
  buyUpgrade: () => {},

  sellCode: () => {},
  loadSaveGame: () => {},
  resetGame: () => {},
};

export const gameContext = createContext<GameContext>(gameContextDefaultValues);
