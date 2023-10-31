import { ItemInfo } from './ItemInfo.ts';

export enum Upgrade {
  // Dev manuel
  MecanicalKeyboard = 'MecanicalKeyboard',
  GamingChair = 'GamingChair',
  SecondMonitor = 'SecondMonitor',

  // Vente manuelle plus rapide
  Smartphone = 'Smartphone',
  '5G' = '5G',

  // Vente plus chère
  Linter = 'Linter',

  // Devs
  CofeeMachine = 'CofeeMachine',

  // POS

  // Generic
  OpenSpace = 'OpenSpace',

  // Aux
}

export const UpgradeInfos: Record<Upgrade, ItemInfo> = {
  // Manual Code
  [Upgrade.MecanicalKeyboard]: {
    price: 25,
    name: 'Clavier mécanique',
    description: 'Vous développez plus vite',
  },
  [Upgrade.GamingChair]: {
    price: 150,
    name: 'Chaise gaming',
    description: 'Vous développez encore plus vite grâce à votre super chaise gaming !',
  },
  [Upgrade.SecondMonitor]: {
    price: 2000,
    name: 'Second écran',
    description: 'Vous développez plus vite grâce à votre second écran !',
  },

  // Manual Selling
  [Upgrade.Smartphone]: {
    price: 600,
    name: 'Smartphone',
    description: 'Vous vendez plus vite grâce à votre smartphone !',
  },
  [Upgrade['5G']]: {
    price: 1200,
    name: '5G',
    description: 'Votre téléphone est maintenant compatible avec la 5G et ça vous permet de vendre encore plus vite !',
  },

  // Selling Price
  [Upgrade.Linter]: {
    price: 100,
    name: 'Linter',
    description: 'Vous utilisez un linter, rendant votre code plus beau et permettant de le vendre à un meilleur prix !',
  },

  // Dev Productivity
  [Upgrade.CofeeMachine]: {
    price: 500,
    name: 'Machine à café',
    description: 'Vous avez une machine à café, ce qui permet à vos développeurs de travailler plus vite !',
  },

  // General Productivity
  [Upgrade.OpenSpace]: {
    price: 1000,
    name: 'Open Space',
    description: 'Vous avez un open space, ce qui permet à tous vos employés de travailler plus vite !',
  },
};
