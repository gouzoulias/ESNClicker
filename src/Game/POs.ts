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

export const POInitialPrice: Record<PO, bigint> = {
  [PO.CustomerSuccessManager]: 100n,
  [PO.ProductOwner]: 12_000n,
  [PO.PO1]: 1_400_000n,
  [PO.ChefDeProjet]: 330_000_000n,
  [PO.Commercial]: 75_000_000_000n,
  [PO.ProductManagerOfficer]: 14_000_000_000_000n,
  [PO.PO2]: 2_100_000_000_000_000n,
  [PO.DirecteurCommercial]: 310_000_000_000_000_000n,
};

export const POInitialProductivity: Record<PO, bigint> = {
  [PO.CustomerSuccessManager]: 8n,
  [PO.ProductOwner]: 260n,
  [PO.PO1]: 7_800n,
  [PO.ChefDeProjet]: 260_000n,
  [PO.Commercial]: 10_000_000n,
  [PO.ProductManagerOfficer]: 430_000_000n,
  [PO.PO2]: 21_000_000_000n,
  [PO.DirecteurCommercial]: 1_100_000_000_000n,
};
