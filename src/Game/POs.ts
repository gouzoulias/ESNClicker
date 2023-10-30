import { ProductionItemInfo } from './ItemInfo.ts';

export enum PO {
  CustomerSuccessManager = 'CustomerSuccessManager',
  ProductOwner = 'ProductOwner',
  ChefDeProjet = 'ChefDeProjet',
  Commercial = 'Commercial',
  ProductManagerOfficer = 'ProductManagerOfficer',
  DirecteurCommercial = 'DirecteurCommercial',
}

export const POList: PO[] = [PO.CustomerSuccessManager, PO.ProductOwner, PO.ChefDeProjet, PO.Commercial, PO.ProductManagerOfficer, PO.DirecteurCommercial];

export const POInitialInfos: Record<PO, ProductionItemInfo> = {
  [PO.CustomerSuccessManager]: {
    description:
      'Un Customer Success Manager qui répond au client au téléphone et occasionnellement vend du code au rythme de {productivity} lignes par seconde.',
    name: 'Customer Success Manager',
    numberOwned: 0,
    productivity: 10,
    price: 1800,
  },
  [PO.ProductOwner]: {
    description: 'Un Product Owner qui écrit des specificiations et vend du code de temps en temps au rythme de {productivity} lignes par seconde.',
    name: 'Product Owner',
    numberOwned: 0,
    productivity: 30,
    price: 2800,
  },
  [PO.ChefDeProjet]: {
    description: "Un Chef de Projet qui s'occupe de la gestion de projet et vend du code de temps en temps au rythme de {productivity} lignes par seconde.",
    name: 'Chef de Projet',
    numberOwned: 0,
    productivity: 50,
    price: 3800,
  },
  [PO.Commercial]: {
    description: 'Un Commercial qui vend du code à temps plein au rythme de {productivity} lignes par seconde.',
    name: 'Commercial',
    numberOwned: 0,
    productivity: 80,
    price: 4800,
  },
  [PO.ProductManagerOfficer]: {
    description:
      "Un Product Manager Officer qui organise les product owner et vend des lots d'évolutions à quelques clients au rythme de {productivity} lignes par seconde.",
    name: 'Product Manager Officer',
    numberOwned: 0,
    productivity: 130,
    price: 5800,
  },
  [PO.DirecteurCommercial]: {
    description: 'Un Directeur Commercial qui gère les commerciaux et vend des gros projets à des clients au rythme de {productivity} lignes par seconde.',
    name: 'Directeur Commercial',
    numberOwned: 0,
    productivity: 300,
    price: 8800,
  },
};
