export enum Upgrade {
  // Dev manuel
  MecanicalKeyboard = 'MecanicalKeyboard',
  GamingChair = 'GamingChair',

  // Vente manuelle

  // Devs

  // POS

  // Generic

  // Aux
}

export const UpgradeInfos: Record<
  Upgrade,
  {
    price: number;
    title: string;
    description: string;
  }
> = {
  [Upgrade.MecanicalKeyboard]: {
    price: 25,
    title: 'Clavier mécanique',
    description: 'Vous développez plus vite',
  },
  [Upgrade.GamingChair]: {
    price: 150,
    title: 'Chaise gaming',
    description: 'Vous développez encore plus vite grâce à votre super chaise gaming !',
  },
};
