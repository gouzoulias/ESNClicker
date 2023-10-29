export enum PO {
  CustomerSuccessManager = 'CustomerSuccessManager',
  ProductOwner = 'ProductOwner',
  PO1 = 'PO1',
  ChefDeProjet = 'ChefDeProjet',
  Commercial = 'Commercial',
  ProductManagerOfficer = 'ProductManagerOfficer',
  PO2 = 'PO2',
  DirecteurCommercial = 'DirecteurCommercial',
}

export const POOrder: PO[] = [
  PO.CustomerSuccessManager,
  PO.ProductOwner,
  PO.PO1,
  PO.ChefDeProjet,
  PO.Commercial,
  PO.ProductManagerOfficer,
  PO.PO2,
  PO.DirecteurCommercial,
];

export const POInitialPrice: Record<PO, number> = {
  [PO.CustomerSuccessManager]: 10 ** 2,
  [PO.ProductOwner]: 1.2 * 10 ** 4,
  [PO.PO1]: 1.4 * 10 ** 6,
  [PO.ChefDeProjet]: 3.3 * 10 ** 8,
  [PO.Commercial]: 7.5 * 10 ** 10,
  [PO.ProductManagerOfficer]: 1.4 * 10 ** 13,
  [PO.PO2]: 2.1 * 10 ** 15,
  [PO.DirecteurCommercial]: 3.1 * 10 ** 17,
};

export const POInitialProductivity: Record<PO, number> = {
  [PO.CustomerSuccessManager]: 8,
  [PO.ProductOwner]: 2.6 * 10 ** 2,
  [PO.PO1]: 7.8 * 10 ** 3,
  [PO.ChefDeProjet]: 2.6 * 10 ** 5,
  [PO.Commercial]: 10 ** 7,
  [PO.ProductManagerOfficer]: 4.3 * 10 ** 8,
  [PO.PO2]: 2.1 * 10 ** 10,
  [PO.DirecteurCommercial]: 1.1 * 10 ** 12,
};
