export type ItemInfo = {
  name: string;
  description: string;
  minCodeLines?: number; // Nombre minimum de lignes produites pour débloquer
} & (
  | { price: number; priceInCodeLines?: number } // Prix en argent, optionnellement aussi en lignes
  | { price?: number; priceInCodeLines: number } // Prix en lignes, optionnellement aussi en argent
);

export type ProductionItemInfo = ItemInfo & {
  productivity: number;
  numberOwned: number;
};

export type UpgradeItemInfo = ItemInfo & {
  unlocked: boolean;
};
