export type ItemInfo = {
  price: number;
  name: string;
  description: string;
  minCodeLines?: number; // Nombre minimum de lignes produites pour débloquer
};

export type ProductionItemInfo = ItemInfo & {
  productivity: number;
  numberOwned: number;
};

export type UpgradeItemInfo = ItemInfo & {
  unlocked: boolean;
};
