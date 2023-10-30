export enum Upgrade {
  // Dev manuel
  MecanicalKeyboard = 'MecanicalKeyboard',
  GamingChair = 'GamingChair',

  // Vente manuelle plus rapide
  Smartphone = 'Smartphone',
  '5G' = '5G',

  // Vente plus chère
  Linter = 'Linter',

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
  [Upgrade.Smartphone]: {
    price: 10,
    title: 'Smartphone',
    description: 'Vous vendez plus vite grâce à votre smartphone !',
  },
  [Upgrade['5G']]: {
    price: 50,
    title: '5G',
    description: 'Votre téléphone est maintenant compatible avec la 5G et ça vous permet de vendre encore plus vite !',
  },
  [Upgrade.Linter]: {
    price: 100,
    title: 'Linter',
    description: 'Vous utilisez un linter, rendant votre code plus beau et permettant de le vendre à un meilleur prix !',
  },
};
