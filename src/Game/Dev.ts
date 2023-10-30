import { ProductionItemInfo } from './ItemInfo.ts';

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

export const DevList: Dev[] = [Dev.Stagiaire, Dev.Alternant, Dev.Integrateur, Dev.FullStackJunior, Dev.FullStackSenior, Dev.Lead, Dev.Architecte, Dev.CTO];

export const DevInitialInfos: Record<Dev, ProductionItemInfo> = {
  [Dev.Stagiaire]: {
    description: 'Un stagiaire qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'Stagiaire',
    productivity: 1,
    price: 500,
    numberOwned: 0,
  },
  [Dev.Alternant]: {
    description: 'Un alternant qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'Alternant',
    numberOwned: 0,
    price: 1500,
    productivity: 5,
  },
  [Dev.Integrateur]: {
    description: 'Un intégrateur qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'Intégrateur',
    numberOwned: 0,
    price: 2000,
    productivity: 10,
  },
  [Dev.FullStackJunior]: {
    description: 'Un fullstack junior qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'FullStack Junior',
    numberOwned: 0,
    price: 2500,
    productivity: 15,
  },
  [Dev.FullStackSenior]: {
    description: 'Un fullstack senior qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'FullStack Senior',
    numberOwned: 0,
    price: 3000,
    productivity: 20,
  },
  [Dev.Lead]: {
    description: 'Un lead qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'Lead',
    numberOwned: 0,
    price: 4000,
    productivity: 50,
  },
  [Dev.Architecte]: {
    description: 'Un architecte qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'Architecte',
    numberOwned: 0,
    price: 5000,
    productivity: 100,
  },
  [Dev.CTO]: {
    description: 'Un CTO qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'CTO',
    numberOwned: 0,
    price: 7000,
    productivity: 150,
  },
};
