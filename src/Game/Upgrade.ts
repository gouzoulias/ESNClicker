import { ItemInfo } from './ItemInfo.ts';

export enum Upgrade {
  // Dev manuel
  MecanicalKeyboard = 'MecanicalKeyboard',
  GamingChair = 'GamingChair',
  SecondMonitor = 'SecondMonitor',

  // Autocode (maintenir touche enfoncée)
  AutoMacro = 'AutoMacro',
  TurboMode = 'TurboMode',
  OverclockCPU = 'OverclockCPU',

  // Vente manuelle plus rapide
  Smartphone = 'Smartphone',
  '5G' = '5G',

  // Vente plus chère
  Linter = 'Linter',

  // Analytics
  SpeedCounter = 'SpeedCounter',

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
    price: 100,
    name: 'Clavier mécanique',
    description: 'Vous développez plus vite',
  },
  [Upgrade.GamingChair]: {
    price: 600,
    name: 'Chaise gaming',
    description: 'Vous développez encore plus vite grâce à votre super chaise gaming !',
  },
  [Upgrade.SecondMonitor]: {
    price: 8000,
    name: 'Second écran',
    description: 'Vous développez plus vite grâce à votre second écran !',
  },

  // Autocode upgrades
  [Upgrade.AutoMacro]: {
    price: 125,
    name: 'Macro automatique',
    description: 'Votre autocode génère plus de caractères par seconde !',
  },
  [Upgrade.TurboMode]: {
    price: 750,
    name: 'Mode turbo',
    description: "Votre processeur booste l'autocode encore plus rapidement !",
  },
  [Upgrade.OverclockCPU]: {
    price: 10000,
    name: 'Overclock CPU',
    description: 'Vous overclocke votre processeur pour un autocode ultra-rapide !',
  },

  // Manual Selling
  [Upgrade.Smartphone]: {
    price: 2400,
    name: 'Smartphone',
    description: 'Vous vendez plus vite grâce à votre smartphone !',
  },
  [Upgrade['5G']]: {
    price: 4800,
    name: '5G',
    description: 'Votre téléphone est maintenant compatible avec la 5G et ça vous permet de vendre encore plus vite !',
  },

  // Selling Price
  [Upgrade.Linter]: {
    price: 400,
    name: 'Linter',
    description: 'Vous utilisez un linter, rendant votre code plus beau et permettant de le vendre à un meilleur prix !',
  },

  // Analytics
  [Upgrade.SpeedCounter]: {
    price: 60,
    name: 'Compteur de vitesse',
    description: 'Affiche votre vitesse de frappe en temps réel pour optimiser votre productivité !',
  },

  // Dev Productivity
  [Upgrade.CofeeMachine]: {
    price: 6000,
    name: 'Machine à café',
    description: 'Vous avez une machine à café, ce qui permet à vos développeurs de travailler plus vite !',
  },

  // General Productivity
  [Upgrade.OpenSpace]: {
    price: 320000,
    name: 'Open Space',
    description: 'Vous avez un open space, ce qui permet à tous vos employés de travailler plus vite !',
  },
};
