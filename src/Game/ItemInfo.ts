export type ItemInfo = {
  price: number;
  name: string;
  description: string;
};

export type ProductionItemInfo = ItemInfo & {
  productivity: number;
  numberOwned: number;
};

export type UpgradeItemInfo = ItemInfo & {
  unlocked: boolean;
};
