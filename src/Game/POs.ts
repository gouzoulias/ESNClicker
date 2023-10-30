export enum PO {
  CustomerSuccessManager = 'CustomerSuccessManager',
  ProductOwner = 'ProductOwner',
  ChefDeProjet = 'ChefDeProjet',
  Commercial = 'Commercial',
  ProductManagerOfficer = 'ProductManagerOfficer',
  DirecteurCommercial = 'DirecteurCommercial',
}

export const POList: PO[] = [PO.CustomerSuccessManager, PO.ProductOwner, PO.ChefDeProjet, PO.Commercial, PO.ProductManagerOfficer, PO.DirecteurCommercial];

export const POInitialPrice: Record<PO, number> = {
  [PO.CustomerSuccessManager]: 1800,
  [PO.ProductOwner]: 2800,
  [PO.ChefDeProjet]: 3800,
  [PO.Commercial]: 4800,
  [PO.ProductManagerOfficer]: 5800,
  [PO.DirecteurCommercial]: 8800,
};

export const POInitialProductivity: Record<PO, number> = {
  [PO.CustomerSuccessManager]: 10,
  [PO.ProductOwner]: 30,
  [PO.ChefDeProjet]: 50,
  [PO.Commercial]: 80,
  [PO.ProductManagerOfficer]: 130,
  [PO.DirecteurCommercial]: 300,
};
