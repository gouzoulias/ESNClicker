import { createContext } from 'react';
import { initFromEnum } from '../util.ts';

export enum Dev {
  Stagiaire = 'Stagiaire',
  Alternant = 'Alternant',
  Integrateur = 'Integrateur',
  FullStackJunior = 'FullStackJunior',
  FullStackSenior = 'FullStackSenior',
  Lead = 'Lead',
  Architecte = 'Architecte',
  CTO = 'CTO',
}

const DevLvl: Record<Dev, number> = {
  [Dev.Stagiaire]: 0,
  [Dev.Alternant]: 1,
  [Dev.Integrateur]: 2,
  [Dev.FullStackJunior]: 3,
  [Dev.FullStackSenior]: 4,
  [Dev.Lead]: 5,
  [Dev.Architecte]: 6,
  [Dev.CTO]: 7,
};

export enum PO {
  CustomerSuccessManager = 'CustomerSuccessManager',
  ProductOwner = 'ProductOwner',
  ProductManagerOfficer = 'ProductManagerOfficer',
  ChefDeProjet = 'ChefDeProjet',
  Commercial = 'Commercial',
  DirecteurCommercial = 'DirecteurCommercial',
}

const POLvl: Record<PO, number> = {
  [PO.CustomerSuccessManager]: 0,
  [PO.ProductOwner]: 1,
  [PO.ProductManagerOfficer]: 2,
  [PO.ChefDeProjet]: 3,
  [PO.Commercial]: 4,
  [PO.DirecteurCommercial]: 5,
};

export enum Aux {
  ChasseurDeTete = 'ChasseurDeTete',
  DevOps = 'DevOps',
  ChiefHappinessOfficer = 'ChiefHappinessOfficer',
  Designer = 'Designer',
  Manager = 'Manager',
}

export const BaseLinePerDev = 1.15;
export const BaseLinePerPo = 1.5;

export enum Upgrades {}

export type GameContext = {
  codeLines: number;
  money: number;

  boughtUpgrades: Record<Upgrades, boolean>;
  activatedUpgrades: Record<Upgrades, { devs: Record<Dev, boolean>; pos: Record<PO, boolean> }>;

  manualProductivity: number;
  codePrice: number;
  manualSellingForce: number;

  devTeam: Record<Dev, number>;
  devProductivity: Record<Dev, number>;

  poTeam: Record<PO, number>;
  poProductivity: Record<PO, number>;

  unlockedAux: Record<Aux, boolean>;
  auxTeam: Record<Aux, number>;

  createManualLine: (numberOfLinesToCreate: number) => void;
  buyDev: (dev: Dev) => void;
  buyPO: (po: PO) => void;
  buyAux: (aux: Aux) => void;
  sellCode: () => void;
};

export const gameContextDefaultValues: GameContext = {
  codeLines: 0,
  money: 10,

  boughtUpgrades: initFromEnum(Upgrades, false),
  activatedUpgrades: initFromEnum(Upgrades, {
    devs: initFromEnum(Dev, false),
    pos: initFromEnum(PO, false),
  }),

  devTeam: initFromEnum(Dev, 0),
  devProductivity: initFromEnum(Dev, (dev) => BaseLinePerDev ** DevLvl[dev]),

  manualProductivity: 1,
  codePrice: 1,
  manualSellingForce: 1,

  poTeam: initFromEnum(PO, 0),
  poProductivity: initFromEnum(PO, (po) => BaseLinePerPo ** POLvl[po]),

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
