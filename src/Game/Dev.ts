import { ProductionItemInfo } from './ItemInfo';

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
    numberOwned: 0,
    price: 100,
    productivity: 1,
  },
  [Dev.Alternant]: {
    description: 'Un alternant qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'Alternant',
    numberOwned: 0,
    price: 1.5e5,
    productivity: 5e2,
  },
  [Dev.Integrateur]: {
    description: 'Un intégrateur qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'Intégrateur',
    numberOwned: 0,
    price: 2e7,
    productivity: 1e5,
  },
  [Dev.FullStackJunior]: {
    description: 'Un fullstack junior qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'FullStack Junior',
    numberOwned: 0,
    price: 2.5e9,
    productivity: 1.5e7,
  },
  [Dev.FullStackSenior]: {
    description: 'Un fullstack senior qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'FullStack Senior',
    numberOwned: 0,
    price: 3e11,
    productivity: 2e9,
  },
  [Dev.Lead]: {
    description: 'Un lead qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'Lead',
    numberOwned: 0,
    price: 4e13,
    productivity: 5e11,
  },
  [Dev.Architecte]: {
    description: 'Un architecte qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'Architecte',
    numberOwned: 0,
    price: 5e15,
    productivity: 1e14,
  },
  [Dev.CTO]: {
    description: 'Un CTO qui fait du code au rythme de {productivity} lignes par seconde.',
    name: 'CTO',
    numberOwned: 0,
    price: 7e17,
    productivity: 1.5e16,
  },
};
